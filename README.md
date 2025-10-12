# georgelarson.me (terminal theme)

Static, no-build personal site for George Larson.

## Structure
- `index.html` - intro and navigation hub
- `resume.html` - renders `resume.txt` and shows AI-assisted lens summaries
- `resume.txt` - plain text source for search, printing, and lens generation
- `data/resume_lenses.json` - cached lens summaries (regen via script below)
- `schedule.html` - Cal.com embed for booking sessions
- `ask.html` - local, private search over the resume text (supports `?q=` links)
- `style.css` - shared terminal aesthetic
- `scripts/generate_lenses.py` - optional helper to regenerate lens summaries with Hugging Face or Venice.ai
- `functions/api/lens-summary.ts` - Cloudflare Pages Function that proxies Hugging Face Inference for on-demand lens summaries

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
