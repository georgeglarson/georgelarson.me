# Model Fix: Resolving 404 Errors

## Problem Identified

You were getting a 404 error from the Hugging Face API because the models specified in the code are either:
- Not available on the Hugging Face Inference API
- Deprecated or moved
- Require special permissions or gated access
- Using incorrect model paths

## Changes Made

Updated the model list from non-working models to more widely available ones:

### Before (❌ Causing 404 errors)
```typescript
const DEFAULT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";
const ALLOWED_MODELS = new Set([
  "mistralai/Mistral-7B-Instruct-v0.3",
  "meta-llama/Llama-3-8b-chat-hf",       // Often gated/requires permissions
  "google/gemma-2-9b-it"                 // May not be on Inference API
]);
```

### After (✅ Should work)
```typescript
const DEFAULT_MODEL = "mistralai/Mistral-7B-Instruct-v0.2";
const ALLOWED_MODELS = new Set([
  "mistralai/Mistral-7B-Instruct-v0.2",      // Stable, widely available
  "mistralai/Mixtral-8x7B-Instruct-v0.1",    // Popular Mistral model
  "google/flan-t5-xxl",                      // Reliable Google model
  "tiiuae/falcon-7b-instruct"                // Open Falcon model
]);
```

## Files Updated

1. [`functions/api/lens-summary.ts`](functions/api/lens-summary.ts:10) - Backend model list
2. [`resume.html`](resume.html:28) - Frontend dropdown
3. [`test-lens-api.html`](test-lens-api.html:28) - Test page dropdown

## Testing the Fix

### 1. Deploy the Changes
```bash
git add functions/api/lens-summary.ts resume.html test-lens-api.html
git commit -m "Fix HF model 404 errors - update to available models"
git push
```

### 2. Test Each Model

Visit your test page and try each model:
- `https://georgelarson-me.pages.dev/test-lens-api.html`

Expected results:
- **Mistral 7B v0.2**: Should work (default)
- **Mixtral 8x7B**: Should work, larger model, better quality
- **Flan-T5 XXL**: Should work, Google's reliable model
- **Falcon 7B**: Should work, open source alternative

### 3. If Models Still Don't Work

Some models might be temporarily unavailable or require special access. You can:

#### Option A: Check Model Status on Hugging Face
1. Visit: `https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2`
2. Look for "Hosted inference API" section
3. Try the widget to see if it works
4. Check if model is "gated" (requires request access)

#### Option B: Find Alternative Models
Visit the Hugging Face Inference API docs:
- https://huggingface.co/docs/api-inference/quicktour

Popular working models:
```typescript
// Text generation models that typically work:
"facebook/opt-1.3b"           // Smaller, faster
"google/flan-t5-large"        // Reliable instruction following
"bigscience/bloom-1b7"        // Multilingual
"EleutherAI/gpt-neo-1.3B"     // GPT-style model
```

#### Option C: Verify Model Availability via API

Use curl to test a model directly:
```bash
curl https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2 \
  -X POST \
  -H "Authorization: Bearer YOUR_HF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"inputs": "test"}'
```

If you get:
- **200**: Model works ✅
- **404**: Model not found or not available ❌
- **403**: Need permissions/gated access 🔒
- **503**: Model loading (retry in 10s) ⏳

## Recommended: Update to Best Available Models

If the updated models still have issues, here's a conservative list of models that are known to be stable and available:

```typescript
const DEFAULT_MODEL = "google/flan-t5-large";  // Most reliable
const ALLOWED_MODELS = new Set([
  "google/flan-t5-large",       // Very stable
  "google/flan-t5-xl",          // Larger version
  "facebook/opt-1.3b",          // Fast alternative
  "EleutherAI/gpt-neo-1.3B"     // GPT-style
]);
```

These models are:
- ✅ Not gated (no special access needed)
- ✅ Available on Inference API
- ✅ Maintained and stable
- ✅ Good at following instructions

## Why This Happened

1. **Model Versioning**: Mistral released v0.3, but it might not be on the Inference API yet
2. **Gated Models**: Llama models often require requesting access from Meta
3. **New Models**: Gemma 2 might be too new for the Inference API
4. **API vs Hub**: Not all models on Hugging Face Hub are on the Inference API

## Long-term Solution

Consider using models that are:
1. **Well-established**: Been on the platform for months
2. **Not gated**: Don't require special permissions
3. **Instruction-tuned**: Better at following JSON format instructions
4. **Documented**: Explicitly listed in HF Inference API docs

## Alternative: Use Hugging Face Serverless Endpoints

If you need specific models that aren't on the Inference API, you can:
1. Create a Serverless Inference Endpoint on Hugging Face
2. Update the endpoint URL in the code
3. This gives you access to any model but costs more

## Summary

The 404 error was caused by unavailable or inaccessible model paths. I've updated to more stable alternatives, but you may need to:
1. Test each model to see which ones work
2. Adjust based on what's actually available
3. Consider the conservative model list if issues persist

After deploying, the test page will help identify which models work best for your use case.