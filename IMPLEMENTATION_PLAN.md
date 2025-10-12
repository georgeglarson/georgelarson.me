# Implementation Plan: Hugging Face Integration Improvements

## Overview

This plan outlines the specific code changes needed to improve the `/api/lens-summary` endpoint with better diagnostics, error handling, and developer experience.

## Goals

1. Add GET endpoint for API documentation and diagnostics
2. Improve error messages and logging
3. Make the API easier to test and debug
4. Maintain backward compatibility with existing frontend

## Implementation Steps

### Step 1: Add GET Handler for Diagnostics

**File**: `functions/api/lens-summary.ts`

**Changes**: Add a GET handler at the beginning of [`onRequest()`](functions/api/lens-summary.ts:19) that provides:
- API documentation
- Configuration status (HF_TOKEN present, ASSETS available)
- Usage examples
- Link to test page

**Benefits**:
- Developers can quickly verify endpoint is deployed
- Easy to check configuration status
- Better DX when accessing endpoint in browser

**Code location**: Insert before line 20 (the POST method check)

---

### Step 2: Create Diagnostic Test Page

**File**: `test-lens-api.html` (new file)

**Purpose**: 
- Allow proper POST testing without curl/Postman
- Run automated diagnostics on page load
- Display clear results and error messages
- Test all three supported models

**Features**:
- Form to submit test requests
- Automatic diagnostics that check:
  - `/resume.txt` accessibility
  - API endpoint existence
  - POST request capability
- Real-time response display
- Duration tracking

**Integration**: Link from GET handler response

---

### Step 3: Enhance Error Messages

**File**: `functions/api/lens-summary.ts`

**Current issues**:
- Generic error messages don't help debugging
- No distinction between different failure modes
- Limited logging for troubleshooting

**Improvements needed**:

1. **Line 46**: Token validation error
   - Add hint about where to set HF_TOKEN
   - Distinguish between missing token vs empty token

2. **Line 56-58**: Resume loading error
   - Include actual error message in response
   - Add specific guidance about file location
   - Check if ASSETS is properly configured

3. **Line 66-71**: HuggingFace API errors
   - Parse HF error messages better
   - Provide actionable guidance based on status code
   - Add retry suggestions for transient errors

4. **Line 82-84**: JSON parsing errors
   - Include sample of failed output for debugging
   - Suggest trying different model
   - Add hint about model-specific formatting issues

**Example enhanced error response**:
```typescript
{
  error: "Hugging Face token not configured",
  help: "Set HF_TOKEN in Cloudflare Pages Environment Variables",
  docs: "https://dash.cloudflare.com/.../settings/environment-variables"
}
```

---

### Step 4: Add Request/Response Logging

**File**: `functions/api/lens-summary.ts`

**Add logging at key points**:

1. Request received (line ~24):
```typescript
console.log(`[lens-summary] Request received - lens: "${lensRaw.substring(0, 50)}...", model: ${requestedModel}`);
```

2. HF API call (line ~121):
```typescript
console.log(`[lens-summary] Calling HF API - model: ${model}, prompt length: ${prompt.length}`);
```

3. Success (line ~86):
```typescript
console.log(`[lens-summary] Success - summary length: ${summary.length}, bullets: ${bullets.length}`);
```

4. All error paths:
```typescript
console.error(`[lens-summary] Error: ${err.message}`, { lens: lensRaw, model: requestedModel });
```

**Benefits**:
- Easier troubleshooting via Cloudflare logs
- Track API usage patterns
- Identify common failure modes

---

### Step 5: Add CORS Headers (if needed)

**File**: `functions/api/lens-summary.ts`

**Current**: [`jsonResponse()`](functions/api/lens-summary.ts:176) only sets Content-Type

**Enhancement**: Add CORS headers to support cross-origin testing:
```typescript
function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
```

**Also add OPTIONS handler** for preflight requests:
```typescript
if (request.method.toUpperCase() === "OPTIONS") {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    }
  });
}
```

---

### Step 6: Add Health Check Endpoint

**File**: `functions/api/health.ts` (new file)

**Purpose**: Simple endpoint to verify Functions are working

```typescript
export const onRequest = async () => {
  return new Response(JSON.stringify({
    status: "ok",
    timestamp: new Date().toISOString(),
    functions_working: true
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
```

**Usage**: Quick way to verify Cloudflare Pages Functions are deployed

---

### Step 7: Improve Model Response Parsing

**File**: `functions/api/lens-summary.ts`

**Current issue** (line 166-174): [`extractJson()`](functions/api/lens-summary.ts:166) is fragile

**Improvements**:
1. Try multiple parsing strategies
2. Handle markdown code blocks (```json)
3. Extract JSON from mixed text output
4. Provide better error messages on parse failure

**Enhanced version**:
```typescript
function extractJson(text: string): Record<string, unknown> {
  // Strategy 1: Look for markdown code block
  const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch {}
  }

  // Strategy 2: Find first complete JSON object
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error(`No JSON block detected in output (length: ${text.length})`);
  }
  
  const snippet = text.slice(start, end + 1);
  try {
    return JSON.parse(snippet);
  } catch (err) {
    throw new Error(`JSON parse failed: ${err.message}. Snippet: ${snippet.substring(0, 100)}...`);
  }
}
```

---

### Step 8: Add Response Validation

**File**: `functions/api/lens-summary.ts`

**Add after parsing** (line ~76):

```typescript
// Validate parsed response structure
if (!summary || summary.length < 10) {
  console.warn(`[lens-summary] Suspiciously short summary: "${summary}"`);
}
if (!Array.isArray(bullets) || bullets.length === 0) {
  console.warn(`[lens-summary] No bullets generated, bullets:`, bullets);
}
```

---

## Testing Plan

### Phase 1: Local Testing
1. Set up Wrangler dev environment
2. Set HF_TOKEN locally
3. Test GET endpoint → verify diagnostics shown
4. Test POST with valid request → verify response
5. Test POST with invalid data → verify error handling
6. Test with each supported model

### Phase 2: Staging Testing (if available)
1. Deploy to preview environment
2. Run diagnostic test page
3. Test from resume.html form
4. Check function logs
5. Verify error messages are helpful

### Phase 3: Production Testing
1. Deploy incrementally (GET handler first)
2. Monitor function logs
3. Test with diagnostic page
4. Verify existing form still works
5. Monitor error rates

---

## Rollback Plan

If issues occur:
1. All changes are in `functions/api/lens-summary.ts`
2. Original file can be restored from git history
3. GET handler is addition-only (won't break POST)
4. Test page is standalone (can be removed)

---

## Success Criteria

✅ GET endpoint returns helpful diagnostics
✅ Test page successfully makes POST requests  
✅ Error messages include actionable guidance
✅ Function logs provide debugging context
✅ Existing resume.html form continues working
✅ All three models can be tested
✅ Response time < 10s for cold starts
✅ Documentation is clear and accurate

---

## Priority Order

**High Priority** (blocking issues):
1. Add GET handler with diagnostics
2. Create test page
3. Verify HF_TOKEN in production
4. Check function logs for errors

**Medium Priority** (nice to have):
5. Enhanced error messages
6. Better logging
7. Improved JSON parsing

**Low Priority** (future improvements):
8. CORS headers (if needed)
9. Health check endpoint
10. Response validation

---

## Dependencies

- Cloudflare Pages (hosting)
- Cloudflare Pages Functions (serverless runtime)
- Hugging Face Inference API (external API)
- Valid HF_TOKEN (environment variable)

---

## Timeline Estimate

- **GET handler**: 30 minutes
- **Test page**: 1 hour  
- **Error improvements**: 1-2 hours
- **Logging**: 30 minutes
- **Testing**: 1-2 hours
- **Documentation**: 30 minutes

**Total**: ~5-7 hours

---

## Next Actions

1. Review this plan with stakeholders
2. Switch to Code mode to implement changes
3. Start with GET handler (quick win)
4. Create test page
5. Deploy and verify
6. Iterate based on findings