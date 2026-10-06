import { AIProvider } from "./types";
import { GoogleAIProvider } from "./google-ai-provider";

let currentProvider: AIProvider | null = null;

/**
 * Returns the currently active AI provider singleton.
 * Uses GoogleAIProvider for Google AI Studio Gemma 4 cloud inference.
 */
export function getAIProvider(): AIProvider {
  if (!currentProvider) {
    currentProvider = new GoogleAIProvider();
  }
  return currentProvider;
}

/**
 * Replace the active AI provider (useful for testing or switching runtimes).
 */
export function setAIProvider(provider: AIProvider): void {
  currentProvider = provider;
}
