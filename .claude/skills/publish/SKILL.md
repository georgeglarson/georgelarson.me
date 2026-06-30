# Publish Story

Generate all publishing variants from a single story.md source file, and update the homepage.

## Usage

- `/publish writing/2026-03-28-my-story/` — generate all variants from existing story.md
- `/publish new "Story Title"` — scaffold a new story directory with story.md template

## When given a directory

1. Verify `story.md` exists in the directory
2. Run `./scripts/publish.sh <directory>` to generate: `index.html`, `devto.md`, `social-mastodon.md`, `social-linkedin.md`, `social-hn.md`
3. Add the post to `writing/index.html` (the writing index) as the first `<li>` in `<ul class="writing-list">`, newest first. Refresh the landing's WRITING teaser (the `.writing` section in `index.html`) when a newer post should lead.
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

The article body is standard markdown; raw HTML blocks (tables, the odd diagram) pass through. Avoid page-specific `<style>` blocks: the mono-editorial system (`/css/site.css`) styles article bodies through `.article-body`, and per-page styles drift from it (the legacy posts' neon `<style>` blocks were stripped in the 2026-06-30 rebuild).

## Index + homepage update

The article HTML renders through the mono-editorial template in `scripts/publish.sh` (`/css/site.css`, `.article-body` wrapper). Two surfaces list posts:

**`writing/index.html`** — the writing index. Add the new post as the first `<li>`, newest first:

```html
<li><a href="/writing/{slug}/">
  <span class="w-head"><span class="w-title">{title}</span> <span class="w-date">{Mon YYYY}</span></span>
  <span class="w-gloss">{one- or two-sentence gloss, aiscrubbed}</span>
</a></li>
```

**`index.html`** (landing) — the `.writing` section is a three-post teaser built from `.receipts` items, with an "All writing →" link to `/writing`. Refresh it when a newer post should lead.
