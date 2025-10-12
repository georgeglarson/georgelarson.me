# Quick Start Guide: Fixing Hugging Face Integration

## What You're Seeing

When you navigate to `https://georgelarson-me.pages.dev/api/lens-summary` in your browser, you see:

```json
{"error":"Method not allowed"}
```

**This is expected behavior** - the endpoint requires POST requests with JSON data.

## What You Need to Do

### 1. Verify Your Cloudflare Configuration (5 minutes)

**Check if HF_TOKEN is set:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to: **Pages** → **Your Project** → **Settings** → **Environment Variables**
3. Look for `HF_TOKEN` or `HF_API_TOKEN`
4. If missing, add it:
   - Name: `HF_TOKEN`
   - Value: Your Hugging Face token (starts with `hf_`)
   - Environment: Production (and Preview if desired)
5. Click **Save** and **Redeploy** the project

**Get a Hugging Face token if you don't have one:**
1. Go to https://huggingface.co/settings/tokens
2. Create a new token with "Read" permission
3. Copy the token (starts with `hf_`)

### 2. Test the Real Endpoint (2 minutes)

**Option A: Use Browser Console**

1. Open your production site: `https://georgelarson-me.pages.dev`
2. Open browser DevTools (F12)
3. Go to Console tab
4. Paste and run:

```javascript
fetch('/api/lens-summary', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    lens: 'Test request',
    model: 'mistralai/Mistral-7B-Instruct-v0.3'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**Expected Results:**

✅ **Success**: JSON with `summary`, `key_points`, `model`, `generated_at`
❌ **Token Error**: `{"error": "Hugging Face token not configured."}`
❌ **503 Error**: `{"error": "Model is warming up..."}` (retry after 10s)

**Option B: Use the Form on resume.html**

1. Go to `https://georgelarson-me.pages.dev/resume.html`
2. Scroll to "Generate a fresh take" section
3. Enter a lens description (e.g., "AI privacy")
4. Click "Generate summary"
5. Wait 5-30 seconds for response

### 3. Check Function Logs (3 minutes)

1. Cloudflare Dashboard → Pages → Your Project → **Functions**
2. Click "**Real-time logs**" or "**Functions analytics**"
3. Look for:
   - Function invocation count (should be > 0 if you tested)
   - Error messages
   - Status codes

Common log messages to look for:
- ✅ `POST /api/lens-summary 200` → Working!
- ❌ `POST /api/lens-summary 500` → Configuration issue
- ❌ `POST /api/lens-summary 503` → Model warming up (retry)

### 4. Common Issues & Quick Fixes

| Issue | Symptom | Fix |
|-------|---------|-----|
| Missing token | `"Hugging Face token not configured"` | Add `HF_TOKEN` in Cloudflare environment variables |
| Resume not found | `"Unable to process request"` | Verify `resume.txt` is in repo root |
| Model cold start | `"Model is warming up"` | Wait 10s and retry (this is normal) |
| Rate limit | `429` or quota errors | Upgrade HF account or reduce usage |
| CORS error | Console shows CORS blocked | Shouldn't happen with Pages Functions, check logs |

## Next Steps After Testing

Once you've identified the specific error:

### If HF_TOKEN was missing:
1. Add the token as described in step 1
2. Redeploy
3. Test again
4. ✅ Should work now!

### If everything works:
1. Test all three models in the dropdown
2. Try the quick lens suggestions
3. Share the site with others
4. Consider implementing the improvements from `IMPLEMENTATION_PLAN.md`

### If you want better diagnostics:
1. Review `IMPLEMENTATION_PLAN.md`
2. Switch to Code mode to implement improvements:
   - GET handler showing diagnostics
   - Test page for easier debugging
   - Better error messages
   - Enhanced logging

## Implementation: Adding Diagnostics

If you want to improve the developer experience, you can implement the changes outlined in the plan:

**Priority 1: GET Endpoint with Diagnostics**
- Makes it easy to verify configuration
- Shows helpful info when accessed in browser
- Takes ~30 minutes to implement

**Priority 2: Test Page**
- Browser-based testing without curl
- Automatic diagnostics
- Takes ~1 hour to implement

**Priority 3: Better Error Messages**
- More actionable guidance
- Easier troubleshooting
- Takes ~1-2 hours

To implement these changes, switch to **Code mode** and refer to `IMPLEMENTATION_PLAN.md`.

## Resources

- 📄 **Full troubleshooting guide**: `TROUBLESHOOTING_HF_INTEGRATION.md`
- 📋 **Implementation plan**: `IMPLEMENTATION_PLAN.md`
- 📝 **Original README**: `README.md`
- 🔗 **Hugging Face Docs**: https://huggingface.co/docs/api-inference
- 🔗 **Cloudflare Pages Functions**: https://developers.cloudflare.com/pages/functions/

## Summary

The "Method not allowed" error is **not a bug** - it's the API correctly rejecting browser GET requests. To actually test or fix the integration:

1. ✅ Set `HF_TOKEN` in Cloudflare environment variables
2. ✅ Test with POST requests (browser console or resume.html form)
3. ✅ Check Cloudflare function logs for real errors
4. ✅ Implement diagnostics for better DX (optional)

**Most likely issue**: Missing `HF_TOKEN` environment variable
**Quickest fix**: Add token in Cloudflare dashboard, redeploy
**Best long-term fix**: Implement GET handler and test page for better debugging