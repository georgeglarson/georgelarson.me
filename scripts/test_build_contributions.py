#!/usr/bin/env python3
"""Tests for build_contributions.py.

Run: python3 -m unittest scripts.test_build_contributions
  or: python3 scripts/test_build_contributions.py
"""
import json
import os
import sys
import unittest

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import build_contributions as bc  # noqa: E402

YAML = os.path.join(HERE, "contributions.yaml")
FIXTURE = os.path.join(HERE, "testdata", "prs.json")


def _load_fixture():
    with open(FIXTURE) as f:
        return json.load(f)


class MergedSectionTests(unittest.TestCase):
    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_twelve_merged_entries(self):
        html = bc.render_merged_html(self.cur)
        self.assertEqual(html.count("<li>"), 12)

    def test_sorted_newest_first(self):
        numbers = bc.merged_numbers_in_order(self.cur)
        self.assertEqual(
            numbers, [4150, 1844, 289, 288, 1368, 1133, 1134, 1434, 564, 475, 4748, 164]
        )

    def test_every_receipt_present(self):
        html = bc.render_merged_html(self.cur)
        for n in (4150, 1844, 289, 288, 1368, 1133, 1134, 1434, 564, 475, 4748, 164):
            self.assertIn(f"#{n}", html)

    def test_first_entry_is_newest(self):
        html = bc.render_merged_html(self.cur)
        first = html.split("<li>", 1)[1]
        self.assertIn("#4150", first)


class HeadlineTests(unittest.TestCase):
    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_counts(self):
        n_fixes, n_projects, sentence = bc.headline(self.cur)
        self.assertEqual(n_fixes, 12)
        self.assertEqual(n_projects, 9)

    def test_sentence_spelled_out(self):
        _, _, sentence = bc.headline(self.cur)
        self.assertIn("Twelve", sentence)
        self.assertIn("nine", sentence)


class InReviewTests(unittest.TestCase):
    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_renders_all_groups(self):
        html = bc.render_inreview_html(self.cur)
        # one <li> per in_review group (8 groups in the yaml)
        self.assertEqual(html.count("<li>"), len(self.cur["in_review"]))
        for repo in (
            "livekit/agents", "allenai/open-instruct", "stryker-mutator/stryker-net",
            "kputnam/stupidedi", "n8n-io/n8n", "mitmproxy/mitmproxy",
            "charmbracelet/crush", "Comfy-Org/ComfyUI_frontend",
        ):
            self.assertIn(repo, html)

    def test_draft_tag_sourced_from_live_isdraft(self):
        # draft status is live state from gh, NOT a yaml field — driven by the
        # `drafts` set passed in (so it stays correct when a PR is marked ready).
        with_tag = bc.render_inreview_html(self.cur, drafts={("stryker-mutator/stryker-net", 3694)})
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
        # n8n has a /n8n hunt write-up; its `extra` link must survive generation.
        html = bc.render_inreview_html(self.cur)
        self.assertIn('href="/n8n"', html)
        self.assertIn("full hunt", html)


class DriftDetectionTests(unittest.TestCase):
    """The drift-killer: gh flags what the curated yaml hasn't caught yet."""

    def test_real_fixture_is_clean_against_curation(self):
        # All real merges are curated, all real open PRs are covered -> no drift.
        prs = _load_fixture()
        cur = bc.load_curation(YAML)
        drift = bc.detect_drift(prs, cur)
        self.assertEqual(drift["new_merges"], [], f"unexpected new merges: {drift['new_merges']}")
        self.assertEqual(drift["new_open"], [], f"unexpected new open: {drift['new_open']}")
        self.assertEqual(drift["stale_inreview"], [], f"unexpected stale in-review: {drift['stale_inreview']}")

    def test_flags_uncurated_merge(self):
        # A merged external PR that isn't in the yaml and isn't excluded -> flagged.
        prs = [{
            "repository": {"nameWithOwner": "someorg/somerepo"},
            "number": 4242, "state": "CLOSED", "status": "merged",
            "closedAt": "2026-07-10T00:00:00Z", "url": "https://github.com/someorg/somerepo/pull/4242",
        }]
        cur = bc.load_curation(YAML)
        drift = bc.detect_drift(prs, cur)
        self.assertEqual(len(drift["new_merges"]), 1)
        self.assertIn("somerepo", drift["new_merges"][0])

    def test_excluded_pr_not_flagged(self):
        prs = [{
            "repository": {"nameWithOwner": "Baidis/veniceBasic"},
            "number": 3, "state": "CLOSED", "status": "merged",
            "closedAt": "2026-01-01T00:00:00Z", "url": "https://github.com/Baidis/veniceBasic/pull/3",
        }]
        cur = bc.load_curation(YAML)
        drift = bc.detect_drift(prs, cur)
        self.assertEqual(drift["new_merges"], [])

    def test_flags_uncurated_open_pr(self):
        prs = [{
            "repository": {"nameWithOwner": "neworg/newrepo"},
            "number": 555, "state": "OPEN", "status": "open", "isDraft": False,
            "url": "https://github.com/neworg/newrepo/pull/555",
        }]
        cur = bc.load_curation(YAML)
        drift = bc.detect_drift(prs, cur)
        self.assertEqual(len(drift["new_open"]), 1)

    def test_flags_stale_inreview_group(self):
        # An in_review number that has since merged -> flagged so it can move up.
        prs = [{
            "repository": {"nameWithOwner": "Comfy-Org/ComfyUI_frontend"},
            "number": 11686, "state": "CLOSED", "status": "merged",
            "closedAt": "2026-07-15T00:00:00Z",
            "url": "https://github.com/Comfy-Org/ComfyUI_frontend/pull/11686",
        }]
        cur = bc.load_curation(YAML)
        drift = bc.detect_drift(prs, cur)
        # #11686 merged -> it's a new merge to curate AND the in_review group is now stale
        self.assertTrue(any("11686" in m for m in drift["new_merges"]))
        self.assertTrue(any("11686" in s for s in drift["stale_inreview"]))

    def test_flags_closed_unmerged_inreview(self):
        # An in_review PR closed WITHOUT merging disappears from both --state open
        # and --merged; it must still be flagged so it doesn't linger as "in review".
        prs = [{
            "repository": {"nameWithOwner": "mitmproxy/mitmproxy"},
            "number": 8199, "state": "CLOSED", "status": "closed",
            "url": "https://github.com/mitmproxy/mitmproxy/pull/8199",
        }]
        cur = bc.load_curation(YAML)
        drift = bc.detect_drift(prs, cur)
        self.assertTrue(any("8199" in s for s in drift["stale_inreview"]),
                        f"closed-unmerged in-review should be stale: {drift}")


class CodeTagTests(unittest.TestCase):
    """Backticks in descriptions render as <code> tags, not literal backticks."""

    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_merged_backticks_become_code(self):
        html = bc.render_merged_html(self.cur)
        self.assertIn("<code>TokenExchange</code>", html)
        self.assertNotIn("`TokenExchange`", html)

    def test_inreview_backticks_become_code(self):
        html = bc.render_inreview_html(self.cur)
        self.assertIn("<code>--launcher</code>", html)
        self.assertNotIn("`--launcher`", html)


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


class MergedExtraTests(unittest.TestCase):
    """A merged entry's `extra` (e.g. a deep-dive link) must render, symmetric with in_review."""

    def test_merged_extra_rendered(self):
        cur = {
            "merged": [{
                "repo": "foo/bar", "number": 1, "merged": "2026-07-01",
                "name": "foo", "desc": "a fix",
                "extra": " <a class=\"lnk\" href=\"/deep\">the write-up</a>",
            }],
            "in_review": [], "exclusions": [],
        }
        html = bc.render_merged_html(cur)
        self.assertIn('href="/deep"', html)
        self.assertIn("write-up", html)


if __name__ == "__main__":
    unittest.main(verbosity=2)
