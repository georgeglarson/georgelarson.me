interface LensRequest {
  lens: string;
  model?: string;
}

interface HuggingFaceSuccess {
  generated_text?: string;
}

const DEFAULT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";
const ALLOWED_MODELS = new Set([
  DEFAULT_MODEL,
  "meta-llama/Llama-3-8b-chat-hf",
  "google/gemma-2-9b-it"
]);

const JSON_ERROR = { error: "Unable to process request" };

export const onRequest = async ({ request, env }: PagesContext) => {
  if (request.method.toUpperCase() !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let payload: LensRequest;
  try {
    payload = await request.json() as LensRequest;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const lensRaw = (payload.lens || "").toString().trim();
  if (!lensRaw) {
    return jsonResponse({ error: "Provide a focus or lens description." }, 400);
  }
  if (lensRaw.length > 240) {
    return jsonResponse({ error: "Lens description is too long (max 240 characters)." }, 400);
  }

  const requestedModel = (payload.model || "").toString().trim() || DEFAULT_MODEL;
  if (!ALLOWED_MODELS.has(requestedModel)) {
    return jsonResponse({ error: "Model not permitted." }, 400);
  }

  const token = env.HF_TOKEN || env.HF_API_TOKEN;
  if (!token) {
    return jsonResponse({ error: "Hugging Face token not configured." }, 500);
  }

  let resumeText = "";
  try {
    const resumeUrl = new URL("/resume.txt", request.url);
    const resumeResp = await env.ASSETS.fetch(new Request(resumeUrl.toString(), request));
    if (!resumeResp.ok) throw new Error(`Status ${resumeResp.status}`);
    resumeText = await resumeResp.text();
  } catch (err) {
    console.error("Failed to load resume.txt", err);
    return jsonResponse(JSON_ERROR, 500);
  }

  const prompt = buildPrompt(resumeText, lensRaw);

  let generated: string;
  try {
    generated = await queryHuggingFace(prompt, requestedModel, token);
  } catch (err) {
    console.error("HF error", err);
    if (err instanceof ResponseError) {
      return jsonResponse({ error: err.message }, err.status);
    }
    return jsonResponse(JSON_ERROR, 502);
  }

  let summary = "";
  let bullets: string[] = [];
  try {
    const parsed = extractJson(generated);
    summary = (parsed.summary || "").toString().trim();
    bullets = Array.isArray(parsed.bullets)
      ? parsed.bullets.map((item: unknown) => String(item).trim()).filter(Boolean).slice(0, 5)
      : [];
  } catch (err) {
    console.error("JSON parse error", err, generated);
    return jsonResponse({ error: "Model response was not in the expected format." }, 502);
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

  if (!response.ok) {
    const message = await safeRead(response);
    if (response.status === 503 && message.includes("currently loading")) {
      throw new ResponseError("Model is warming up. Please try again in a few seconds.", 503);
    }
    throw new ResponseError(message || "Hugging Face API error.", response.status);
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
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("No JSON block detected.");
  }
  const snippet = text.slice(start, end + 1);
  return JSON.parse(snippet);
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" }
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
