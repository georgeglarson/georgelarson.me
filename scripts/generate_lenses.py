"""
Generate resume lens summaries using the Hugging Face Inference API.

Set HF_API_TOKEN in your environment before running:
    export HF_API_TOKEN=hf_xxx
Optionally override the model with HF_MODEL (default: mistralai/Mistral-7B-Instruct-v0.3).
"""

from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path
from textwrap import dedent
from typing import Dict, List
from urllib import error, request

ROOT = Path(__file__).resolve().parents[1]
RESUME_PATH = ROOT / "resume.txt"
OUTPUT_PATH = ROOT / "data" / "resume_lenses.json"

HF_DEFAULT_MODEL = "mistralai/Mistral-7B-Instruct-v0.3"

# Lenses to generate; tweak prompts or add new ones here.
LENSES: Dict[str, Dict[str, object]] = {
    "ai-privacy": {
        "title": "AI + privacy",
        "instruction": (
            "Summarise how George Larson applies AI while protecting privacy and regulated data. "
            "Focus on applied systems, leadership signals, and measurable outcomes. "
            "Return bullet points that show real projects, not generic traits."
        ),
        "recommended_terms": ["privacy", "AI", "OCR", "security", "tabletop"],
    },
    "manufacturing-ops": {
        "title": "Manufacturing operations",
        "instruction": (
            "Summarise George Larson's experience with manufacturing, firmware, and production systems. "
            "Highlight uptime improvements, hardware labs, and PLC or robotics work."
        ),
        "recommended_terms": ["manufacturing", "TiVo", "PLC", "conveyors", "uptime"],
    },
    "technology-leadership": {
        "title": "Technology leadership",
        "instruction": (
            "Summarise George Larson's leadership style. "
            "Cover roadmaps, mixed teams, communication, and how he balances hands-on work with management."
        ),
        "recommended_terms": ["roadmap", "team", "Agile", "mentorship", "leadership"],
    },
}


def load_resume() -> str:
    if not RESUME_PATH.exists():
        raise FileNotFoundError(f"Missing resume source: {RESUME_PATH}")
    return RESUME_PATH.read_text(encoding="utf-8")


def call_hugging_face(prompt: str) -> str:
    token = os.environ.get("HF_API_TOKEN") or os.environ.get("HF_TOKEN")
    if not token:
        raise EnvironmentError(
            "HF_API_TOKEN (or HF_TOKEN) is not set. Create a Hugging Face token and export it before running."
        )
    model = os.environ.get("HF_MODEL", HF_DEFAULT_MODEL)
    url = f"https://api-inference.huggingface.co/models/{model}"
    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 320,
            "temperature": 0.2,
            "return_full_text": False,
        },
    }
    data = json.dumps(payload).encode("utf-8")
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    req = request.Request(url, data=data, headers=headers, method="POST")
    try:
        with request.urlopen(req, timeout=120) as resp:
            body = resp.read()
    except error.HTTPError as http_err:
        message = http_err.read().decode("utf-8", errors="ignore")
        raise RuntimeError(f"Hugging Face API error ({http_err.code}): {message}") from http_err
    except error.URLError as url_err:
        raise RuntimeError(f"Failed to reach Hugging Face API: {url_err.reason}") from url_err

    parsed = json.loads(body.decode("utf-8"))
    if isinstance(parsed, list) and parsed:
        generated = parsed[0].get("generated_text", "")
        if not generated:
            raise ValueError(f"Unexpected response payload: {parsed}")
        return generated
    if isinstance(parsed, dict) and "generated_text" in parsed:
        return str(parsed["generated_text"])
    raise ValueError(f"Unhandled response structure: {parsed}")


def extract_json_block(text: str) -> Dict[str, object]:
    start = text.find("{")
    end = text.rfind("}")
    if start == -1 or end == -1 or end <= start:
        raise ValueError(f"Model response did not contain JSON: {text}")
    snippet = text[start : end + 1]
    return json.loads(snippet)


def generate_sections(resume_text: str) -> List[Dict[str, object]]:
    sections: List[Dict[str, object]] = []
    for lens_id, spec in LENSES.items():
        prompt = dedent(
            f"""
            System:
            You generate concise JSON summaries for professional résumés. Do not include commentary outside JSON.

            Resume:
            {resume_text}

            Instruction:
            {spec['instruction']}

            Format:
            {{
              "summary": "<80-120 word paragraph>",
              "bullets": [
                "bullet one",
                "bullet two",
                "bullet three"
              ]
            }}
            """
        ).strip()
        raw_output = call_hugging_face(prompt)
        payload = extract_json_block(raw_output)
        summary = str(payload.get("summary", "")).strip()
        bullets = [str(item).strip() for item in payload.get("bullets", []) if str(item).strip()]
        sections.append(
            {
                "id": lens_id,
                "title": spec["title"],
                "summary": summary,
                "key_points": bullets[:3],
                "recommended_terms": spec["recommended_terms"],
                "source_notes": spec.get("source_notes", []),
            }
        )
    return sections


def main():
    resume_text = load_resume()
    sections = generate_sections(resume_text)
    payload = {
        "generated_at": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "model_hint": "Generated via Hugging Face Inference API (default mistralai/Mistral-7B-Instruct-v0.3).",
        "lenses": sections,
    }
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
