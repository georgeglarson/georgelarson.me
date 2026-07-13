# Writing Style Guide

## Voice and tone

- Cheerful and excited to share. Think "look what I found" not "look what I did."
- Curious, not authoritative. Share the journey, not the resume.
- Proud of the work, confident in the approach, but don't prove it by listing credentials. "Here's what I built and why it works" is strong. "25 years of experience means I know what good code looks like" is unnecessary. The work already shows it.
- Write like you're telling a friend about something cool you built or stumbled on.
- Let the work speak. Numbers, results, and specifics are more convincing than claims about expertise.
- Avoid proclamation voice: "This is what X actually looks like." State what happened, let the reader draw conclusions.

## Patterns to avoid

- "not X, it's Y" reframes (e.g., "it's not typing prompts, it's knowing what good code looks like")
- Mic-drop closers that rest on the writer's authority
- Em dashes used for dramatic pause. Use commas, colons, or periods instead.
- Staccato contrast: "The model wrote X. I chose Y. The model is fast. The judgment is mine."
- Listing credentials or years of experience as proof points

## AI-scrub rules

After generating or editing story content, scrub these AI-voice patterns:
- Em dashes used for emphasis, pause, or contrast. Replace with commas, colons, periods, or parentheses.
- "not just X, it's Y" / "not X, but Y" reframes
- Proclamation sentences that end with authority claims
- Staccato one-liners that build to a mic-drop conclusion

# Blog Pipeline

## Publishing schedule

Posts go live Tue/Thu. Social distribution same day.

## Publishing workflow

1. Draft story in `writing/YYYY-MM-DD-slug/story.md`
2. Run `bash scripts/publish.sh writing/YYYY-MM-DD-slug/` to generate: index.html, devto.md, social-mastodon.md, social-linkedin.md, social-hn.md
3. Add `cover_image: filename.webp` to frontmatter and reference in story body. Never publish without an image.
4. AI-scrub the story (see rules above)
5. Add story card to homepage `index.html` (first position in the writing project-grid)
6. Commit, push, wait for deploy
7. Publish one platform at a time using `scripts/distribute.sh` functions (source env from `~/.ironclaw/.env`):
   - Dev.to (API, may require moderation)
   - Mastodon (API, 500 char limit)
   - Hashnode (API, uses devto.md content)
   - Bluesky (API, 300 grapheme limit)
   - LinkedIn (manual, copy from `social-linkedin.md`)
   - HN (manual, copy from `social-hn.md`)
8. Create/update `published.md` with links
9. Add round data to `georgeglarson/llm-showdown-data` public repo as posts go live

## Source material

The LLM Showdown project (private repo `georgeglarson/llm-showdown`) has raw data for the blog series:
- `FINDINGS.md` — round-by-round results, the primary data source
- `JOURNAL.md` — story beats and observations for drafting
- `CHALLENGE.md` / `PROMPT.md` — challenge specs
- `ladder/DESIGN.md` — difficulty ladder design
- `runs/` — per-model run archives

Only reference data that has a published blog post. Do not expose findings from later rounds.

## Published stories

| Story | Date | Platforms |
|-------|------|-----------|
| nullclaw-doorman | 2026-03-23 | blog, Dev.to, Hashnode, Mastodon, Bluesky, Moltbook |
| fracture-legacy-modernization | 2026-03-25 | blog, Dev.to, Hashnode, Mastodon, Bluesky, Moltbook |
| hermes-review | 2026-03-19 | blog, Dev.to, Mastodon |
| network-tools | 2026-04-01 | social media (pre-workflow) |
| six-problems-six-languages | 2026-03-31 | blog, Mastodon, LinkedIn |
| $25-ai-lab | 2026-04-03 | blog, Dev.to, Mastodon, Hashnode, Bluesky, HN (pending) |

## Next up (Thursday 2026-04-09)

LLM Showdown blog series, round 2 or 3. Candidate topics from early project content:
- "The prompt that made everything worse" (Round 3: debugging methodology A/B test)
- "Same model, different provider" (qwen3-coder on Alibaba DashScope)
- "Bug comments don't matter" (Round 4 vs 4.5)

Source: `JOURNAL.md` lines 42-78, `FINDINGS.md` relevant sections.

# Contributions page

`/contributions` is generated, not hand-edited. The source of truth is
`scripts/contributions.yaml`; `scripts/build_contributions.py` renders it into
`contributions.html` and flags drift against live GitHub.

## Why a curated yaml and not pure `gh search`

GitHub's search index has gaps and silently drops some older merged PRs (opencode
2025-11, models.dev 2025-12, largo 2014 are all merged-by-georgeglarson but never
appear in `gh search prs --merged`). So the yaml is the display authority, and
`gh search` is the detection layer that surfaces anything not yet curated.

## When to regenerate

- A PR merged, opened, or closed.
- Before deploying (the page should never ship stale).

## How

```
python3 -m pip install --user -r scripts/requirements.txt  # PyYAML (one-time)
python3 scripts/build_contributions.py --write            # uses live gh
python3 scripts/build_contributions.py --write --fixture scripts/testdata/prs.json  # offline
python3 scripts/test_build_contributions.py               # tests
```

`--write` rewrites the `<li>` blocks between the `<!-- contributions:* -->` markers
and the headline count in the meta tags + `index.html` receipt line.

## Drift report (stderr)

- `new merge` — a merged external PR not in `merged:` and not in `exclusions:`.
  Add it to `merged:` (and write its `desc`).
- `new open PR` — an open external PR not covered by any `in_review:` group.
  Add a group (or extend an existing one) with a `desc`.
- `stale review` — an `in_review:` number that merged (move it up to `merged:`) or was closed without merging (remove the group / number).

## Curation rules

- `merged:` is authoritative for the count and the Merged section. Sort is by
  `merged` date descending (handled by the generator).
- `desc` uses backticks for code spans (`like this`) — the generator turns them
  into `<code>` tags. Don't hand-write `<code>`.
- `extra` (optional) is raw HTML appended inside the `<p class="desc">` — used for
  deep-dive links like n8n's `/n8n` hunt write-up.
- Draft status is sourced live from gh `isDraft` — a draft PR renders `<span class="tag">draft</span>` automatically. Don't set draft in the yaml (it's live state, not curation).
- `exclusions:` suppresses drift noise for PRs consciously not displayed
  (interview take-homes, private favors). Keep the `reason`.

## Excluded on purpose (do not re-add via drift)

Interview take-homes, private favors, and closed-unmerged PRs are not receipts.
The closed-unmerged ones never trigger drift (detection only fires on merged or
open). The `exclusions:` list covers the rest.

