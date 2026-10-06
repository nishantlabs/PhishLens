import {
  BoundingBox,
  SocialEngineeringTactic,
  ThreatCategory,
  ThreatVerdict,
} from "@/types/threat";

export interface MultimodalAIRequest {
  imageBase64?: string;
  imageMimeType?: string;
  extractedText: string;
  urls: string[];
  domains: string[];
  qrPayload?: string;
  metadata: {
    filename: string;
    detectedLanguage: string;
    urgencyIndicators: string[];
    credentialKeywords: string[];
    paymentKeywords: string[];
  };
}

export interface StructuredModelAssessment {
  verdict: ThreatVerdict;
  riskScore: number;
  confidence: number;
  primaryCategory: ThreatCategory;
  threatTypes: ThreatCategory[];
  summary: string;
  socialEngineering: SocialEngineeringTactic[];
  visualIndicators: BoundingBox[];
  attackPattern: string[];
  explanations: {
    title: string;
    description: string;
    extractedQuote?: string;
  }[];
  recommendations: {
    do: string[];
    doNot: string[];
  };
}

export interface AIHealthStatus {
  status: "ok" | "unavailable" | "error";
  reachable: boolean;
  modelExists: boolean;
  multimodalSupported: boolean;
  modelName: string;
  baseUrl: string;
  availableModels?: string[];
  error?: string;
  latencyMs?: number;
}

export interface AIProvider {
  readonly id: string;
  readonly name: string;
  analyzeMultimodal(request: MultimodalAIRequest): Promise<StructuredModelAssessment>;
  checkHealth(): Promise<AIHealthStatus>;
}
