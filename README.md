# georgelarson.me — terminal theme

Static, no-build personal site for George Larson.

## Structure
- `index.html` — intro & navigation
- `resume.html` — plaintext-rendered résumé
- `resume.txt` — source for local Q&A page
- `schedule.html` — Cal.com embed for booking
- `ask.html` — local, private search over résumé (no server, no tracking)
- `style.css` — shared terminal aesthetic

## Deploy — Cloudflare Pages
1. Create a GitHub repo and push these files to `main`.
2. In Cloudflare Pages → Create project → Connect to repo.
   - Build command: _none_
   - Output directory: `/`
3. Add your custom domain and follow DNS instructions.

## Deploy — GitHub Pages
- Settings → Pages → Source: `main` → `/ (root)`.

## Notes
- The `ask.html` page demonstrates a privacy-first, client-side search over your résumé. It’s a nice placeholder for a future RAG/LLM-backed Q&A.
