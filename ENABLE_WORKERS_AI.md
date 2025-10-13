# Enable Cloudflare Workers AI

## The Issue

You're seeing: **"Cloudflare Workers AI is not available"**

This means Workers AI needs to be enabled for your Cloudflare Pages project. It's a one-time setup step.

## How to Enable Workers AI

### Option 1: Via Cloudflare Dashboard (Easiest)

1. **Go to your Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com/
   - Navigate to: **Workers & Pages**
   - Select your project: **georgelarson.me** (or your project name)

2. **Add Workers AI Binding**
   - Click on **Settings** tab
   - Scroll to **Functions** section
   - Look for **AI** or **Bindings** section
   - Click **Add binding**
   - Select **Workers AI** from the dropdown
   - Variable name: `AI` (must be exactly `AI`)
   - Click **Save**

3. **Redeploy**
   - Go to **Deployments** tab
   - Click **Retry deployment** on the latest deployment
   - Or just push any change to trigger a new deployment

### Option 2: Via wrangler.toml (Alternative)

If you prefer configuration as code, add a `wrangler.toml` file to your project root:

```toml
name = "georgelarson-me"
compatibility_date = "2024-01-01"

[ai]
binding = "AI"
```

Then commit and push:
```bash
git add wrangler.toml
git commit -m "Add Workers AI binding"
git push
```

## After Enabling

Once Workers AI is enabled:
1. Wait for deployment to complete (1-2 minutes)
2. Test again at: https://georgelarson-me.pages.dev/test-lens-api.html
3. You should see: ✓ Workers AI is available
4. The AI generation should work!

## Why This Is Needed

Workers AI is a Cloudflare add-on service. Even though it's part of Cloudflare, it needs to be explicitly enabled for each project. This is like:
- Adding a database binding
- Adding KV storage
- Adding any other Cloudflare service

It's a one-time setup, then it just works.

## Troubleshooting

### Still not working after enabling?

**Check the binding name:**
- It MUST be named `AI` (uppercase)
- Not `ai`, not `WorkersAI`, exactly `AI`
- This matches the code: `env.AI`

**Check account access:**
- Workers AI might require account verification
- Check for any notices in your Cloudflare dashboard
- Free tier should have access, but verify

**Check deployment:**
- Make sure the new deployment actually completed
- Check Functions tab shows the binding
- Look for any deployment errors

### Alternative: Quick Test

If you can't find the binding settings, try adding `wrangler.toml`:

```toml
name = "georgelarson-me"

[ai]
binding = "AI"
```

This should work automatically when you push it.

## What Happens Next

Once enabled:
- ✅ `env.AI` becomes available in your Functions
- ✅ No token or API key needed
- ✅ Free tier: 10,000 requests/day
- ✅ Your resume lens feature will work immediately

## If You Can't Enable Workers AI

If for some reason Workers AI isn't available (account restrictions, region issues, etc.), we have alternatives:

1. **Groq** (super fast, nerdy) - Free tier available
2. **Together AI** (open models) - Free credits
3. **Replicate** (run anything) - Pay per use

But try Workers AI first - it's the best fit for your Cloudflare Pages setup!