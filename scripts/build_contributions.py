#!/usr/bin/env python3
"""Build georgelarson.me/contributions from curated data + live GitHub.

The curated truth lives in scripts/contributions.yaml (display source of truth,
because `gh search prs` has index gaps that drop some older merged PRs). This
script renders the Merged / In review sections, computes the headline count, and
flags drift: anything `gh` shows that the yaml hasn't curated yet (a new merge,
a new open PR) or that has moved out from under the yaml (an in-review number
that merged).

Usage:
  python3 scripts/build_contributions.py            # render to stdout + print drift
  python3 scripts/build_contributions.py --write     # rewrite contributions.html in place
  python3 scripts/build_contributions.py --write --fixture scripts/testdata/prs.json
"""
import argparse
import datetime as dt
import json
import re
import subprocess
import sys
from html import escape

import yaml

_NUMWORDS = [
    "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
    "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
]


# --- loading -----------------------------------------------------------------

def load_curation(path):
    with open(path) as f:
        return yaml.safe_load(f)


def load_prs_json(path):
    with open(path) as f:
        return json.load(f)


def fetch_gh_prs():
    """Live: merge `gh search prs --merged` + `--state open`, tagged by status."""
    fields = "repository,number,title,url,state,closedAt,createdAt,isDraft"
    merged = json.loads(_gh(["search", "prs", "--author", "georgeglarson",
                             "--merged", "--limit", "300", "--json", fields]))
    opened = json.loads(_gh(["search", "prs", "--author", "georgeglarson",
                             "--state", "open", "--limit", "300", "--json", fields]))
    for p in merged:
        p["status"] = "merged"
    for p in opened:
        p["status"] = "open"
    seen = set()
    out = []
    for p in merged + opened:
        url = p.get("url")
        if url in seen:
            continue
        seen.add(url)
        out.append(p)
    return out


def _gh(args):
    return subprocess.run(["gh", *args], capture_output=True, text=True,
                          check=True).stdout


# --- helpers -----------------------------------------------------------------

def _to_date(value):
    if isinstance(value, (dt.date, dt.datetime)):
        return value if isinstance(value, dt.date) and not isinstance(value, dt.datetime) else value.date()
    if isinstance(value, str) and value:
        return dt.date.fromisoformat(value[:10])
    return dt.date.min


def _numword(n, cap=False):
    w = _NUMWORDS[n] if 0 <= n < len(_NUMWORDS) else str(n)
    return w.capitalize() if cap else w


def _code_tags(text):
    """Escape HTML, then turn `backtick` spans into <code> tags."""
    return re.sub(r"`([^`]+)`", r"<code>\1</code>", escape(text))


def _pr_url(repo, number):
    return f"https://github.com/{repo}/pull/{number}"


def _is_own(repo):
    return repo.startswith("georgeglarson/")


def _merged_key(entry):
    return (entry["repo"], int(entry["number"]))


# --- rendering ---------------------------------------------------------------

def merged_numbers_in_order(curation):
    ordered = sorted(curation["merged"], key=lambda e: _to_date(e["merged"]), reverse=True)
    return [int(e["number"]) for e in ordered]


def render_merged_html(curation):
    lines = []
    for e in sorted(curation["merged"], key=lambda e: _to_date(e["merged"]), reverse=True):
        repo, num = e["repo"], int(e["number"])
        mon_yr = _to_date(e["merged"]).strftime("%b %Y")
        lines.append(
            "        <li>\n"
            f'          <div class="name">{escape(e["name"])} '
            f'<a class="lnk" href="{_pr_url(repo, num)}">#{num}</a> '
            f'<span class="tag">merged {mon_yr}</span></div>\n'
            f'          <p class="desc">{_code_tags(e["desc"])}</p>\n'
            "        </li>"
        )
    return "\n".join(lines)


def render_inreview_html(curation):
    lines = []
    for g in curation["in_review"]:
        numbers = [int(n) for n in g["numbers"]]
        links = ", ".join(
            f'<a class="lnk" href="{_pr_url(g["repo"], n)}">#{n}</a>' for n in numbers
        )
        draft = ' <span class="tag">draft</span>' if g.get("draft") else ""
        lines.append(
            "        <li>\n"
            f'          <div class="name">{escape(g["name"])} {links}{draft}</div>\n'
            f'          <p class="desc">{_code_tags(g["desc"])}{g.get("extra", "")}</p>\n'
            "        </li>"
        )
    return "\n".join(lines)


def headline(curation):
    merged = curation["merged"]
    n_fixes = len(merged)
    n_projects = len({e["repo"] for e in merged})
    tmpl = curation.get(
        "headline_template",
        "{fixes} fixes merged across {projects} projects, more in review. "
        "Every one survives a click.",
    )
    sentence = tmpl.format(
        fixes=_numword(n_fixes, cap=True),
        projects=_numword(n_projects, cap=False),
    )
    return n_fixes, n_projects, sentence


# --- drift detection ---------------------------------------------------------

def detect_drift(prs, curation):
    merged_set = {_merged_key(e) for e in curation["merged"]}
    exclusion_set = {_merged_key(e) for e in curation.get("exclusions", [])}
    inreview_set = set()
    for g in curation["in_review"]:
        for n in g["numbers"]:
            inreview_set.add((g["repo"], int(n)))

    open_keys = set()
    merged_in_prs = {}  # (repo, num) -> record
    new_merges, new_open, stale_inreview = [], [], []

    for p in prs:
        repo = p["repository"]["nameWithOwner"]
        if _is_own(repo):
            continue
        num = int(p["number"])
        key = (repo, num)
        status = p.get("status") or ("merged" if p.get("state") == "MERGED"
                                     else "open" if p.get("state") == "OPEN" else "closed")
        if status == "open":
            open_keys.add(key)
            if key not in inreview_set and key not in exclusion_set:
                new_open.append(f"{repo}#{num}")
        elif status == "merged":
            merged_in_prs[key] = p
            if key not in merged_set and key not in exclusion_set:
                closed = (p.get("closedAt") or "")[:10]
                new_merges.append(f"{repo}#{num} merged {closed}".rstrip())

    for key in inreview_set:
        if key in merged_in_prs:
            stale_inreview.append(f"{key[0]}#{key[1]} merged -> move up")

    return {"new_merges": new_merges, "new_open": new_open, "stale_inreview": stale_inreview}


# --- writing into the page ---------------------------------------------------

_MARKERS = {
    "merged": ("<!-- contributions:merged:start -->", "<!-- contributions:merged:end -->"),
    "inreview": ("<!-- contributions:inreview:start -->", "<!-- contributions:inreview:end -->"),
}

_OLD_HEADLINE_RE = re.compile(
    r"(?i)\b(?:eight|seven|six|five|four|three|two|one|\d+) fixes merged "
    r"(?:into other people's projects|across (?:eight|seven|six|five|four|three|two|one|\d+) projects)"
)


def _replace_between(text, start, end, content):
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.DOTALL)
    if not pattern.search(text):
        raise RuntimeError(f"markers not found: {start} … {end}")
    return pattern.sub(f"{start}\n{content}\n      {end}", text, count=1)


def regenerate_html(html, curation):
    n_fixes, n_projects, sentence = headline(curation)
    ms, me = _MARKERS["merged"]
    isr, ire = _MARKERS["inreview"]
    html = _replace_between(html, ms, me, render_merged_html(curation))
    html = _replace_between(html, isr, ire, render_inreview_html(curation))
    # headline surfaces: meta descriptions, og, twitter, and index receipt line.
    html = _OLD_HEADLINE_RE.sub(
        lambda m: f"{_numword(n_fixes, cap=True)} fixes merged across {_numword(n_projects)} projects",
        html,
    )
    return html, sentence


# --- cli ---------------------------------------------------------------------

def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--yaml", default="scripts/contributions.yaml")
    ap.add_argument("--page", default="contributions.html")
    ap.add_argument("--fixture", help="use a gh-response fixture instead of live gh")
    ap.add_argument("--write", action="store_true", help="rewrite the page in place")
    args = ap.parse_args(argv)

    curation = load_curation(args.yaml)
    prs = load_prs_json(args.fixture) if args.fixture else fetch_gh_prs()

    drift = detect_drift(prs, curation)
    if any(drift.values()):
        print("# drift detected — curate these in contributions.yaml:", file=sys.stderr)
        for m in drift["new_merges"]:
            print(f"  + new merge:     {m}", file=sys.stderr)
        for o in drift["new_open"]:
            print(f"  + new open PR:   {o}", file=sys.stderr)
        for s in drift["stale_inreview"]:
            print(f"  ~ stale review:  {s}", file=sys.stderr)

    with open(args.page) as f:
        html = f.read()
    new_html, sentence = regenerate_html(html, curation)

    if args.write:
        with open(args.page, "w") as f:
            f.write(new_html)
        # index.html receipt line carries the same headline shape
        try:
            with open("index.html") as f:
                idx = f.read()
            n_fixes, n_projects, _ = headline(curation)
            repl = (f"{_numword(n_fixes, cap=True)} fixes merged across "
                    f"{_numword(n_projects)} projects")
            idx_new = _OLD_HEADLINE_RE.sub(repl, idx, count=1)
            if idx_new != idx:
                with open("index.html", "w") as f:
                    f.write(idx_new)
        except FileNotFoundError:
            pass
        print(f"wrote {args.page} + index.html; headline: {sentence}", file=sys.stderr)
    else:
        sys.stdout.write(new_html)


if __name__ == "__main__":
    main()
