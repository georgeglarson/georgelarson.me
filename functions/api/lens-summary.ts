interface LensRequest {
  lens: string;
  model?: string;
}

// Cloudflare Workers AI models
const DEFAULT_MODEL = "@cf/meta/llama-3-8b-instruct";
const ALLOWED_MODELS = new Set([
  DEFAULT_MODEL,
  "@cf/mistral/mistral-7b-instruct-v0.1",
  "@hf/thebloke/neural-chat-7b-v3-1-awq",
  "@cf/meta/llama-2-7b-chat-int8"
]);

const JSON_ERROR = { error: "Unable to process request" };

export const onRequest = async ({ request, env }: PagesContext) => {
  // Handle OPTIONS for CORS preflight
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

  // Handle GET requests with diagnostics
  if (request.method.toUpperCase() === "GET") {
    const hasAI = Boolean(env.AI);
    const hasAssets = Boolean(env.ASSETS);
    
    return new Response(JSON.stringify({
      endpoint: "/api/lens-summary",
      method: "POST",
      description: "Generate AI-powered resume summaries using Cloudflare Workers AI",
      status: "operational",
      configuration: {
        workers_ai_available: hasAI,
        assets_configured: hasAssets,
        default_model: DEFAULT_MODEL,
        available_models: Array.from(ALLOWED_MODELS)
      },
      usage: {
        url: "/api/lens-summary",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body_schema: {
          lens: "string (required, max 240 chars) - Focus or perspective for the summary",
          model: "string (optional) - One of the available Cloudflare AI models"
        },
        example: {
          lens: "How does George handle manufacturing operations and uptime?",
          model: DEFAULT_MODEL
        }
      },
      response_schema: {
        summary: "string - AI-generated paragraph summary",
        key_points: "array - 3-5 bullet points highlighting relevant accomplishments",
        model: "string - Model used for generation",
        lens: "string - Original lens request",
        generated_at: "string - ISO 8601 timestamp"
      },
      test_page: "/test-lens-api.html",
      documentation: "/QUICK_START_GUIDE.md",
      notes: [
        hasAI ? "✓ Workers AI is available" : "⚠ Workers AI not available",
        hasAssets ? "✓ ASSETS fetcher is available" : "⚠ ASSETS fetcher not available",
        "Running on Cloudflare's edge AI network",
        "No external API calls - all processing on Cloudflare infrastructure"
      ]
    }, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  if (request.method.toUpperCase() !== "POST") {
    return jsonResponse({ error: "Method not allowed. Use POST for requests or GET for documentation." }, 405);
  }

  let payload: LensRequest;
  try {
    payload = await request.json() as LensRequest;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const lensRaw = (payload.lens || "").toString().trim();
  if (!lensRaw) {
    return jsonResponse({ 
      error: "Provide a focus or lens description.",
      help: "Include a 'lens' field in your request body describing the perspective you want."
    }, 400);
  }
  if (lensRaw.length > 240) {
    return jsonResponse({ 
      error: "Lens description is too long (max 240 characters).",
      current_length: lensRaw.length
    }, 400);
  }

  const requestedModel = (payload.model || "").toString().trim() || DEFAULT_MODEL;
  if (!ALLOWED_MODELS.has(requestedModel)) {
    return jsonResponse({ 
      error: "Model not permitted.",
      requested: requestedModel,
      allowed_models: Array.from(ALLOWED_MODELS)
    }, 400);
  }

  console.log(`[lens-summary] Request received - lens: "${lensRaw.substring(0, 50)}${lensRaw.length > 50 ? '...' : ''}", model: ${requestedModel}`);

  if (!env.AI) {
    console.error("[lens-summary] Workers AI not available");
    return jsonResponse({ 
      error: "Cloudflare Workers AI is not available.",
      help: "Workers AI should be automatically available in Cloudflare Pages Functions",
      docs: "https://developers.cloudflare.com/workers-ai/"
    }, 500);
  }

  let resumeText = "";
  try {
    const resumeUrl = new URL("/resume.txt", request.url);
    const resumeResp = await env.ASSETS.fetch(resumeUrl.toString());
    if (!resumeResp.ok) throw new Error(`Status ${resumeResp.status}`);
    resumeText = await resumeResp.text();
    console.log(`[lens-summary] Resume loaded successfully (${resumeText.length} chars)`);
  } catch (err) {
    console.error("[lens-summary] Failed to load resume.txt", err);
    return jsonResponse({ 
      error: "Unable to load resume.txt",
      details: err instanceof Error ? err.message : "Unknown error",
      help: "Ensure resume.txt exists in the project root directory"
    }, 500);
  }

  const prompt = buildPrompt(resumeText, lensRaw);
  console.log(`[lens-summary] Calling Workers AI - model: ${requestedModel}, prompt length: ${prompt.length}`);

  let generated: string;
  try {
    generated = await queryWorkersAI(env.AI, prompt, requestedModel);
    console.log(`[lens-summary] AI response received (${generated.length} chars)`);
  } catch (err) {
    console.error("[lens-summary] Workers AI error", err);
    return jsonResponse({ 
      error: "Workers AI request failed",
      details: err instanceof Error ? err.message : "Unknown error",
      help: "Check Cloudflare Workers AI status and your account limits"
    }, 502);
  }

  let summary = "";
  let bullets: string[] = [];
  try {
    const parsed = extractJson(generated);
    summary = (parsed.summary || "").toString().trim();
    bullets = Array.isArray(parsed.bullets)
      ? parsed.bullets.map((item: unknown) => String(item).trim()).filter(Boolean).slice(0, 5)
      : [];
    
    if (!summary || summary.length < 10) {
      console.warn(`[lens-summary] Suspiciously short summary: "${summary}"`);
    }
    if (!bullets || bullets.length === 0) {
      console.warn(`[lens-summary] No bullets generated`);
    }
    
    console.log(`[lens-summary] Success - summary: ${summary.length} chars, bullets: ${bullets.length}`);
  } catch (err) {
    console.error("[lens-summary] JSON parse error", err);
    console.error("[lens-summary] Raw output:", generated.substring(0, 500));
    return jsonResponse({ 
      error: "Model response was not in the expected format.",
      details: err instanceof Error ? err.message : "Could not extract JSON from model output",
      help: "Try a different model or rephrase your lens description",
      sample_output: generated.substring(0, 200) + (generated.length > 200 ? "..." : "")
    }, 502);
  }

  return jsonResponse({
    summary,
    key_points: bullets,
    model: requestedModel,
    lens: lensRaw,
    generated_at: new Date().toISOString()
  }, 200);
};

function buildPrompt(resumeText: string, lens: string): string {
  return `
You are an expert resume analyst. Generate a JSON response analyzing this resume through a specific lens.

Lens: ${lens}

Resume:
${resumeText}

Task: Analyze how this resume addresses the given lens. Provide:
1. A concise summary paragraph (100-120 words)
2. Three specific bullet points highlighting relevant accomplishments

Respond ONLY with valid JSON in this exact format:
{
  "summary": "Your analysis paragraph here",
  "bullets": [
    "First key point",
    "Second key point", 
    "Third key point"
  ]
}

Do not include any text outside the JSON structure.`.trim();
}

async function queryWorkersAI(ai: Ai, prompt: string, model: string): Promise<string> {
  console.log(`[lens-summary] Workers AI Request:`, {
    model,
    prompt_length: prompt.length
  });
  
  try {
    const response = await ai.run(model as any, {
      prompt: prompt,
      max_tokens: 512,
      temperature: 0.3
    });

    console.log(`[lens-summary] Workers AI Response:`, {
      success: true,
      response_type: typeof response
    });

    // Workers AI returns an object with a response field
    if (response && typeof response === 'object' && 'response' in response) {
      return String(response.response);
    }
    
    // Sometimes it might return the text directly
    if (typeof response === 'string') {
      return response;
    }

    // Fallback: stringify the response
    return JSON.stringify(response);
    
  } catch (err) {
    console.error("[lens-summary] Workers AI Error:", err);
    throw new Error(`Workers AI request failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}

function extractJson(text: string): Record<string, unknown> {
  // Strategy 1: Look for markdown code block
  const codeBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1]);
    } catch {
      // Fall through to other strategies
    }
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
    const errorMsg = err instanceof Error ? err.message : "Parse error";
    throw new Error(`JSON parse failed: ${errorMsg}. Snippet: ${snippet.substring(0, 100)}...`);
  }
}

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

// Type definitions for Cloudflare Workers AI
interface Ai {
  run(model: string, options: {
    prompt: string;
    max_tokens?: number;
    temperature?: number;
  }): Promise<unknown>;
}

type AssetsFetcher = {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

type PagesEnv = {
  ASSETS: AssetsFetcher;
  AI: Ai;
  HF_TOKEN?: string;
  HF_API_TOKEN?: string;
};

type PagesContext = {
  request: Request;
  env: PagesEnv;
};
