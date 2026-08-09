#!/usr/bin/env python3
"""Tests for build_contributions.py.

Run: python3 -m unittest scripts.test_build_contributions
  or: python3 scripts/test_build_contributions.py
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
PAGE = os.path.join(HERE, os.pardir, "contributions.html")


def _load_fixture():
    with open(FIXTURE) as f:
        return json.load(f)


class MergedSectionTests(unittest.TestCase):
    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_fifteen_merged_entries(self):
        html = bc.render_merged_html(self.cur)
        self.assertEqual(html.count("<li>"), 15)

    def test_sorted_newest_first(self):
        numbers = bc.merged_numbers_in_order(self.cur)
        self.assertEqual(
            numbers,
            [16272, 16239, 4150, 16152, 1844, 289, 288, 1368, 1133, 1134, 1434,
             564, 475, 4748, 164],
        )

    def test_every_receipt_present(self):
        html = bc.render_merged_html(self.cur)
        for n in (16272, 16239, 4150, 16152, 1844, 289, 288, 1368, 1133, 1134,
                  1434, 564, 475, 4748, 164):
            self.assertIn(f"#{n}", html)

    def test_first_entry_is_newest(self):
        html = bc.render_merged_html(self.cur)
        first = html.split("<li>", 1)[1]
        self.assertIn("#16272", first)


class HeadlineTests(unittest.TestCase):
    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_counts(self):
        n_fixes, n_projects, sentence = bc.headline(self.cur)
        self.assertEqual(n_fixes, 15)
        self.assertEqual(n_projects, 10)

    def test_sentence_spelled_out(self):
        _, _, sentence = bc.headline(self.cur)
        self.assertIn("Fifteen", sentence)
        self.assertIn("ten", sentence)


class InReviewTests(unittest.TestCase):
    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_renders_all_groups(self):
        html = bc.render_inreview_html(self.cur)
        # one <li> per in_review group (9 groups in the yaml)
        self.assertEqual(html.count("<li>"), len(self.cur["in_review"]))
        # every group named explicitly: the count assertion above is dynamic, so
        # it alone would keep passing while a newly-curated group went unchecked
        for repo in (
            "OpenHands/OpenHands", "livekit/agents", "allenai/open-instruct",
            "stryker-mutator/stryker-net", "kputnam/stupidedi",
            "mitmproxy/mitmproxy", "charmbracelet/crush", "Comfy-Org/ComfyUI_frontend",
        ):
            self.assertIn(repo, html)

    def test_n8n_no_longer_sits_in_review(self):
        # #29516 was closed unmerged 2026-08-04; it moved to `credited`. Leaving
        # it here is the exact stale claim this page must not make.
        self.assertNotIn("29516", bc.render_inreview_html(self.cur))

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


class PageInvariantTests(unittest.TestCase):
    """Whole-page guarantees that must hold no matter which section owns an entry."""

    def setUp(self):
        self.cur = bc.load_curation(YAML)
        with open(PAGE) as f:
            self.html = f.read()

    def test_page_keeps_the_only_inbound_link_to_the_n8n_write_up(self):
        # /contributions is the only page linking /n8n. This was an in_review
        # `extra` until #29516 closed and the entry moved to `credited`; asserted
        # at page level so a future move between sections can't orphan the
        # write-up while a section-scoped test keeps passing.
        out, _ = bc.regenerate_html(self.html, self.cur)
        self.assertIn('href="/n8n"', out)
        self.assertIn("full hunt", out)

    def test_regenerated_page_is_stable(self):
        # Committed page must equal what the generator produces, so a reviewer
        # reads the same html the next --write would.
        out, _ = bc.regenerate_html(self.html, self.cur)
        self.assertEqual(out, self.html, "contributions.html is stale — re-run "
                                         "build_contributions.py --write")


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

    def test_fixture_covers_every_curated_entry(self):
        # The clean-against-curation test above asserts drift is EMPTY, so a
        # curated entry the fixture never heard of makes it pass vacuously —
        # detect_drift only flags an in_review number that is present-and-closed,
        # never one that is absent. Curating without updating the fixture
        # therefore shrinks offline coverage silently. Caught by the review panel
        # 2026-07-31 on the OpenHands #16145/#16152 curation, which added both to
        # the yaml and neither here.
        prs = _load_fixture()
        known = {(p["repository"]["nameWithOwner"], int(p["number"])) for p in prs}
        cur = bc.load_curation(YAML)
        # The three PRs gh's search index silently drops can't be in a fixture
        # that mirrors gh output. They're declared in the yaml so this stays a
        # checked invariant rather than a comment.
        known |= {(g["repo"], int(g["number"])) for g in cur.get("search_index_gaps", [])}
        missing = [
            f"{e['repo']}#{e['number']}"
            for e in cur["merged"]
            if (e["repo"], int(e["number"])) not in known
        ] + [
            f"{g['repo']}#{n}"
            for g in cur["in_review"]
            for n in g["numbers"]
            if (g["repo"], int(n)) not in known
        ] + [
            # credited entries too: the fixture is the only offline exercise of
            # the closed-unmerged path, and that path is precisely the one the
            # live detector was blind to before `stale_credited` existed.
            f"{e['repo']}#{e['number']}"
            for e in cur.get("credited", [])
            if (e["repo"], int(e["number"])) not in known
        ]
        self.assertEqual(
            missing, [],
            f"curated but absent from scripts/testdata/prs.json: {missing}. "
            f"Add them (fields: number, title, url, state, status, createdAt, "
            f"closedAt, isDraft, repository) so the offline path covers them.",
        )

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


class CreditedSectionTests(unittest.TestCase):
    """Work whose idea shipped under someone else's commit.

    Its own section because it is neither: a closed-unmerged PR can't sit in
    `in_review` (it isn't), and it must never reach `merged` (the commit that
    landed isn't George's). Counting it would inflate the headline, so the
    headline tests below pin that it doesn't.
    """

    def setUp(self):
        self.cur = bc.load_curation(YAML)

    def test_renders_one_li_per_entry(self):
        html = bc.render_credited_html(self.cur)
        self.assertEqual(html.count("<li>"), len(self.cur["credited"]))

    def test_n8n_entry_links_the_closed_pr_and_the_merged_one(self):
        html = bc.render_credited_html(self.cur)
        self.assertIn("n8n-io/n8n/pull/29516", html)
        self.assertIn("n8n-io/n8n/pull/35456", html)

    def test_deep_dive_link_moved_across_with_the_entry(self):
        # /contributions is the only inbound link to the /n8n write-up. It rode
        # on the in_review group before; losing it here would orphan the page.
        html = bc.render_credited_html(self.cur)
        self.assertIn('href="/n8n"', html)
        self.assertIn("full hunt", html)

    def test_never_tagged_as_merged(self):
        html = bc.render_credited_html(self.cur)
        self.assertNotIn('<span class="tag">merged', html)

    def test_absent_key_renders_empty_rather_than_raising(self):
        # `credited` is optional curation; a yaml without it must still build.
        self.assertEqual(bc.render_credited_html({"merged": [], "in_review": []}), "")

    def test_backticks_become_code(self):
        cur = {"credited": [{
            "repo": "a/b", "number": 1, "name": "a", "shipped_in": 2,
            "desc": "a `flag` fix",
        }]}
        self.assertIn("<code>flag</code>", bc.render_credited_html(cur))


class CreditedCountTests(unittest.TestCase):
    """Credited work is a receipt, not a merge. It must not move the count."""

    def test_headline_ignores_credited_entries(self):
        cur = {
            "merged": [{"repo": "a/b", "number": 1, "merged": "2026-07-01",
                        "name": "a", "desc": "x"}],
            "in_review": [],
            "credited": [{"repo": "c/d", "number": 2, "name": "c",
                          "shipped_in": 3, "desc": "y"}],
        }
        n_fixes, n_projects, _ = bc.headline(cur)
        self.assertEqual(n_fixes, 1)
        self.assertEqual(n_projects, 1)


class CreditedDriftTests(unittest.TestCase):
    """A credited PR is closed-unmerged, which drift detection is otherwise blind to."""

    def test_credited_pr_not_flagged_while_it_stays_closed(self):
        prs = [{
            "repository": {"nameWithOwner": "n8n-io/n8n"},
            "number": 29516, "state": "CLOSED", "status": "closed",
            "url": "https://github.com/n8n-io/n8n/pull/29516",
        }]
        drift = bc.detect_drift(prs, bc.load_curation(YAML))
        self.assertEqual(drift["stale_credited"], [])
        self.assertEqual(drift["new_open"], [])

    def test_reopened_credited_pr_is_flagged(self):
        # If it reopens, the page's "closed in favour of" prose becomes a lie.
        prs = [{
            "repository": {"nameWithOwner": "n8n-io/n8n"},
            "number": 29516, "state": "OPEN", "status": "open", "isDraft": False,
            "url": "https://github.com/n8n-io/n8n/pull/29516",
        }]
        drift = bc.detect_drift(prs, bc.load_curation(YAML))
        self.assertTrue(any("29516" in s for s in drift["stale_credited"]), drift)
        # and it must not double-report as an uncurated open PR
        self.assertEqual(drift["new_open"], [])

    def test_merged_credited_pr_is_flagged(self):
        prs = [{
            "repository": {"nameWithOwner": "n8n-io/n8n"},
            "number": 29516, "state": "CLOSED", "status": "merged",
            "closedAt": "2026-09-01T00:00:00Z",
            "url": "https://github.com/n8n-io/n8n/pull/29516",
        }]
        drift = bc.detect_drift(prs, bc.load_curation(YAML))
        self.assertTrue(any("29516" in s for s in drift["stale_credited"]), drift)
        # a merge belongs in `merged:`, so that promotion must be flagged too
        self.assertTrue(any("29516" in m for m in drift["new_merges"]), drift)


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

    def test_rewrite_keeps_a_sentence_opening_capital(self):
        out = bc._rewrite_headlines(
            "Nine fixes merged across eight projects", 15, 10)
        self.assertIn("Fifteen fixes merged across ten projects", out)

    def test_rewrite_keeps_a_mid_sentence_lowercase(self):
        # projects.html reads "The full record: ten fixes merged across ...".
        # Capitalising mid-sentence there reads as a typo.
        out = bc._rewrite_headlines(
            "The full record: ten fixes merged across eight projects", 15, 10)
        self.assertIn("record: fifteen fixes merged across ten projects", out)
        self.assertNotIn("Fifteen", out)


class CompanionPageTests(unittest.TestCase):
    """--write must keep EVERY page carrying the count in step, not just index.

    projects.html has carried its own copy of the headline since the line moved
    off index.html (0aab53d, 2026-07-20). Nothing updated it, so /projects said
    "ten fixes merged across eight projects" while /contributions said fifteen
    across ten, live, for weeks. These run main() end to end against copies in a
    tmpdir; nothing else in this suite exercises --write at all, which is how
    that stayed invisible.
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

    def _expected(self):
        n_fixes, n_projects, _ = bc.headline(bc.load_curation("scripts/contributions.yaml"))
        return (f"{bc._numword(n_fixes)} fixes merged across "
                f"{bc._numword(n_projects)} projects")

    def test_write_completes(self):
        self.assertIn("wrote contributions.html", self._run())

    def test_every_carrier_ends_up_in_step(self):
        self._run()
        expected = self._expected()
        for companion in bc.COMPANION_PAGES:
            if not os.path.exists(companion):
                continue
            page = open(companion).read()
            if not bc._OLD_HEADLINE_RE.search(page):
                continue  # this page carries no count
            self.assertIn(expected, page.lower(),
                          f"{companion} still carries a stale count")

    def test_projects_page_is_rewritten(self):
        # The regression that shipped: projects.html was never a write target.
        before = open("projects.html").read()
        self.assertIn("fixes merged across", before,
                      "fixture drift: projects.html no longer carries the count")
        self._run()
        self.assertIn(self._expected(), open("projects.html").read().lower())

    def test_write_is_idempotent(self):
        self._run()
        snapshot = {p: open(p).read() for p in
                    ("contributions.html", *bc.COMPANION_PAGES) if os.path.exists(p)}
        self._run()
        for path, content in snapshot.items():
            self.assertEqual(content, open(path).read(), f"{path} not idempotent")


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
