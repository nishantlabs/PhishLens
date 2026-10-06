import { GoogleGenAI } from "@google/genai";
import { AIConfig, getAIConfig } from "./config";
import { AIProviderError } from "./errors";
import {
  AIHealthStatus,
  AIProvider,
  MultimodalAIRequest,
  StructuredModelAssessment,
} from "./types";
import {
  extractJsonFromText,
  validateAndNormalizeModelAssessment,
} from "./validation";

export class GoogleAIProvider implements AIProvider {
  public readonly id = "google-ai";
  public readonly name = "Google AI Studio";
  private config: AIConfig;

  constructor(customConfig?: Partial<AIConfig>) {
    this.config = {
      ...getAIConfig(),
      ...(customConfig || {}),
    };
  }

  public refreshConfig(): void {
    this.config = getAIConfig();
  }

  /**
   * Checks health and reachability of Google AI Studio and the configured Gemma model.
   */
  public async checkHealth(): Promise<AIHealthStatus> {
    this.refreshConfig();
    const { geminiApiKey, gemmaModel } = this.config;
    const startTime = Date.now();

    if (!geminiApiKey) {
      return {
        status: "error",
        reachable: false,
        modelExists: false,
        multimodalSupported: false,
        modelName: gemmaModel,
        baseUrl: "https://generativelanguage.googleapis.com",
        error: "GEMINI_API_KEY environment variable is not configured.",
      };
    }

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);

      // Verify reachability and model list via Google AI API
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiApiKey}`,
        {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
        }
      );

      clearTimeout(timer);

      if (!res.ok) {
        let errMessage = `Google AI API returned HTTP ${res.status}`;
        try {
          const errData = await res.json();
          if (errData?.error?.message) {
            errMessage = errData.error.message;
          }
        } catch {
          // ignore
        }
        return {
          status: "unavailable",
          reachable: false,
          modelExists: false,
          multimodalSupported: false,
          modelName: gemmaModel,
          baseUrl: "https://generativelanguage.googleapis.com",
          error: errMessage,
        };
      }

      const data = await res.json();
      const models: Array<{ name: string; supportedGenerationMethods?: string[] }> =
        data.models || [];
      const modelNames = models.map((m) => m.name.replace(/^models\//, ""));

      const target = gemmaModel.toLowerCase();
      const matched = modelNames.find((n) => n.toLowerCase() === target);
      const modelExists = Boolean(matched);

      const latencyMs = Date.now() - startTime;

      if (!modelExists) {
        return {
          status: "error",
          reachable: true,
          modelExists: false,
          multimodalSupported: false,
          modelName: gemmaModel,
          baseUrl: "https://generativelanguage.googleapis.com",
          availableModels: modelNames,
          latencyMs,
          error: `Configured Gemma model "${gemmaModel}" was not found in Google AI Studio.`,
        };
      }

      return {
        status: "ok",
        reachable: true,
        modelExists: true,
        multimodalSupported: true,
        modelName: matched || gemmaModel,
        baseUrl: "https://generativelanguage.googleapis.com",
        availableModels: modelNames,
        latencyMs,
      };
    } catch (err: any) {
      const isTimeout = err.name === "AbortError" || err.message?.includes("aborted");
      return {
        status: "unavailable",
        reachable: false,
        modelExists: false,
        multimodalSupported: false,
        modelName: gemmaModel,
        baseUrl: "https://generativelanguage.googleapis.com",
        error: isTimeout
          ? "Connection to Google AI Studio timed out."
          : `Failed to connect to Google AI: ${err.message || err}`,
      };
    }
  }

  /**
   * Performs multimodal threat analysis using Google AI Studio and Gemma 4.
   */
  public async analyzeMultimodal(
    request: MultimodalAIRequest
  ): Promise<StructuredModelAssessment> {
    this.refreshConfig();
    const { geminiApiKey, gemmaModel } = this.config;

    if (!geminiApiKey) {
      throw AIProviderError.missingApiKey();
    }

    const ai = new GoogleGenAI({ apiKey: geminiApiKey });

    // Format analysis prompt containing all technical context
    const prompt = `You are PhishLens, an elite cybersecurity analyzer powered by Google Gemma 4.
Analyze this uploaded screenshot and extracted interaction data for phishing, brand impersonation, credential harvesting, payment scams, and social engineering manipulation:

- File: ${request.metadata.filename}
- Detected Language: ${request.metadata.detectedLanguage}
- Extracted OCR Text:
"${request.extractedText || "(No text detected in artifact)"}"

- Digital Indicators & URLs:
${request.urls.length > 0 ? request.urls.map((u) => `• URL: ${u}`).join("\n") : "• No direct URLs detected"}
${request.domains.length > 0 ? `• Domains identified: ${request.domains.join(", ")}` : ""}

- QR Code Decoded Payload:
${request.qrPayload ? `• QR Data: ${request.qrPayload}` : "• No QR code detected"}

- Pre-Extracted Keyword Signals:
• Urgency Markers: ${request.metadata.urgencyIndicators.join(", ") || "None"}
• Credential Keywords: ${request.metadata.credentialKeywords.join(", ") || "None"}
• Payment Keywords: ${request.metadata.paymentKeywords.join(", ") || "None"}

Perform a full multimodal security evaluation:
1. Visual authenticity: fake branding, unaligned UI, fake security badges, spoofed login forms.
2. Psychological manipulation: artificial urgency ("within 24 hours"), fear, authority, reward, false claims.
3. Digital indicators: suspicious URLs, shorteners, direct IPs, unverified domains.
4. Threat Map regions: identify up to 4 key bounding boxes on the image with [x, y, width, height] in percentages (0-100), categories (url|credential|urgency|branding|payment|safe), label, and whyItMatters.
5. Actionable guidance: concrete DO and DO NOT recommendations.

Return STRICT JSON only matching this schema:
{
  "verdict": "SAFE" | "LOW_RISK" | "SUSPICIOUS" | "HIGH_RISK" | "CRITICAL",
  "riskScore": number (0-100),
  "confidence": number (0.0-1.0),
  "primaryCategory": "PHISHING" | "PAYMENT_SCAM" | "IMPERSONATION" | "SOCIAL_ENGINEERING" | "MALICIOUS_WEBSITE" | "KYC_SCAM" | "INVESTMENT_SCAM" | "LEGITIMATE_COMMUNICATION",
  "threatTypes": ["PHISHING", ...],
  "summary": "Concise 1-2 sentence threat summary",
  "socialEngineering": ["urgency", "fear", "authority", ...],
  "visualIndicators": [
    {
      "id": "box-1",
      "x": number (0-100),
      "y": number (0-100),
      "width": number (0-100),
      "height": number (0-100),
      "category": "url" | "credential" | "urgency" | "branding" | "payment" | "safe",
      "label": "string",
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "SAFE",
      "whyItMatters": "string"
    }
  ],
  "attackPattern": ["Step 1", "Step 2", ...],
  "explanations": [
    {
      "title": "string",
      "description": "string",
      "extractedQuote": "string"
    }
  ],
  "recommendations": {
    "do": ["string"],
    "doNot": ["string"]
  }
}`;

    const contents: any[] = [{ text: prompt }];

    // If screenshot is present, pass as multimodal inlineData
    if (request.imageBase64 && request.imageBase64.trim()) {
      const pureBase64 = request.imageBase64.replace(
        /^data:image\/[a-zA-Z0-9+.-]+;base64,/,
        ""
      );
      if (pureBase64.length > 0) {
        contents.push({
          inlineData: {
            mimeType: request.imageMimeType || "image/png",
            data: pureBase64,
          },
        });
      }
    }

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    const isTransientError = (err: any): boolean => {
      const status = err?.status || err?.statusCode || err?.response?.status;
      if (status === 500 || status === 503) return true;
      const msg = (err?.message || String(err)).toLowerCase();
      if (
        msg.includes("500") ||
        msg.includes("503") ||
        msg.includes("internal error") ||
        msg.includes("unavailable") ||
        msg.includes("high demand") ||
        msg.includes("overloaded")
      ) {
        // Exclude non-transient / client errors
        if (
          msg.includes("400") ||
          msg.includes("bad request") ||
          msg.includes("invalid argument") ||
          msg.includes("api_key_invalid") ||
          msg.includes("unregistered") ||
          msg.includes("401") ||
          msg.includes("403")
        ) {
          return false;
        }
        return true;
      }
      return false;
    };

    const mapAndThrowError = (err: any): never => {
      const msg = err?.message || String(err);
      if (
        msg.includes("503") ||
        msg.toLowerCase().includes("high demand") ||
        msg.toLowerCase().includes("unavailable")
      ) {
        throw AIProviderError.googleApiError(
          `Gemma 4 model "${gemmaModel}" is currently experiencing temporary high demand on Google AI Studio. Please retry in a moment.`,
          503
        );
      }
      if (
        msg.includes("API_KEY_INVALID") ||
        msg.includes("403") ||
        msg.includes("unregistered")
      ) {
        throw AIProviderError.googleApiError(
          "Invalid or unauthorized Google AI Studio API key. Please check GEMINI_API_KEY.",
          401
        );
      }
      throw AIProviderError.googleApiError(
        `Google AI Gemma reasoning failed: ${msg}`,
        msg.includes("500") ? 500 : 502
      );
    };

    let responseText = "";
    let res: any = null;

    try {
      res = await ai.models.generateContent({
        model: gemmaModel,
        contents,
        config: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      });
    } catch (firstErr: any) {
      if (isTransientError(firstErr)) {
        console.warn(
          `[GoogleAIProvider] Transient error from Gemma 4 (${firstErr?.message || firstErr}). Retrying once after 1500ms...`
        );
        await sleep(1500);
        try {
          res = await ai.models.generateContent({
            model: gemmaModel,
            contents,
            config: {
              responseMimeType: "application/json",
              temperature: 0.1,
            },
          });
        } catch (retryErr: any) {
          mapAndThrowError(retryErr);
        }
      } else {
        mapAndThrowError(firstErr);
      }
    }

    if (res?.text && res.text.trim()) {
      responseText = res.text.trim();
    } else {
      // Fallback: extract text parts that are not thought
      const candidate = res?.candidates?.[0];
      const parts = candidate?.content?.parts || [];
      for (const p of parts) {
        if ((p as any).text && !(p as any).thought) {
          responseText += (p as any).text;
        }
      }
    }

    if (!responseText || !responseText.trim()) {
      throw AIProviderError.emptyResponse(gemmaModel);
    }

    // Parse and strictly validate against threat assessment schema
    const rawParsed = extractJsonFromText(responseText);
    const validatedAssessment = validateAndNormalizeModelAssessment(rawParsed);

    return validatedAssessment;
  }
}
