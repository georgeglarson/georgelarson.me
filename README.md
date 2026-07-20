# georgelarson.me (mono-accented editorial)

Static, no-build personal site for George Larson.

Mono-accented editorial: IBM Plex Mono for nav / labels / projects / code (the engineer
fingerprint), IBM Plex Serif for prose. Dark, flat, one desaturated-green accent, no chrome.
Fonts are self-hosted (no CDN). The design system lives in `css/site.css`.

## Structure
- `index.html` - landing: the positioning spine and the projects
- `who-is-george.html` - the deep story / who's-behind-it page
- `network-tools.html`, `n8n.html`, `fracture.html` - case studies
- `contributions.html` - the open-source record (merged + in-review, every PR verified live)
- `resume.html` - renders `resume.txt` inline; links the PDF and text downloads
- `resume.txt` - plain-text resume, the source of truth
- `george-larson-resume.pdf` - typeset PDF (built from `resume.txt`, see below)
- `css/site.css` - the design system
- `fonts/` - self-hosted IBM Plex Mono + Serif (woff2)
- `writing/` - articles, each in a dated directory (see Publishing below)
- `scripts/publish.sh` - generate all publishing variants from a single story.md
- `scripts/generate_pdf.py` + `build-resume.sh` - build the resume PDF from `resume.txt`
- `scripts/distribute.sh` - push generated article variants to their destinations

## Resume PDF

`resume.txt` is the source of truth. `build-resume.sh` runs `scripts/generate_pdf.py` to
produce `george-larson-resume.pdf`. `resume.html` fetches `resume.txt` at load and renders it
inline, so the page and the text download never drift. The PDF only tracks after you re-run
`build-resume.sh` following a `resume.txt` edit.

## Publishing

Articles live in `writing/YYYY-MM-DD-slug/`. Each directory has one source file (`story.md`) and generated output files.

### Quick start

```bash
# Generate all variants from an existing story
./scripts/publish.sh writing/2026-03-28-my-story/

# Or use the Claude Code skill
/publish writing/2026-03-28-my-story/
/publish new "My Story Title"
```

### story.md format

```markdown
---
title: "the title"
slug: YYYY-MM-DD-the-title
date: YYYY-MM-DD
description: "80-120 word description for meta tags and Dev.to"
tags: ai, benchmarks, llm, devtools
og_title: "optional og:title override"
og_description: "optional og:description override"
cover_image:
lead: "subtitle/hook paragraph shown under the h1"
---

<!-- social:mastodon -->
Your ~400 char mastodon post. Punchy, metrics, link.
#Hashtags #Here
<!-- /social:mastodon -->

<!-- social:linkedin -->
Your ~1200 char LinkedIn post. Narrative arc, specifics.
#Hashtags #Here
<!-- /social:linkedin -->

<!-- social:hn -->
Show HN: Title — one-line description
<!-- /social:hn -->

## first section heading

Article body. Standard markdown with images, code blocks, lists.
```

### What publish.sh generates

| File | Purpose | Distribution |
|------|---------|-------------|
| `index.html` | Canonical article page on georgelarson.me | Cloudflare Pages (auto) |
| `devto.md` | Dev.to cross-post with frontmatter | irony (auto) |
| `social-mastodon.md` | Mastodon post | irony (auto) |
| `social-linkedin.md` | LinkedIn post | manual copy/paste |
| `social-hn.md` | HN title + description | manual |

### Writing conventions

- **Headings are lowercase.** `## the architecture`, not `## The Architecture`
- **Social posts are hand-written**, not auto-generated. You write differently for each audience.
- **Articles render through the `.article-body` system** in `css/site.css` (serif headings, mono h3 + accents). Prefer semantic Markdown over custom `<style>` blocks so content stays content and the design system does the design.
- **Images use relative paths** in story.md (`![alt](screenshot.png)`). publish.sh rewrites them to absolute URLs for Dev.to.
- **After generating**, update the writing index (`writing/index.html`) and the landing teaser if it's a new story (the `/publish` skill does this automatically).

### Design tokens

Custom blocks and one-off styling should use the `css/site.css` variables, not hard-coded colors:

```text
--bg: #0c0e11        --ink: #e7e4dd        --accent: #7cc4a8
--bg-inset: #14171c  --ink-soft: #a8a69d   --accent-lo: rgba(124,196,168,0.16)
                     --ink-faint: #8b8a81  --accent-bg: rgba(124,196,168,0.08)
--font-mono: "IBM Plex Mono", ...   --font-serif: "IBM Plex Serif", ...
--measure: 64ch   --gutter: clamp(1.25rem, 5vw, 2.5rem)   --rhythm: 1.7
```

No cards, no shadows, no rounded-corner glow, no gradients. Section breaks are thin mono rules
(`.rule` / `.rule--mono`). The structure is the chrome.

## Deploy on Cloudflare Pages
1. Push to `main`; Cloudflare Pages builds automatically on merge.
2. Build command: (leave blank). Output directory: `/`.
3. Custom domain + DNS handled in the Pages dashboard.
