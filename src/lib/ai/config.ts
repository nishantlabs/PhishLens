export interface AIConfig {
  geminiApiKey: string;
  gemmaModel: string;
  timeoutMs: number;
  ollamaBaseUrl: string;
  connectionTimeoutMs: number;
  inferenceTimeoutMs: number;
}

let runtimeOverrides: Partial<AIConfig> = {};

export function setRuntimeConfig(overrides: Partial<AIConfig>): void {
  runtimeOverrides = {
    ...runtimeOverrides,
    ...overrides,
  };
}

export function resetRuntimeConfig(): void {
  runtimeOverrides = {};
}

export function getAIConfig(): AIConfig {
  const geminiApiKey =
    runtimeOverrides.geminiApiKey ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENAI_API_KEY ||
    "";

  const gemmaModel =
    runtimeOverrides.gemmaModel ||
    process.env.GEMMA_MODEL ||
    "gemma-4-26b-a4b-it";

  const timeoutMs =
    runtimeOverrides.timeoutMs ||
    (process.env.GEMINI_TIMEOUT_MS
      ? parseInt(process.env.GEMINI_TIMEOUT_MS, 10)
      : 60000);

  const rawBaseUrl =
    runtimeOverrides.ollamaBaseUrl ||
    process.env.OLLAMA_BASE_URL ||
    "http://localhost:11434";
  const ollamaBaseUrl = rawBaseUrl.replace(/\/+$/, "");

  const connectionTimeoutMs =
    runtimeOverrides.connectionTimeoutMs ||
    (process.env.OLLAMA_CONNECT_TIMEOUT_MS
      ? parseInt(process.env.OLLAMA_CONNECT_TIMEOUT_MS, 10)
      : 10000);

  const inferenceTimeoutMs =
    runtimeOverrides.inferenceTimeoutMs ||
    (process.env.OLLAMA_INFERENCE_TIMEOUT_MS
      ? parseInt(process.env.OLLAMA_INFERENCE_TIMEOUT_MS, 10)
      : 180000);

  return {
    geminiApiKey,
    gemmaModel,
    timeoutMs,
    ollamaBaseUrl,
    connectionTimeoutMs,
    inferenceTimeoutMs,
  };
}
