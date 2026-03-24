# georgelarson.me (terminal theme)

Static, no-build personal site for George Larson.

## Structure
- `index.html` - intro and navigation hub
- `resume.html` - renders `resume.txt` with local search and optional AI lens summaries
- `resume.txt` - plain text source for search, printing, and lens generation
- `data/resume_lenses.json` - cached lens summaries (regen via script below)
- `schedule.html` - Cal.com embed for booking sessions
- `ask.html` - local, private search over the resume text (supports `?q=` links)
- `style.css` - shared terminal aesthetic
- `writing/` - articles, each in a dated directory (see Publishing below)
- `scripts/publish.sh` - generate all publishing variants from a single story.md
- `scripts/generate_lenses.py` - optional helper to regenerate lens summaries with the Hugging Face Inference API
- `functions/api/lens-summary.ts` - Cloudflare Pages Function that proxies Hugging Face Inference for on-demand lens summaries

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

Raw HTML blocks pass through for custom layouts:

<div class="my-grid">
  <div class="card"><h3>title</h3><p>content</p></div>
</div>

<style>
.my-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
.card {
  padding: 1.5rem 1.25rem; border-radius: var(--radius);
  border: 1px solid rgba(22, 245, 166, 0.22); background: rgba(5, 12, 18, 0.75);
}
</style>
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
- **Custom layouts use raw HTML + `<style>`.** The `<style>` block can go anywhere in the body — publish.sh extracts it into the HTML `<head>`. Dev.to ignores `<style>` tags, so CSS-dependent visuals render as plain HTML there (acceptable tradeoff).
- **Images use relative paths** in story.md (`![alt](screenshot.png)`). publish.sh rewrites them to absolute URLs for Dev.to.
- **After generating**, update the writing section in `index.html` if it's a new story (the `/publish` skill does this automatically).

### CSS reference for custom blocks

The site uses these CSS variables (defined in `style.css`):

```
--bg: #04060a          --accent: #16f5a6       --radius: 12px
--bg-soft: #08121c     --accent-dark: #0fa375  --border: rgba(22, 245, 166, 0.28)
--fg: #c9f7e6          --fg-muted: #92cbb4     --mono: "Fira Code", ...
--fg-strong: #e9fff7
```

Common patterns from existing stories:
- **Cards/grids:** `grid-template-columns: 1fr 1fr`, `gap: 1.25rem`, card padding `1.5rem 1.25rem`
- **Code blocks:** `background: rgba(5, 12, 18, 0.9)`, border `rgba(22, 245, 166, 0.15)`
- **Screenshots:** `<div class="screenshot"><img src="..." alt="..." loading="lazy" /></div>` (or use `![alt](file.png)` in markdown)
- **Accent borders:** green at 0.22 opacity (subtle), 0.35 (medium), orange `rgba(255, 200, 100, 0.25)` for contrast
- **Mobile breakpoint:** `@media (max-width: 720px)` — collapse grids to single column

## Deploy on Cloudflare Pages
1. Create a GitHub repo and push these files to `main`.
2. In Cloudflare Pages choose **Create project** and connect the repo.
   - Build command: (leave blank)
   - Output directory: `/`
3. Add your custom domain and follow the DNS instructions.

## Deploy on GitHub Pages
1. Repo settings -> Pages.
2. Source: `main` branch, directory `/ (root)`.

## Notes
- `ask.html` intentionally keeps everything client side. It is a placeholder for a future RAG or on-device LLM workflow while remaining private today.
- The resume lens feature can be generated live (via `/api/lens-summary`) or by using the cached JSON. The Cloudflare Pages function uses `HF_TOKEN` so your secret never reaches the browser.

## Generate lens summaries (Hugging Face)
1. Create a Hugging Face access token with Inference API permissions and set it in your shell:
   - macOS/Linux: `export HF_API_TOKEN=hf_yourtoken`
   - Windows PowerShell: `$Env:HF_API_TOKEN = "hf_yourtoken"`
   - Cloudflare Pages build settings: add an environment variable named `HF_TOKEN` (script accepts either name).
2. (Optional) Override the model by setting `HF_MODEL` (defaults to `mistralai/Mistral-7B-Instruct-v0.3`).
3. Run `python scripts/generate_lenses.py`.
   - The script writes `data/resume_lenses.json`. Commit the change to publish new summaries.
4. If the API returns errors, the script will surface the response body so you can adjust rate limits or prompts.

## Live lens endpoint
- Path: `POST /api/lens-summary`
- Body: `{"lens": "How does George handle manufacturing ops?", "model": "mistralai/Mistral-7B-Instruct-v0.3"}`
- Response: JSON containing `summary`, `key_points`, `model`, `generated_at`
- The function reads `resume.txt` at request time, so updates deploy instantly without new scripts.
