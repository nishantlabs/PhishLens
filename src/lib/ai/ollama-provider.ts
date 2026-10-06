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

export class OllamaProvider implements AIProvider {
  public readonly id = "ollama";
  public readonly name = "Ollama Local AI Runtime";
  private config: AIConfig;

  constructor(customConfig?: Partial<AIConfig>) {
    this.config = {
      ...getAIConfig(),
      ...(customConfig || {}),
    };
  }

  /**
   * Refreshes dynamic configuration from environment
   */
  public refreshConfig(): void {
    this.config = getAIConfig();
  }

  /**
   * Checks health and reachability of Ollama and the configured Gemma model.
   */
  public async checkHealth(): Promise<AIHealthStatus> {
    this.refreshConfig();
    const { ollamaBaseUrl, gemmaModel, connectionTimeoutMs } = this.config;
    const startTime = Date.now();

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), connectionTimeoutMs);

    try {
      const res = await fetch(`${ollamaBaseUrl}/api/tags`, {
        method: "GET",
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });

      clearTimeout(timer);

      if (!res.ok) {
        return {
          status: "unavailable",
          reachable: false,
          modelExists: false,
          multimodalSupported: false,
          modelName: gemmaModel,
          baseUrl: ollamaBaseUrl,
          error: `Ollama returned HTTP status ${res.status}`,
        };
      }

      const data = await res.json();
      const models: Array<{ name: string; model?: string; details?: any; capabilities?: string[] }> =
        data.models || [];
      const availableModelNames = models.map((m) => m.name);

      // Match configured model name (e.g. "gemma4:latest" or "gemma4")
      const matched = models.find((m) => {
        const n = m.name.toLowerCase();
        const target = gemmaModel.toLowerCase();
        return (
          n === target ||
          n === `${target}:latest` ||
          `${n}:latest` === target ||
          (m.model && m.model.toLowerCase() === target)
        );
      });

      const modelExists = Boolean(matched);

      // Check for multimodal vision capability
      let multimodalSupported = false;
      if (matched) {
        if (Array.isArray(matched.capabilities)) {
          multimodalSupported = matched.capabilities.includes("vision");
        } else if (matched.details?.families) {
          const fams = Array.isArray(matched.details.families)
            ? matched.details.families
            : [matched.details.families];
          multimodalSupported = fams.some((f: string) => /gemma|vision|llava/i.test(f));
        } else {
          // Default to true for Gemma 4 if detected
          multimodalSupported = /gemma4|gemma-4/i.test(matched.name);
        }
      }

      const latencyMs = Date.now() - startTime;

      if (!modelExists) {
        return {
          status: "error",
          reachable: true,
          modelExists: false,
          multimodalSupported: false,
          modelName: gemmaModel,
          baseUrl: ollamaBaseUrl,
          availableModels: availableModelNames,
          latencyMs,
          error: `Configured model "${gemmaModel}" was not found in Ollama.`,
        };
      }

      return {
        status: "ok",
        reachable: true,
        modelExists: true,
        multimodalSupported,
        modelName: matched?.name || gemmaModel,
        baseUrl: ollamaBaseUrl,
        availableModels: availableModelNames,
        latencyMs,
      };
    } catch (err: any) {
      clearTimeout(timer);
      const isTimeout = err.name === "AbortError" || err.message?.includes("aborted");

      return {
        status: "unavailable",
        reachable: false,
        modelExists: false,
        multimodalSupported: false,
        modelName: gemmaModel,
        baseUrl: ollamaBaseUrl,
        error: isTimeout
          ? `Connection to Ollama timed out after ${connectionTimeoutMs}ms`
          : "Ollama could not be reached. Ensure the server is running.",
      };
    }
  }

  /**
   * Performs multimodal threat analysis via Ollama HTTP API.
   */
  public async analyzeMultimodal(
    request: MultimodalAIRequest
  ): Promise<StructuredModelAssessment> {
    this.refreshConfig();
    const { ollamaBaseUrl, gemmaModel, inferenceTimeoutMs } = this.config;

    // Clean image data for Ollama (Ollama accepts array of pure base64 strings without data URI prefix)
    let images: string[] | undefined = undefined;
    if (request.imageBase64 && request.imageBase64.trim()) {
      const pureBase64 = request.imageBase64.replace(
        /^data:image\/[a-zA-Z0-9+.-]+;base64,/,
        ""
      );
      if (pureBase64.length > 0) {
        images = [pureBase64];
      }
    }

    const prompt = `You are PhishLens, an elite cybersecurity analyst powered by Google Gemma 4.
Analyze this digital artifact for cybersecurity threats (phishing, impersonation, scam, credential harvesting):
Filename: ${request.metadata.filename}
Language: ${request.metadata.detectedLanguage}
Extracted Text:
"${request.extractedText || "(No text detected)"}"
URLs: ${request.urls.join(", ") || "None"}
Domains: ${request.domains.join(", ") || "None"}
QR Payload: ${request.qrPayload || "None"}
Urgency Markers: ${request.metadata.urgencyIndicators.join(", ") || "None"}
Credential Keywords: ${request.metadata.credentialKeywords.join(", ") || "None"}
Payment Keywords: ${request.metadata.paymentKeywords.join(", ") || "None"}

Return a STRICT JSON threat assessment matching this structure:
{
  "verdict": "SAFE" | "LOW_RISK" | "SUSPICIOUS" | "HIGH_RISK" | "CRITICAL",
  "riskScore": 95,
  "confidence": 0.95,
  "primaryCategory": "PHISHING",
  "threatTypes": ["PHISHING", "IMPERSONATION"],
  "summary": "1-2 sentence threat assessment",
  "socialEngineering": ["urgency", "fear"],
  "visualIndicators": [
    {
      "id": "box-1",
      "x": 10,
      "y": 20,
      "width": 80,
      "height": 18,
      "category": "url",
      "label": "Indicator Label",
      "severity": "CRITICAL",
      "whyItMatters": "Why this matters"
    }
  ],
  "attackPattern": ["Impersonation", "Urgency Manipulation"],
  "explanations": [
    {
      "title": "Title",
      "description": "Explanation",
      "extractedQuote": "Quote if applicable"
    }
  ],
  "recommendations": {
    "do": ["Recommended action"],
    "doNot": ["Action to avoid"]
  }
}`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), inferenceTimeoutMs);

    let res: Response;
    try {
      res = await fetch(`${ollamaBaseUrl}/api/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          model: gemmaModel,
          prompt,
          images,
          format: "json",
          stream: false,
          options: {
            temperature: 0.1,
          },
        }),
      });
    } catch (err: any) {
      clearTimeout(timer);
      if (err.name === "AbortError" || err.message?.includes("aborted")) {
        throw AIProviderError.inferenceTimeout(inferenceTimeoutMs);
      }
      throw AIProviderError.ollamaUnavailable(ollamaBaseUrl, err);
    }

    clearTimeout(timer);

    if (!res.ok) {
      let errorBody = "";
      try {
        errorBody = await res.text();
      } catch {
        // ignore
      }

      if (res.status === 404 || errorBody.toLowerCase().includes("not found")) {
        throw AIProviderError.modelNotFound(gemmaModel);
      }
      if (errorBody.toLowerCase().includes("does not support image") || errorBody.toLowerCase().includes("vision")) {
        throw AIProviderError.unsupportedMultimodal(gemmaModel);
      }
      throw new AIProviderError(
        "AI_SERVICE_ERROR",
        `Ollama returned error (${res.status}): ${errorBody || res.statusText}`,
        res.status
      );
    }

    let data: any;
    try {
      data = await res.json();
    } catch (err) {
      throw AIProviderError.malformedResponse("Could not parse JSON response envelope from Ollama.");
    }

    let responseText = data.response;
    if (!responseText || !responseText.trim()) {
      if (data.thinking && typeof data.thinking === "string") {
        responseText = data.thinking;
      }
    }

    if (!responseText || !responseText.trim()) {
      throw AIProviderError.emptyResponse(gemmaModel);
    }

    // Parse and strictly validate against schema
    const rawParsed = extractJsonFromText(responseText);
    const validatedAssessment = validateAndNormalizeModelAssessment(rawParsed);

    return validatedAssessment;
  }
}
