export type AIErrorCode =
  | "OLLAMA_UNAVAILABLE"
  | "MODEL_NOT_FOUND"
  | "CONNECTION_TIMEOUT"
  | "INFERENCE_TIMEOUT"
  | "EMPTY_RESPONSE"
  | "MALFORMED_RESPONSE"
  | "UNSUPPORTED_MULTIMODAL"
  | "AI_SERVICE_ERROR";

export class AIProviderError extends Error {
  public readonly code: AIErrorCode;
  public readonly userMessage: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    code: AIErrorCode,
    userMessage: string,
    statusCode: number = 503,
    details?: unknown
  ) {
    super(userMessage);
    this.name = "AIProviderError";
    this.code = code;
    this.userMessage = userMessage;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, AIProviderError.prototype);
  }

  static ollamaUnavailable(baseUrl: string, originalError?: unknown): AIProviderError {
    return new AIProviderError(
      "OLLAMA_UNAVAILABLE",
      `AI analysis is currently unavailable. Ollama could not be reached at ${baseUrl}.`,
      503,
      originalError instanceof Error ? originalError.message : originalError
    );
  }

  static modelNotFound(modelName: string, availableModels?: string[]): AIProviderError {
    const hint = availableModels && availableModels.length > 0
      ? ` Installed models: ${availableModels.join(", ")}.`
      : " No models found.";
    return new AIProviderError(
      "MODEL_NOT_FOUND",
      `Configured Gemma model "${modelName}" is not installed in Ollama. Please run "ollama run ${modelName}".${hint}`,
      503,
      { modelName, availableModels }
    );
  }

  static connectionTimeout(timeoutMs: number): AIProviderError {
    return new AIProviderError(
      "CONNECTION_TIMEOUT",
      `Connection to Ollama timed out after ${Math.round(timeoutMs / 1000)}s. Please verify Ollama is active.`,
      504
    );
  }

  static inferenceTimeout(timeoutMs: number): AIProviderError {
    return new AIProviderError(
      "INFERENCE_TIMEOUT",
      `AI reasoning timed out after ${Math.round(timeoutMs / 1000)}s while analyzing artifact. The model may still be loading or system is under high load.`,
      504
    );
  }

  static emptyResponse(modelName: string): AIProviderError {
    return new AIProviderError(
      "EMPTY_RESPONSE",
      `The AI model "${modelName}" returned an empty response.`,
      502
    );
  }

  static malformedResponse(rawSnippet?: string): AIProviderError {
    return new AIProviderError(
      "MALFORMED_RESPONSE",
      "The AI model returned an unparseable response structure. Unable to complete structured threat assessment.",
      502,
      rawSnippet ? { rawSnippet: rawSnippet.substring(0, 300) } : undefined
    );
  }

  static unsupportedMultimodal(modelName: string): AIProviderError {
    return new AIProviderError(
      "UNSUPPORTED_MULTIMODAL",
      `The configured model "${modelName}" does not support multimodal image input. Please use a vision-capable Gemma model.`,
      400
    );
  }

  static missingApiKey(): AIProviderError {
    return new AIProviderError(
      "AI_SERVICE_ERROR",
      "Google AI Studio API key is not configured. Please set GEMINI_API_KEY in .env.local.",
      503
    );
  }

  static googleApiError(message: string, statusCode: number = 502): AIProviderError {
    return new AIProviderError(
      "AI_SERVICE_ERROR",
      message,
      statusCode
    );
  }
}
