# Plan: Publishing Pipeline for georgelarson.me

**Generated**: 2026-03-24
**Estimated Complexity**: Medium

## Overview

Build a write-once, publish-everywhere pipeline. You write one `story.md` per article. A generator script produces all platform variants (site HTML, Dev.to, Mastodon, LinkedIn). Irony picks up the markdown files from the repo for automated distribution. The homepage writing section stays current automatically.

**Design decisions (from "high quality"):**
- Social posts are hand-written sections inside `story.md`, not auto-generated summaries — you write differently for each audience
- Page-specific CSS blocks are supported via a `style` frontmatter field or inline `<style>` in the markdown
- Images use relative paths in `story.md`; the generator rewrites them for Dev.to (canonical URL prefix)
- The generator is a bash script in `scripts/` AND a Claude Code skill (`/publish`) that wraps it
- Reusable HTML block types (code blocks, diagrams, decision grids, comparison tables) via CSS classes already in your stories — the markdown just uses raw HTML when needed (same as Dev.to)

## Story Source Format

```markdown
---
title: "The Title"
slug: the-title
date: 2026-03-28
description: "80-120 word description for meta tags and Dev.to"
tags: ai, benchmarks, llm, devtools
cover_image:
---

<!-- social:mastodon -->
Your 400-char mastodon post here.
Punchy. Metrics. Link auto-appended.
#Hashtags #Here
<!-- /social:mastodon -->

<!-- social:linkedin -->
Your 1200-char LinkedIn post here.
Narrative arc. Metrics. Context.
Multiple paragraphs.
#Hashtags #Here
<!-- /social:linkedin -->

<!-- social:hn -->
Show HN: Title — one-line description
<!-- /social:hn -->

## The article body starts here

Regular markdown. Images via `![alt](image.png)`.
Raw HTML blocks for custom layouts (grids, diagrams) — passed through to both site HTML and Dev.to.

<style>
.custom-thing { /* page-specific CSS, only used in site HTML */ }
</style>
```

## Prerequisites
- bash, sed, awk (already available)
- No external dependencies — pure shell + the markdown conventions above
- Existing `style.css` and HTML boilerplate from current stories

## Sprint 1: The Generator
**Goal**: `scripts/publish.sh` reads `story.md` and produces all output files in the same directory.

**Demo/Validation**:
- Run against the Fracture story (reverse-engineer a `story.md` from existing files)
- Diff generated output against hand-crafted originals — should be near-identical

### Task 1.1: Build the HTML template
- **Location**: `scripts/publish.sh`
- **Description**: Extract the common HTML boilerplate from existing story pages into a template function. Head (meta, OG tags, favicon, stylesheet), body structure (breadcrumb, header with caret, lead paragraph, content, footer). Inject: title, description, og:url, date, inline style block, article body.
- **Acceptance Criteria**:
  - Generated HTML matches the structure of existing stories
  - CSS variables (`--accent`, `--radius`, etc.) work correctly
  - `page-wide` class applied, breadcrumb links home
  - OG meta tags populated from frontmatter

### Task 1.2: Build the Dev.to generator
- **Location**: `scripts/publish.sh`
- **Description**: Extract article body from `story.md`, prepend Dev.to YAML frontmatter (title, published: false, description, tags, canonical_url, cover_image). Rewrite relative image paths to absolute URLs (`https://georgelarson.me/writing/{slug}/image.png`). Strip `<style>` blocks and any HTML-only elements that don't render on Dev.to.
- **Acceptance Criteria**:
  - Frontmatter matches existing devto.md format exactly
  - `canonical_url` points to georgelarson.me
  - Images use absolute URLs
  - No broken HTML in the markdown output

### Task 1.3: Extract social posts
- **Location**: `scripts/publish.sh`
- **Description**: Parse `<!-- social:mastodon -->` / `<!-- social:linkedin -->` / `<!-- social:hn -->` fenced sections from `story.md`. Write each to its own file. For mastodon, auto-append the canonical URL if not present. For LinkedIn, auto-append canonical URL if not present.
- **Acceptance Criteria**:
  - `social-mastodon.md`, `social-linkedin.md`, `social-hn.md` generated
  - Mastodon post ≤ 500 chars (warn if over)
  - URLs appended correctly

### Task 1.4: CLI interface
- **Location**: `scripts/publish.sh`
- **Description**: Accept a story directory path as argument. Validate `story.md` exists. Run all generators. Print summary of files created/updated.
- **Usage**: `./scripts/publish.sh writing/2026-03-28-my-story/`
- **Acceptance Criteria**:
  - Errors on missing story.md
  - Idempotent — safe to re-run
  - Prints what it generated

## Sprint 2: Backfill Existing Stories
**Goal**: Get all three existing stories into the new format, finish nully doorman distribution files, update homepage.

**Demo/Validation**:
- All three stories have complete file sets
- Homepage lists all three stories
- `git diff` shows only the expected additions

### Task 2.1: Reverse-engineer story.md for Fracture
- **Location**: `writing/2026-03-25-fracture-legacy-modernization/story.md`
- **Description**: Combine the existing `index.html` content, `devto.md` body, and social posts into a single `story.md` source file. This becomes the canonical source; existing files become generated output.
- **Acceptance Criteria**:
  - Running `publish.sh` against this story.md produces output that closely matches existing files
  - No content lost

### Task 2.2: Reverse-engineer story.md for Hermes review
- **Location**: `writing/2026-03-19-hermes-review/story.md`
- **Description**: Same as 2.1 for the Hermes review.

### Task 2.3: Finish nully doorman
- **Location**: `writing/2026-03-23-nullclaw-doorman/`
- **Description**: The index.html exists as a rough draft. Create `story.md` from its content, then generate `devto.md`, `social-mastodon.md`, `social-linkedin.md` using the pipeline. Review and polish the draft content.
- **Acceptance Criteria**:
  - All four output files exist
  - Content is polished and consistent with the other stories' tone/quality

### Task 2.4: Update homepage writing section
- **Location**: `index.html` (lines ~135-147)
- **Description**: Add project-cards for the Fracture and nully doorman stories to the writing section. Currently only Hermes is listed. Order reverse-chronologically (newest first): Fracture, nully, Hermes.
- **Acceptance Criteria**:
  - All three stories listed
  - Cards follow existing pattern (lowercase title, teaser, tag, date, "read" link)
  - Links work

## Sprint 3: Claude Code Skill
**Goal**: `/publish` skill that wraps the generator for fast in-conversation use.

**Demo/Validation**:
- Type `/publish` in Claude Code conversation
- It finds/creates the story directory, runs the generator, reports results

### Task 3.1: Create the /publish skill
- **Location**: `.claude/skills/publish/SKILL.md`
- **Description**: Claude Code skill that:
  1. If given a story directory, runs `scripts/publish.sh` against it
  2. If given a topic/outline, creates `story.md` with frontmatter and social post scaffolding, then runs the generator
  3. Reports what files were created/updated
- **Acceptance Criteria**:
  - `/publish writing/2026-03-28-foo/` generates all files
  - `/publish "new story about X"` scaffolds story.md with the right frontmatter template

### Task 3.2: Add publish to index.html automation
- **Description**: The `/publish` skill should also update `index.html`'s writing section when a new story is published (add the project-card). This avoids manual homepage edits.
- **Acceptance Criteria**:
  - New stories automatically appear on homepage after `/publish`
  - Insertion point is correct (top of project-grid, reverse chronological)

## Testing Strategy
- **Sprint 1**: Generate from existing story data, diff against hand-crafted originals
- **Sprint 2**: Visual check of all three stories on the live site (or local file:// preview)
- **Sprint 3**: End-to-end: `/publish` a test story, verify all files + homepage update

## Potential Risks & Gotchas
- **Markdown-to-HTML fidelity**: The site HTML uses raw HTML blocks (grids, diagrams). The generator passes these through rather than trying to parse markdown into custom layouts. This means `story.md` will contain some raw HTML — that's fine, it's the same as what Dev.to supports.
- **Image handling**: Dev.to needs absolute URLs. If images aren't yet pushed to the repo/CDN, the URLs won't resolve. The generator warns about this but can't fix it.
- **Style block stripping**: Dev.to ignores `<style>` tags. The generator strips them for devto.md but preserves them for index.html. Any CSS-dependent visual (custom grids) will render as plain HTML on Dev.to — acceptable tradeoff.
- **Social post quality**: These are hand-written in story.md, not auto-generated. If someone forgets to write them, the generator should warn (not silently produce empty files).
- **Nully doorman "rough draft"**: Task 2.3 involves content polish, not just format conversion. Budget time for editorial review.

## Rollback Plan
- All changes are additive (new files, new script). Existing hand-crafted files are preserved until explicitly replaced.
- The `story.md` source format is plain markdown — no vendor lock-in. If the generator breaks, you still have readable source files.
- Homepage changes are a few HTML lines — trivially revertible.
