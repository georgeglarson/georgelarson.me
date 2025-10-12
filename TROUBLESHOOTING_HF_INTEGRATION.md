# Troubleshooting Hugging Face Integration

## Problem Summary

The `/api/lens-summary` endpoint returns `{"error":"Method not allowed"}` when accessed via browser navigation. This is **expected behavior** - the endpoint only accepts POST requests with JSON data.

## Understanding the Error

- **Current behavior**: Browser GET request → 405 "Method not allowed" 
- **Expected behavior**: POST request with JSON body → AI-generated summary
- **Root cause**: The endpoint is working correctly - it's rejecting GET requests as designed (see `lens-summary.ts:20-22`)

## Investigation Plan

### 1. Create a Diagnostic Test Page

Create `test-lens-api.html` to properly test the POST endpoint:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Lens API Diagnostics</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <main class="page">
    <h1>Lens API Diagnostics<span class="caret"></span></h1>
    <p class="lead">Test the /api/lens-summary endpoint and diagnose production issues.</p>
    
    <section class="panel">
      <h2>Test Configuration</h2>
      <form id="test-form">
        <label class="lens-field">
          <span>Lens Description</span>
          <input id="lens-input" type="text" value="Test request to verify API functionality" />
        </label>
        <label class="lens-field">
          <span>Model</span>
          <select id="model-select">
            <option value="mistralai/Mistral-7B-Instruct-v0.3">Mistral 7B</option>
            <option value="meta-llama/Llama-3-8b-chat-hf">Llama 3 8B</option>
            <option value="google/gemma-2-9b-it">Gemma 2 9B</option>
          </select>
        </label>
        <button type="submit">Test API</button>
      </form>
    </section>

    <section class="panel">
      <h2>Test Results</h2>
      <div id="results" style="white-space: pre-wrap; font-family: monospace;"></div>
    </section>

    <section class="panel">
      <h2>Diagnostic Checks</h2>
      <ul id="diagnostics" class="plain-list"></ul>
    </section>
  </main>

  <script>
    const results = document.getElementById('results');
    const diagnostics = document.getElementById('diagnostics');

    // Run diagnostics on load
    async function runDiagnostics() {
      const checks = [
        {
          name: 'Check /resume.txt accessibility',
          test: async () => {
            const res = await fetch('/resume.txt');
            return { pass: res.ok, details: `Status: ${res.status}` };
          }
        },
        {
          name: 'Check /api/lens-summary endpoint exists',
          test: async () => {
            const res = await fetch('/api/lens-summary');
            return { 
              pass: res.status === 405, 
              details: `Status: ${res.status} (405 expected for GET)` 
            };
          }
        },
        {
          name: 'Check browser can make POST requests',
          test: async () => {
            try {
              const res = await fetch('/api/lens-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lens: 'test' })
              });
              const data = await res.json();
              return { 
                pass: res.status !== 405, 
                details: `Status: ${res.status}, Response: ${JSON.stringify(data).substring(0, 100)}` 
              };
            } catch (err) {
              return { pass: false, details: err.message };
            }
          }
        }
      ];

      diagnostics.innerHTML = '';
      for (const check of checks) {
        const li = document.createElement('li');
        li.textContent = `Running: ${check.name}...`;
        diagnostics.appendChild(li);
        
        try {
          const result = await check.test();
          li.textContent = `${result.pass ? '✓' : '✗'} ${check.name}: ${result.details}`;
        } catch (err) {
          li.textContent = `✗ ${check.name}: ${err.message}`;
        }
      }
    }

    // Test form submission
    document.getElementById('test-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      results.textContent = 'Testing...\n';

      const lens = document.getElementById('lens-input').value;
      const model = document.getElementById('model-select').value;

      try {
        const startTime = Date.now();
        const response = await fetch('/api/lens-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lens, model })
        });

        const duration = Date.now() - startTime;
        const data = await response.json();

        results.textContent = `Status: ${response.status}
Duration: ${duration}ms
Content-Type: ${response.headers.get('content-type')}

Response:
${JSON.stringify(data, null, 2)}`;

        if (!response.ok) {
          results.textContent += '\n\n⚠️ Error detected. See common issues below.';
        }
      } catch (err) {
        results.textContent = `Network Error: ${err.message}`;
      }
    });

    // Run diagnostics on load
    runDiagnostics();
  </script>
</body>
</html>
```

### 2. Enhance the API Endpoint

Add a GET handler to provide helpful diagnostics instead of just "Method not allowed":

```typescript
export const onRequest = async ({ request, env }: PagesContext) => {
  // Add GET handler for diagnostics
  if (request.method.toUpperCase() === "GET") {
    return new Response(JSON.stringify({
      endpoint: "/api/lens-summary",
      method: "POST",
      description: "Generate AI-powered resume summaries through specific lenses",
      usage: {
        url: "/api/lens-summary",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          lens: "How does George handle manufacturing operations?",
          model: "mistralai/Mistral-7B-Instruct-v0.3 (optional)"
        }
      },
      available_models: Array.from(ALLOWED_MODELS),
      diagnostics: {
        hf_token_configured: Boolean(env.HF_TOKEN || env.HF_API_TOKEN),
        assets_available: Boolean(env.ASSETS)
      },
      test_page: "/test-lens-api.html"
    }, null, 2), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "X-Endpoint-Info": "Use POST for actual requests"
      }
    });
  }

  if (request.method.toUpperCase() !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }
  
  // ... rest of existing code
}
```

### 3. Common Production Issues & Solutions

#### Issue 1: Missing HF_TOKEN Environment Variable
**Symptoms**: 
- Response: `{"error": "Hugging Face token not configured."}`
- Status: 500

**Solution**:
1. Go to Cloudflare Dashboard → Pages → Your Project → Settings → Environment Variables
2. Add variable: `HF_TOKEN` = `hf_your_token_here`
3. Redeploy the project

**How to verify**:
- Use the diagnostic test page
- Check the GET response shows `"hf_token_configured": true`

#### Issue 2: resume.txt Not Accessible via ASSETS
**Symptoms**:
- Console error: "Failed to load resume.txt"
- Response: `{"error": "Unable to process request"}`
- Status: 500

**Solution**:
- Ensure `resume.txt` is in the root directory of your repo
- Verify it's not in `.gitignore`
- Check Cloudflare Pages build output includes the file

**How to verify**:
- Visit `https://your-domain.pages.dev/resume.txt` directly
- Should return the plain text resume

#### Issue 3: Hugging Face API Rate Limits
**Symptoms**:
- Intermittent failures
- Response: Model-specific error messages

**Solution**:
- Use a Hugging Face Pro account for higher rate limits
- Implement request caching (save successful responses to `data/resume_lenses.json`)
- Use the warming mechanism already implemented in `resume.html:262-278`

#### Issue 4: Model Loading Time
**Symptoms**:
- First request returns: `{"error": "Model is warming up..."}`
- Status: 503

**Solution**:
- This is expected behavior for cold starts
- The frontend already handles this with retry logic (see `resume.html:231-236`)
- The warming function should prevent this for users

#### Issue 5: CORS Issues
**Symptoms**:
- Browser console: "CORS policy blocked"
- No response received

**Solution**:
- Cloudflare Pages Functions should handle CORS automatically
- If issues persist, add CORS headers manually:

```typescript
function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
```

### 4. Deployment Checklist

Before deploying to production:

- [ ] Verify TypeScript file is at `functions/api/lens-summary.ts`
- [ ] Confirm `resume.txt` is in project root
- [ ] Set `HF_TOKEN` environment variable in Cloudflare Pages
- [ ] Test locally with Wrangler: `npx wrangler pages dev`
- [ ] Deploy and check Cloudflare Pages function logs
- [ ] Test with the diagnostic page
- [ ] Verify the form on `resume.html` works
- [ ] Check that model warming happens on page load

### 5. How to Check Cloudflare Pages Logs

1. Go to Cloudflare Dashboard
2. Navigate to: Pages → Your Project → Functions
3. Click "Real-time logs" or "Functions analytics"
4. Look for:
   - Function invocation count
   - Error rate
   - Specific error messages
   - Request/response details

### 6. Testing Strategies

#### Local Testing with Wrangler
```bash
# Install Wrangler CLI
npm install -g wrangler

# Set environment variable
set HF_TOKEN=hf_your_token

# Run local dev server
npx wrangler pages dev

# Test the endpoint
curl -X POST http://localhost:8788/api/lens-summary \
  -H "Content-Type: application/json" \
  -d '{"lens":"test request","model":"mistralai/Mistral-7B-Instruct-v0.3"}'
```

#### Browser DevTools Testing
```javascript
// Open browser console on your site
// Run this to test the API:
fetch('/api/lens-summary', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lens: 'Test from console',
    model: 'mistralai/Mistral-7B-Instruct-v0.3'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

#### cURL Testing
```bash
curl -X POST https://georgelarson-me.pages.dev/api/lens-summary \
  -H "Content-Type: application/json" \
  -d '{"lens":"Test lens description","model":"mistralai/Mistral-7B-Instruct-v0.3"}'
```

### 7. Next Steps

1. **Immediate**: Create the diagnostic test page to identify the exact error
2. **Quick win**: Add GET handler to the API for better developer experience
3. **Production**: Verify HF_TOKEN is set in Cloudflare environment
4. **Monitoring**: Check Cloudflare Pages function logs for actual errors
5. **Enhancement**: Add better error messages and logging

## Summary

The "Method not allowed" error you're seeing is expected - it's the endpoint correctly rejecting GET requests. To diagnose actual production issues, you need to:

1. Test with POST requests (via the diagnostic page or browser console)
2. Check if HF_TOKEN is configured in Cloudflare Pages
3. Review function logs for real error messages
4. Test the actual form on resume.html

The most likely issues are:
- Missing `HF_TOKEN` environment variable
- Hugging Face API rate limits or quotas
- Model cold start delays (503 errors)
- Network/CORS issues

All of these can be identified and fixed by following the diagnostic steps above.