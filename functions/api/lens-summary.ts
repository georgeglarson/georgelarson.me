interface LensRequest {
  lens: string;
  model?: string;
}

interface HuggingFaceSuccess {
  generated_text?: string;
}

const DEFAULT_MODEL = "google/flan-t5-base";
const ALLOWED_MODELS = new Set([
  DEFAULT_MODEL,
  "google/flan-t5-large",
  "facebook/bart-large-cnn",
  "gpt2"
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
    const hasToken = Boolean(env.HF_TOKEN || env.HF_API_TOKEN);
    const hasAssets = Boolean(env.ASSETS);
    
    return new Response(JSON.stringify({
      endpoint: "/api/lens-summary",
      method: "POST",
      description: "Generate AI-powered resume summaries through specific lenses using Hugging Face Inference API",
      status: "operational",
      configuration: {
        hf_token_configured: hasToken,
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
          model: "string (optional) - One of the available models"
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
        hasToken ? "✓ HF_TOKEN is configured" : "⚠ HF_TOKEN is not configured - set it in Cloudflare Pages environment variables",
        hasAssets ? "✓ ASSETS fetcher is available" : "⚠ ASSETS fetcher not available",
        "Models may take 10-30 seconds to warm up on first request",
        "Use the test page for browser-based testing"
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

  const token = env.HF_TOKEN || env.HF_API_TOKEN;
  if (!token) {
    console.error("[lens-summary] HF_TOKEN not configured");
    return jsonResponse({
      error: "Hugging Face token not configured.",
      help: "Set HF_TOKEN environment variable in Cloudflare Pages settings",
      docs: "https://dash.cloudflare.com (Pages → Your Project → Settings → Environment Variables)"
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
  console.log(`[lens-summary] Calling Hugging Face API - model: ${requestedModel}, prompt length: ${prompt.length}`);

  let generated: string;
  try {
    generated = await queryHuggingFace(prompt, requestedModel, token);
    console.log(`[lens-summary] HF response received (${generated.length} chars)`);
  } catch (err) {
    console.error("[lens-summary] HF API error", err);
    if (err instanceof ResponseError) {
      return jsonResponse({
        error: err.message,
        status_code: err.status,
        help: err.status === 503
          ? "Model is warming up. This is normal for the first request. Please retry in 10-15 seconds."
          : "Check Hugging Face API status and your token permissions"
      }, err.status);
    }
    return jsonResponse({
      error: "Hugging Face API request failed",
      details: err instanceof Error ? err.message : "Unknown error"
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
System:
You generate concise JSON summaries for professional resumes. Do not include commentary outside JSON.

Lens request: ${lens}

Resume:
${resumeText}

Instruction:
Explain how this resume speaks to the lens request above. Provide a short paragraph (<= 120 words) and three concise bullet points that surface relevant accomplishments.

Format:
{
  "summary": "...",
  "bullets": [
    "point one",
    "point two",
    "point three"
  ]
}
`.trim();
}

async function queryHuggingFace(prompt: string, model: string, token: string): Promise<string> {
  const endpoint = `https://api-inference.huggingface.co/models/${model}`;
  
  console.log(`[lens-summary] HF API Request:`, {
    endpoint,
    model,
    token_present: Boolean(token),
    token_prefix: token ? token.substring(0, 7) + '...' : 'none',
    prompt_length: prompt.length
  });
  
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 320,
        temperature: 0.2,
        return_full_text: false
      }
    })
  });

  console.log(`[lens-summary] HF API Response:`, {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries())
  });

  if (!response.ok) {
    const message = await safeRead(response);
    console.error(`[lens-summary] HF API Error ${response.status}:`, message);
    
    // Try to parse as JSON for better error details
    let errorDetails;
    try {
      errorDetails = JSON.parse(message);
      console.error(`[lens-summary] HF Error Details:`, errorDetails);
    } catch {
      errorDetails = { raw: message };
    }
    
    if (response.status === 503 && message.includes("currently loading")) {
      throw new ResponseError("Model is warming up. Please try again in a few seconds.", 503);
    }
    
    // Include full error details in response
    const errorMsg = errorDetails.error || message || "Hugging Face API error";
    throw new ResponseError(
      `HF API returned ${response.status}: ${errorMsg}. Model: ${model}. Details: ${JSON.stringify(errorDetails)}`,
      response.status
    );
  }

  const data = await response.json() as unknown;
  if (Array.isArray(data) && data.length > 0) {
    const first = data[0] as HuggingFaceSuccess;
    if (first.generated_text) return first.generated_text;
  } else if (typeof data === "object" && data !== null && "generated_text" in data) {
    return String((data as Record<string, unknown>).generated_text || "");
  }

  throw new Error("Unexpected Hugging Face response format.");
}

async function safeRead(response: Response): Promise<string> {
  try {
    const text = await response.text();
    return text.slice(0, 500);
  } catch {
    return "";
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

class ResponseError extends Error {
  public status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
type AssetsFetcher = {
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
};

type PagesEnv = {
  ASSETS: AssetsFetcher;
  HF_TOKEN?: string;
  HF_API_TOKEN?: string;
};

type PagesContext = {
  request: Request;
  env: PagesEnv;
};
