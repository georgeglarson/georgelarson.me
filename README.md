# georgelarson.me (terminal theme)

Static, no-build personal site for George Larson.

## Structure
- `index.html` - intro and navigation hub
- `resume.html` - renders `resume.txt` on page
- `resume.txt` - plain text source for search and printing
- `schedule.html` - Cal.com embed for booking sessions
- `ask.html` - local, private search over the resume text
- `style.css` - shared terminal aesthetic

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
