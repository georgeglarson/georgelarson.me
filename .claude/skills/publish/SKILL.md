# Publish Story

Generate all publishing variants from a single story.md source file, and update the homepage.

## Usage

- `/publish writing/2026-03-28-my-story/` — generate all variants from existing story.md
- `/publish new "Story Title"` — scaffold a new story directory with story.md template

## When given a directory

1. Verify `story.md` exists in the directory
2. Run `./scripts/publish.sh <directory>` to generate: `index.html`, `devto.md`, `social-mastodon.md`, `social-linkedin.md`, `social-hn.md`
3. Update the writing section in `index.html` (homepage) to include the new story card if not already listed — insert in reverse chronological order (newest first)
4. Report what was generated

## When scaffolding a new story

1. Determine the slug from the title (lowercase, hyphens, no special chars)
2. Create the directory: `writing/YYYY-MM-DD-slug/`
3. Create `story.md` with this template:

```markdown
---
title: "The Title"
slug: YYYY-MM-DD-slug
date: YYYY-MM-DD
description: ""
tags:
og_title: ""
og_description: ""
cover_image:
lead: ""
---

<!-- social:mastodon -->

<!-- /social:mastodon -->

<!-- social:linkedin -->

<!-- /social:linkedin -->

<!-- social:hn -->

<!-- /social:hn -->

## First section

```

4. Tell the user the file is ready to edit

## Story source format

The `story.md` frontmatter fields:
- `title` — article title (used in HTML title, OG tags, devto frontmatter)
- `slug` — URL path segment (e.g. `2026-03-28-my-story`)
- `date` — publication date
- `description` — 80-120 word description (meta tags + devto)
- `tags` — comma-separated, lowercase (devto tags)
- `og_title` — optional OG title override
- `og_description` — optional OG description override
- `cover_image` — optional cover image URL
- `lead` — subtitle/hook paragraph shown under the h1

Social posts are written as fenced blocks inside the markdown:
- `<!-- social:mastodon -->` ... `<!-- /social:mastodon -->` (under 500 chars)
- `<!-- social:linkedin -->` ... `<!-- /social:linkedin -->` (~1000-1500 chars)
- `<!-- social:hn -->` ... `<!-- /social:hn -->` (title + one-liner)

The article body is standard markdown with raw HTML blocks for custom layouts (grids, diagrams, tables). Include a `<style>` block anywhere in the body for page-specific CSS.

## Homepage update

When adding a new story card to `index.html`, use this pattern:

```html
<a class="project-card" href="/writing/{slug}/">
  <h3>{lowercase title}</h3>
  <p>{teaser — 1-2 sentences}</p>
  <div class="project-meta">
    <span class="tag">{category}</span>
    <span class="project-stat">{month year}</span>
  </div>
  <span class="project-link">read</span>
</a>
```

Insert as the first card in the `<div class="project-grid">` under the writing `<h2>`.
