#!/usr/bin/env python3
"""Tests for build_contributions.py.

Run: python3 -m unittest scripts.test_build_contributions
  or: python3 scripts/test_build_contributions.py

Rendering and drift behaviour is tested against SAMPLE, a synthetic curation
built here. It used to be tested against the live contributions.yaml with the
counts pinned as constants (`assertEqual(n_fixes, 9)`, `assertIn("Nine", ...)`),
which reddened eight tests on every curation edit. That trains you to re-pin the
constant instead of reading the failure, which is how a real regression gets
waved through. Constants that encode today's data belong in the data.

Two tests still read the live yaml, as invariants rather than counts: it parses
with the keys the renderers require, and the headline sentence agrees with the
actual number of entries. Neither rots when a receipt is added.

Freshness of the curation against live GitHub is NOT asserted here. That is
`detect_drift`, which `main()` prints on every run and a fleet poller alarms on
(`contributions-drift-*`). Asserting "curation is caught up" in a unit suite
would redden the build every time a PR is opened anywhere.
"""
import io
import json
import os
import shutil
import sys
import tempfile
import unittest
from contextlib import redirect_stderr

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, HERE)

import build_contributions as bc  # noqa: E402

YAML = os.path.join(HERE, "contributions.yaml")
FIXTURE = os.path.join(HERE, "testdata", "prs.json")


def sample():
    """A synthetic curation: 3 merges across 2 repos, 2 in-review, 1 credited."""
    return {
        "merged": [
            {"repo": "acme/widget", "number": 10, "merged": "2026-03-01",
             "name": "widget", "desc": "Oldest, so it sorts last."},
            {"repo": "acme/widget", "number": 30, "merged": "2026-05-01",
             "name": "widget", "desc": "Newest, so it sorts first."},
            {"repo": "other/gadget", "number": 20, "merged": "2026-04-01",
             "name": "gadget", "desc": "Handles the `TokenExchange` grant.",
             "extra": ' <a class="lnk" href="/deep">the write-up</a>'},
        ],
        "in_review": [
            {"repo": "acme/widget", "name": "widget", "numbers": [40],
             "desc": "A `--launcher` flag."},
            {"repo": "third/thing", "name": "thing", "numbers": [50, 51],
             "desc": "Two PRs in one group.",
             "extra": ' <a class="lnk" href="/hunt">the full hunt</a>'},
        ],
        "credited": [
            {"repo": "fourth/proj", "name": "proj", "numbers": [60],
             "desc": "Diagnosis adopted upstream in `#99`.",
             "extra": ' <a class="lnk" href="/n8n">the full hunt</a>'},
        ],
        "exclusions": [
            {"repo": "priv/favor", "number": 3, "reason": "not an OSS project"},
        ],
    }


def _pr(repo, number, status, closed_at=None, is_draft=False):
    state = {"merged": "CLOSED", "open": "OPEN", "closed": "CLOSED"}[status]
    rec = {"repository": {"nameWithOwner": repo}, "number": number,
           "state": state, "status": status, "isDraft": is_draft,
           "url": f"https://github.com/{repo}/pull/{number}"}
    if closed_at:
        rec["closedAt"] = closed_at
    return rec


class MergedSectionTests(unittest.TestCase):
    def setUp(self):
        self.cur = sample()

    def test_one_li_per_merged_entry(self):
        html = bc.render_merged_html(self.cur)
        self.assertEqual(html.count("<li>"), len(self.cur["merged"]))

    def test_sorted_newest_first(self):
        self.assertEqual(bc.merged_numbers_in_order(self.cur), [30, 20, 10])

    def test_every_receipt_present(self):
        html = bc.render_merged_html(self.cur)
        for n in (10, 20, 30):
            self.assertIn(f"#{n}", html)

    def test_first_entry_is_newest(self):
        html = bc.render_merged_html(self.cur)
        first = html.split("<li>", 1)[1]
        self.assertIn("#30", first)

    def test_merge_month_rendered(self):
        self.assertIn("merged May 2026", bc.render_merged_html(self.cur))

    def test_merged_extra_rendered(self):
        html = bc.render_merged_html(self.cur)
        self.assertIn('href="/deep"', html)
        self.assertIn("write-up", html)


class HeadlineTests(unittest.TestCase):
    def test_counts_come_from_the_data(self):
        n_fixes, n_projects, _ = bc.headline(sample())
        self.assertEqual((n_fixes, n_projects), (3, 2))

    def test_sentence_spells_the_numbers(self):
        _, _, sentence = bc.headline(sample())
        self.assertIn("Three fixes merged across two projects", sentence)

    def test_sentence_tracks_growth(self):
        cur = sample()
        cur["merged"].append({"repo": "fifth/one", "number": 70,
                              "merged": "2026-06-01", "name": "one",
                              "desc": "A fourth, in a third repo."})
        _, _, sentence = bc.headline(cur)
        self.assertIn("Four fixes merged across three projects", sentence)


class InReviewTests(unittest.TestCase):
    def setUp(self):
        self.cur = sample()

    def test_one_li_per_group(self):
        html = bc.render_inreview_html(self.cur)
        self.assertEqual(html.count("<li>"), len(self.cur["in_review"]))

    def test_grouped_numbers_all_linked(self):
        html = bc.render_inreview_html(self.cur)
        self.assertIn("#50", html)
        self.assertIn("#51", html)

    def test_draft_tag_sourced_from_live_isdraft(self):
        # draft status is live state from gh, NOT a yaml field — driven by the
        # `drafts` set passed in (so it stays correct when a PR is marked ready).
        with_tag = bc.render_inreview_html(self.cur, drafts={("acme/widget", 40)})
        self.assertIn('<span class="tag">draft</span>', with_tag)
        without = bc.render_inreview_html(self.cur, drafts=set())
        self.assertNotIn('<span class="tag">draft</span>', without)

    def test_drafts_extracted_from_prs(self):
        prs = [
            {"repository": {"nameWithOwner": "a/b"}, "number": 1, "isDraft": True},
            {"repository": {"nameWithOwner": "a/b"}, "number": 2, "isDraft": False},
            {"repository": {"nameWithOwner": "a/b"}, "number": 3},  # missing isDraft
        ]
        self.assertEqual(bc.drafts_from_prs(prs), {("a/b", 1)})

    def test_extra_deep_dive_link_preserved(self):
        html = bc.render_inreview_html(self.cur)
        self.assertIn('href="/hunt"', html)
        self.assertIn("full hunt", html)


class CreditedTests(unittest.TestCase):
    """Adopted-upstream entries render, but never touch the merged count."""

    def test_renders_one_li_per_group(self):
        html = bc.render_credited_html(sample())
        self.assertEqual(html.count("<li>"), 1)
        self.assertIn("#60", html)

    def test_extra_link_preserved(self):
        html = bc.render_credited_html(sample())
        self.assertIn('href="/n8n"', html)

    def test_absent_key_renders_empty(self):
        cur = sample()
        del cur["credited"]
        self.assertEqual(bc.render_credited_html(cur), "")

    def test_does_not_inflate_the_merged_count(self):
        with_credited = bc.headline(sample())[:2]
        bare = sample()
        del bare["credited"]
        self.assertEqual(bc.headline(bare)[:2], with_credited)

    def test_credited_numbers_excluded_from_drift(self):
        # A credited PR is closed-unmerged upstream; it must not read as drift.
        drift = bc.detect_drift([_pr("fourth/proj", 60, "closed")], sample())
        self.assertEqual(drift["new_open"], [])
        self.assertEqual(drift["new_merges"], [])


class DriftDetectionTests(unittest.TestCase):
    """The drift-killer: gh flags what the curated yaml hasn't caught yet."""

    def test_curated_state_is_clean(self):
        prs = [
            _pr("acme/widget", 30, "merged", "2026-05-01T00:00:00Z"),
            _pr("acme/widget", 40, "open"),
            _pr("third/thing", 50, "open"),
        ]
        drift = bc.detect_drift(prs, sample())
        self.assertEqual(drift, {"new_merges": [], "new_open": [], "stale_inreview": []})

    def test_flags_uncurated_merge(self):
        prs = [_pr("someorg/somerepo", 4242, "merged", "2026-07-10T00:00:00Z")]
        drift = bc.detect_drift(prs, sample())
        self.assertEqual(len(drift["new_merges"]), 1)
        self.assertIn("somerepo", drift["new_merges"][0])

    def test_excluded_pr_not_flagged(self):
        prs = [_pr("priv/favor", 3, "merged", "2026-01-01T00:00:00Z")]
        self.assertEqual(bc.detect_drift(prs, sample())["new_merges"], [])

    def test_own_repos_ignored(self):
        prs = [_pr("georgeglarson/anything", 1, "merged", "2026-01-01T00:00:00Z")]
        drift = bc.detect_drift(prs, sample())
        self.assertEqual(drift["new_merges"], [])

    def test_flags_uncurated_open_pr(self):
        drift = bc.detect_drift([_pr("neworg/newrepo", 555, "open")], sample())
        self.assertEqual(len(drift["new_open"]), 1)

    def test_flags_stale_inreview_group(self):
        # An in_review number that has since merged -> flagged so it can move up.
        prs = [_pr("acme/widget", 40, "merged", "2026-07-15T00:00:00Z")]
        drift = bc.detect_drift(prs, sample())
        self.assertTrue(any("40" in m for m in drift["new_merges"]))
        self.assertTrue(any("40" in s for s in drift["stale_inreview"]))

    def test_flags_closed_unmerged_inreview(self):
        # An in_review PR closed WITHOUT merging disappears from both --state open
        # and --merged; it must still be flagged so it doesn't linger as "in review".
        drift = bc.detect_drift([_pr("third/thing", 51, "closed")], sample())
        self.assertTrue(any("51" in s for s in drift["stale_inreview"]),
                        f"closed-unmerged in-review should be stale: {drift}")


class CodeTagTests(unittest.TestCase):
    """Backticks in descriptions render as <code> tags, not literal backticks."""

    def test_merged_backticks_become_code(self):
        html = bc.render_merged_html(sample())
        self.assertIn("<code>TokenExchange</code>", html)
        self.assertNotIn("`TokenExchange`", html)

    def test_inreview_backticks_become_code(self):
        html = bc.render_inreview_html(sample())
        self.assertIn("<code>--launcher</code>", html)
        self.assertNotIn("`--launcher`", html)

    def test_credited_backticks_become_code(self):
        html = bc.render_credited_html(sample())
        self.assertIn("<code>#99</code>", html)


class HeadlineRewriteTests(unittest.TestCase):
    """The headline rewrite must keep matching as the count grows past eight."""

    def test_pattern_matches_any_spelled_number(self):
        for word in ("Eight", "Nine", "Ten", "Eleven", "Twelve",
                     "Fifteen", "Twenty", "20", "13"):
            text = f"{word} fixes merged across seven projects"
            self.assertTrue(
                bc._OLD_HEADLINE_RE.search(text),
                f"headline pattern should match: {text!r}",
            )

    def test_rewrite_handles_growth_past_eight(self):
        html = ('<meta name="description" content="'
                'Nine fixes merged across eight projects, more in review.">')
        out = bc._rewrite_headlines(html, 10, 8)
        self.assertIn("Ten fixes merged across eight projects", out)
        self.assertNotIn("Nine fixes", out)

    def test_rewrite_raises_if_no_headline_present(self):
        with self.assertRaises(RuntimeError):
            bc._rewrite_headlines("nothing here matches", 10, 8)

    def test_rewrite_keeps_a_sentence_opening_capital(self):
        out = bc._rewrite_headlines("Nine fixes merged across eight projects", 15, 10)
        self.assertIn("Fifteen fixes merged across ten projects", out)

    def test_rewrite_keeps_a_mid_sentence_lowercase(self):
        # projects.html reads "The full record: ten fixes merged across ..." —
        # capitalising there reads as a typo.
        out = bc._rewrite_headlines(
            "The full record: ten fixes merged across eight projects", 15, 10)
        self.assertIn("record: fifteen fixes merged across ten projects", out)
        self.assertNotIn("Fifteen", out)


class WriteModeTests(unittest.TestCase):
    """--write end-to-end, against copies of the real pages in a tmpdir.

    This exists because --write has now broken twice in ways the unit suite could
    not see: first when the headline moved off index.html (the rewrite was pinned
    to it and raised), then on a NameError in the success-print that fired after
    both files were already written. Both times the rendering tests were green.
    Nothing below asserts content; it asserts that the command completes.
    """

    def setUp(self):
        self.tmp = tempfile.mkdtemp()
        os.makedirs(os.path.join(self.tmp, "scripts", "testdata"))
        for rel in ("contributions.html", "index.html", "projects.html"):
            src = os.path.join(ROOT, rel)
            if os.path.exists(src):
                shutil.copy(src, os.path.join(self.tmp, rel))
        shutil.copy(YAML, os.path.join(self.tmp, "scripts", "contributions.yaml"))
        shutil.copy(FIXTURE, os.path.join(self.tmp, "scripts", "testdata", "prs.json"))
        self.cwd = os.getcwd()
        os.chdir(self.tmp)

    def tearDown(self):
        os.chdir(self.cwd)
        shutil.rmtree(self.tmp, ignore_errors=True)

    def _run(self):
        err = io.StringIO()
        with redirect_stderr(err):
            bc.main(["--write", "--fixture", "scripts/testdata/prs.json"])
        return err.getvalue()

    def test_write_completes_and_reports_what_it_wrote(self):
        out = self._run()
        self.assertIn("wrote contributions.html", out)
        self.assertIn("fixes merged across", out)

    def test_write_is_idempotent(self):
        self._run()
        first = open("contributions.html").read()
        self._run()
        self.assertEqual(first, open("contributions.html").read())

    def test_write_renders_every_marked_section(self):
        self._run()
        page = open("contributions.html").read()
        cur = bc.load_curation("scripts/contributions.yaml")
        for entry in cur["merged"]:
            self.assertIn(f'/pull/{entry["number"]}', page)
        for group in cur.get("credited", []):
            for n in group["numbers"]:
                self.assertIn(f'/pull/{n}', page,
                              "a credited receipt vanished from the page")

    def test_write_propagates_the_count_to_companion_pages(self):
        self._run()
        n_fixes, n_projects, _ = bc.headline(bc.load_curation("scripts/contributions.yaml"))
        # Case follows the surrounding sentence, so match case-insensitively.
        expected = (f"{bc._numword(n_fixes)} fixes merged across "
                    f"{bc._numword(n_projects)} projects")
        hits = [p for p in bc.COMPANION_PAGES
                if os.path.exists(p) and expected in open(p).read().lower()]
        self.assertTrue(hits, f"no companion page carries {expected!r}")


class LiveCurationInvariants(unittest.TestCase):
    """The real yaml, checked for shape rather than for today's numbers."""

    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_merged_entries_have_the_required_keys(self):
        for e in self.cur["merged"]:
            for key in ("repo", "number", "merged", "name", "desc"):
                self.assertIn(key, e, f"merged entry missing {key}: {e}")

    def test_group_entries_have_the_required_keys(self):
        for section in ("in_review", "credited"):
            for g in self.cur.get(section, []):
                for key in ("repo", "name", "numbers", "desc"):
                    self.assertIn(key, g, f"{section} group missing {key}: {g}")
                self.assertTrue(g["numbers"], f"{section} group has no numbers: {g}")

    def test_headline_sentence_agrees_with_the_entries(self):
        n_fixes, n_projects, sentence = bc.headline(self.cur)
        self.assertEqual(n_fixes, len(self.cur["merged"]))
        self.assertEqual(n_projects, len({e["repo"] for e in self.cur["merged"]}))
        self.assertIn(f"{bc._numword(n_fixes, cap=True)} fixes", sentence)
        self.assertIn(f"{bc._numword(n_projects)} projects", sentence)

    def test_no_pr_is_both_merged_and_in_review(self):
        merged = {bc._merged_key(e) for e in self.cur["merged"]}
        for g in self.cur["in_review"]:
            for n in g["numbers"]:
                self.assertNotIn(
                    (g["repo"], int(n)), merged,
                    f'{g["repo"]}#{n} is curated as merged AND in review',
                )

    def test_credited_is_disjoint_from_merged(self):
        merged = {bc._merged_key(e) for e in self.cur["merged"]}
        for g in self.cur.get("credited", []):
            for n in g["numbers"]:
                self.assertNotIn(
                    (g["repo"], int(n)), merged,
                    f'{g["repo"]}#{n} is both a merged receipt and adopted-upstream',
                )

    def test_fixture_parses_as_gh_records(self):
        with open(FIXTURE) as f:
            prs = json.load(f)
        self.assertTrue(prs)
        for p in prs:
            self.assertIn("nameWithOwner", p["repository"])
            self.assertIn("number", p)


if __name__ == "__main__":
    unittest.main(verbosity=2)
