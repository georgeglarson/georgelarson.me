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
  python3 scripts/build_contributions.py --write     # rewrite contributions.html + index.html headline
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


_GH_LIMIT = 1000  # gh search caps at 1000; warn if a bucket saturates it.


def fetch_gh_prs():
    """Live: capture merged + open + closed-unmerged, tagged by status."""
    fields = "repository,number,title,url,state,closedAt,createdAt,isDraft"
    merged = json.loads(_gh(["search", "prs", "--author", "georgeglarson",
                             "--merged", "--limit", str(_GH_LIMIT), "--json", fields]))
    opened = json.loads(_gh(["search", "prs", "--author", "georgeglarson",
                             "--state", "open", "--limit", str(_GH_LIMIT), "--json", fields]))
    closed = json.loads(_gh(["search", "prs", "--author", "georgeglarson",
                             "--state", "closed", "--limit", str(_GH_LIMIT), "--json", fields]))
    for name, bucket in (("merged", merged), ("open", opened), ("closed", closed)):
        if len(bucket) >= _GH_LIMIT:
            print(f"warning: gh search '{name}' bucket hit the {_GH_LIMIT} cap; "
                  f"results may be truncated — re-run or page manually", file=sys.stderr)
    merged_urls = {p["url"] for p in merged}
    for p in merged:
        p["status"] = "merged"
    for p in opened:
        p["status"] = "open"
    for p in closed:  # closed-but-not-merged = rejected; merged PRs are also closed, so skip those
        if p["url"] not in merged_urls:
            p["status"] = "closed"
    seen = set()
    out = []
    for p in merged + opened + closed:
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
            f'          <p class="desc">{_code_tags(e["desc"])}{e.get("extra", "")}</p>\n'
            "        </li>"
        )
    return "\n".join(lines)


def drafts_from_prs(prs):
    """Set of (repo, number) for PRs currently marked draft — live state from gh."""
    return {
        (p["repository"]["nameWithOwner"], int(p["number"]))
        for p in prs if p.get("isDraft")
    }


def render_inreview_html(curation, drafts=None):
    drafts = drafts or set()
    lines = []
    for g in curation["in_review"]:
        numbers = [int(n) for n in g["numbers"]]
        links = ", ".join(
            f'<a class="lnk" href="{_pr_url(g["repo"], n)}">#{n}</a>' for n in numbers
        )
        draft = ' <span class="tag">draft</span>' if any((g["repo"], n) in drafts for n in numbers) else ""
        lines.append(
            "        <li>\n"
            f'          <div class="name">{escape(g["name"])} {links}{draft}</div>\n'
            f'          <p class="desc">{_code_tags(g["desc"])}{g.get("extra", "")}</p>\n'
            "        </li>"
        )
    return "\n".join(lines)


# The two shapes an entry in `credited:` can take, strongest first. Each maps a
# yaml field to the repo-override field beside it and the tag the page renders.
# They are separate fields on purpose: `shipped_in` asserts a maintainer named
# him, `fixed_upstream` asserts only that the bug is gone. Keeping them apart
# means a later edit cannot upgrade the weaker claim by rewriting prose.
_UPSTREAM_SHAPES = (
    ("shipped_in", "shipped_in_repo", "shipped in"),
    ("fixed_upstream", "fixed_upstream_repo", "fixed upstream in"),
)


def _upstream_ref(entry):
    """(target_repo, target_number, tag_label, field) for one credited entry.

    Raises when an entry names neither shape or both: neither leaves the page
    with a dangling claim and no link, both would render two contradictory
    strengths of the same assertion.
    """
    found = [sh for sh in _UPSTREAM_SHAPES if sh[0] in entry]
    if len(found) != 1:
        named = " and ".join(sh[0] for sh in found) or "neither shape"
        raise RuntimeError(
            f"{entry['repo']}#{entry['number']}: credited entry names {named}; "
            f"it must name exactly one of {', '.join(sh[0] for sh in _UPSTREAM_SHAPES)}"
        )
    field, repo_field, label = found[0]
    return entry.get(repo_field, entry["repo"]), int(entry[field]), label, field


def render_credited_html(curation):
    """Work he filed whose fix landed under someone else's commit.

    Deliberately its own section. These PRs are closed-unmerged, so they cannot
    sit in `in_review`, and the commit that landed upstream is not George's, so
    they must never reach `merged` or the headline count. Each entry links both
    the closed PR and the merged one upstream, because the claim is only worth
    making if a reader can open the commit that carries it.

    Not a ledger of every closed PR. The entry criterion is a merged upstream
    landing; closures with none stay off the page entirely.
    """
    lines = []
    for e in curation.get("credited", []):
        repo, num = e["repo"], int(e["number"])
        tgt_repo, tgt_num, label, _ = _upstream_ref(e)
        lines.append(
            "        <li>\n"
            f'          <div class="name">{escape(e["name"])} '
            f'<a class="lnk" href="{_pr_url(repo, num)}">#{num}</a> '
            f'<span class="tag">{label} '
            f'<a class="lnk" href="{_pr_url(tgt_repo, tgt_num)}">'
            f'#{tgt_num}</a></span></div>\n'
            f'          <p class="desc">{_code_tags(e["desc"])}{e.get("extra", "")}</p>\n'
            "        </li>"
        )
    return "\n".join(lines)


def gh_pr_state(repo, number):
    """Live state of any PR, including other people's. Returns e.g. 'MERGED'.

    A number that does not resolve reports as MISSING rather than raising: a
    typo'd target is exactly the mistake this lookup exists to catch, and
    crashing the build turns a reportable problem into an unbuildable page.
    """
    try:
        out = _gh(["pr", "view", str(number), "--repo", repo, "--json", "state"])
    except subprocess.CalledProcessError:
        return "MISSING"
    return json.loads(out).get("state", "UNKNOWN")


def verify_upstream_targets(curation, lookup):
    """Every `shipped_in` / `fixed_upstream` target must actually be MERGED.

    The section's whole claim is that the fix exists upstream. A target that is
    open or closed-unmerged means the bug is still there and the page is saying
    something untrue, which no amount of careful prose fixes.

    This is not hypothetical. Two candidates failed it on 2026-08-20: opencode
    #24871 had stood down for #15595 (later closed unmerged) and #25141 for
    #20103 (still open). Both would have read as receipts. `lookup` is injected
    so the offline suite exercises this without touching the network.
    """
    problems = []
    for e in curation.get("credited", []):
        repo, num = e["repo"], int(e["number"])
        tgt_repo, tgt_num, _, field = _upstream_ref(e)
        state = lookup(tgt_repo, tgt_num)
        if state != "MERGED":
            problems.append(
                f"{repo}#{num} {field} {tgt_repo}#{tgt_num}, which is {state}, "
                f"not MERGED -> the fix never landed; drop the entry"
            )
    return problems


_HEADLINE_SENTENCE = (
    "{fixes} fixes merged across {projects} projects, more in review. "
    "Every one survives a click."
)


def headline(curation):
    merged = curation["merged"]
    n_fixes = len(merged)
    n_projects = len({e["repo"] for e in merged})
    sentence = _HEADLINE_SENTENCE.format(
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
    # Credited entries are closed-unmerged, the one status this detector is
    # otherwise blind to. Track them so a reopen or a late merge can't leave the
    # page asserting "closed in favour of" about a PR that is neither.
    credited_set = {_merged_key(e) for e in curation.get("credited", [])}

    merged_in_prs = {}  # (repo, num) -> record
    closed_in_prs = {}  # closed without merge (rejected)
    new_merges, new_open, stale_inreview, stale_credited = [], [], [], []

    for p in prs:
        repo = p["repository"]["nameWithOwner"]
        if _is_own(repo):
            continue
        num = int(p["number"])
        key = (repo, num)
        status = p.get("status") or ("merged" if p.get("state") == "MERGED"
                                     else "open" if p.get("state") == "OPEN" else "closed")
        if status == "open":
            if key in credited_set:
                stale_credited.append(f"{repo}#{num} reopened -> it is in review again, not credited")
            elif p.get("isDraft") and key not in inreview_set:
                # A draft is work in progress, not something to put in front of a
                # reader, so an uncurated one is not drift. It surfaces here the
                # moment it goes ready-for-review, which is the point at which it
                # earns a row. Curating a draft deliberately still works: the
                # renderer tags it `draft` from this same live state.
                continue
            elif key not in inreview_set and key not in exclusion_set:
                new_open.append(f"{repo}#{num}")
        elif status == "merged":
            if key in credited_set:
                stale_credited.append(f"{repo}#{num} merged after all -> move it up to merged:")
            merged_in_prs[key] = p
            if key not in merged_set and key not in exclusion_set:
                closed = (p.get("closedAt") or "")[:10]
                new_merges.append(f"{repo}#{num} merged {closed}".rstrip())
        elif status == "closed":
            closed_in_prs[key] = p

    for key in inreview_set:
        if key in merged_in_prs:
            stale_inreview.append(f"{key[0]}#{key[1]} merged -> move up")
        elif key in closed_in_prs:
            stale_inreview.append(f"{key[0]}#{key[1]} closed without merge -> remove")

    return {"new_merges": new_merges, "new_open": new_open,
            "stale_inreview": stale_inreview, "stale_credited": stale_credited}


# --- writing into the page ---------------------------------------------------

_MARKERS = {
    "merged": ("<!-- contributions:merged:start -->", "<!-- contributions:merged:end -->"),
    "inreview": ("<!-- contributions:inreview:start -->", "<!-- contributions:inreview:end -->"),
    "credited": ("<!-- contributions:credited:start -->", "<!-- contributions:credited:end -->"),
}

# Pages outside `--page` that repeat the headline count. The count has moved
# between these before: 0aab53d (2026-07-20) renamed the receipts section and
# took the line off index.html, and projects.html has carried its own copy the
# whole time with nothing updating it, so /projects read "ten fixes merged
# across eight projects" while /contributions read fifteen across ten. Scan the
# list rather than special-casing one page, so the next move is a one-line edit.
COMPANION_PAGES = ("index.html", "projects.html")

_OLD_HEADLINE_RE = re.compile(
    r"(?i)\b\w+ fixes merged "
    r"(?:into other people's projects|across \w+ projects)\b"
)


def _rewrite_headlines(html, n_fixes, n_projects, expected_min=1):
    """Replace every 'X fixes merged ... Y projects' surface with the current count.

    Matches any number-word (or digit) so it keeps working as the count grows past
    the spelled-out range. Raises if nothing matched — a silent no-op here would
    leave the headline stale while the rendered list advances, which is exactly
    the drift this tool exists to prevent.
    """
    def repl(m):
        # Follow the case of what was matched. The count opens a sentence in the
        # meta tags ("Fifteen fixes merged ...") but sits mid-sentence on
        # projects.html ("The full record: fifteen fixes merged ..."), where a
        # blanket capital reads as a typo.
        cap = m.group(0)[:1].isupper()
        return (f"{_numword(n_fixes, cap=cap)} fixes merged across "
                f"{_numword(n_projects)} projects")

    new_html, n = _OLD_HEADLINE_RE.subn(repl, html)
    if n < expected_min:
        raise RuntimeError(
            f"headline pattern not found ({n} matches, expected >= {expected_min}) "
            f"— expected 'X fixes merged across Y projects' in the page"
        )
    return new_html


def _replace_between(text, start, end, content):
    pattern = re.compile(re.escape(start) + r".*?" + re.escape(end), re.DOTALL)
    if not pattern.search(text):
        raise RuntimeError(f"markers not found: {start} … {end}")
    return pattern.sub(lambda m: f"{start}\n{content}\n      {end}", text, count=1)


def regenerate_html(html, curation, drafts=None):
    n_fixes, n_projects, sentence = headline(curation)
    ms, me = _MARKERS["merged"]
    isr, ire = _MARKERS["inreview"]
    html = _replace_between(html, ms, me, render_merged_html(curation))
    html = _replace_between(html, isr, ire, render_inreview_html(curation, drafts))
    if curation.get("credited"):
        cs, ce = _MARKERS["credited"]
        html = _replace_between(html, cs, ce, render_credited_html(curation))
    # headline surfaces: meta description, og, twitter — all three must match, else
    # one could drift stale silently. (index receipt line handled in main().)
    html = _rewrite_headlines(html, n_fixes, n_projects, expected_min=3)
    return html, sentence


# --- cli ---------------------------------------------------------------------

def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--yaml", default="scripts/contributions.yaml")
    ap.add_argument("--page", default="contributions.html")
    ap.add_argument("--fixture", help="use a gh-response fixture instead of live gh")
    ap.add_argument("--write", action="store_true",
                    help="rewrite contributions.html + the index.html headline in place")
    args = ap.parse_args(argv)

    curation = load_curation(args.yaml)
    prs = load_prs_json(args.fixture) if args.fixture else fetch_gh_prs()
    drafts = drafts_from_prs(prs)

    drift = detect_drift(prs, curation)
    # Live only. The upstream targets are other people's PRs, so they never turn
    # up in the author-scoped gh buckets above and a fixture of George's own PRs
    # cannot cover them. The offline suite calls verify_upstream_targets direct.
    upstream_problems = [] if args.fixture else verify_upstream_targets(curation, gh_pr_state)
    if any(drift.values()) or upstream_problems:
        print("# drift detected — curate these in contributions.yaml:", file=sys.stderr)
        for m in drift["new_merges"]:
            print(f"  + new merge:     {m}", file=sys.stderr)
        for o in drift["new_open"]:
            print(f"  + new open PR:   {o}", file=sys.stderr)
        for s in drift["stale_inreview"]:
            print(f"  ~ stale review:  {s}", file=sys.stderr)
        for s in drift["stale_credited"]:
            print(f"  ~ stale credit:  {s}", file=sys.stderr)
        for s in upstream_problems:
            print(f"  ! bad upstream:  {s}", file=sys.stderr)

    with open(args.page) as f:
        html = f.read()
    new_html, sentence = regenerate_html(html, curation, drafts)

    if args.write:
        # Compute every companion rewrite before writing anything, so a raise
        # leaves all pages un-written rather than contributions.html updated and
        # the companions stale.
        pending, carriers = [], []
        for companion in COMPANION_PAGES:
            try:
                with open(companion) as f:
                    page = f.read()
            except FileNotFoundError:
                continue
            if not _OLD_HEADLINE_RE.search(page):
                # This page links to /contributions without carrying a count.
                continue
            carriers.append(companion)
            rewritten = _rewrite_headlines(page, *headline(curation)[:2], expected_min=1)
            if rewritten != page:
                pending.append((companion, rewritten))
        if not carriers:
            print(f"note: no fixes-merged headline on {', '.join(COMPANION_PAGES)}; "
                  "nothing to keep in step. If it moved, add the page to COMPANION_PAGES.",
                  file=sys.stderr)
        with open(args.page, "w") as f:
            f.write(new_html)
        for companion, rewritten in pending:
            with open(companion, "w") as f:
                f.write(rewritten)
        written = [args.page, *(companion for companion, _ in pending)]
        print(f"wrote {', '.join(written)}; headline: {sentence}", file=sys.stderr)
    else:
        sys.stdout.write(new_html)


if __name__ == "__main__":
    main()
