import { ThreatAssessment } from "@/types/threat";
import { analyzeExtractedText } from "../security/url-analyzer";
import { analyzeTextFeatures } from "../security/ocr-processor";
import { calculateRiskScore } from "../security/risk-engine";
import { parseQrData } from "../security/qr-scanner";
import { getAIProvider } from "./factory";
import { getAIConfig } from "./config";

export interface MultimodalAnalysisInput {
  imageBase64?: string;
  imageMimeType?: string;
  extractedText?: string;
  filename?: string;
  qrPayload?: string;
}

/**
 * Core application-level multimodal analysis interface.
 * Coordinates OCR, URL extraction, QR inspection, Gemma 4 via AIProvider,
 * schema validation, deterministic checks, and transparent risk scoring.
 */
export async function analyzeMultimodal(
  input: MultimodalAnalysisInput
): Promise<ThreatAssessment> {
  const startTime = Date.now();
  const config = getAIConfig();
  const provider = getAIProvider();

  // 1. OCR & Linguistic Preprocessing
  const combinedText = input.extractedText || "";
  const ocrFeatures = analyzeTextFeatures(combinedText);

  // 2. Deterministic URL & Digital Infrastructure Inspection
  const digitalReport = analyzeExtractedText(combinedText);

  // 3. Passive QR Inspection
  let qrScan = input.qrPayload ? parseQrData(input.qrPayload) : undefined;
  const isQrSuspicious = Boolean(qrScan?.isUpi || input.qrPayload);

  // 4. Multimodal AI Reasoning via configured AI Provider (Ollama -> Gemma 4)
  // If Ollama is unavailable, this throws AIProviderError with honest message
  const modelAssessment = await provider.analyzeMultimodal({
    imageBase64: input.imageBase64,
    imageMimeType: input.imageMimeType || "image/png",
    extractedText: combinedText,
    urls: digitalReport.urls,
    domains: digitalReport.domains,
    qrPayload: input.qrPayload,
    metadata: {
      filename: input.filename || "artifact.png",
      detectedLanguage: ocrFeatures.detectedLanguage,
      urgencyIndicators: ocrFeatures.urgencyIndicators,
      credentialKeywords: ocrFeatures.credentialKeywords,
      paymentKeywords: ocrFeatures.paymentKeywords,
    },
  });

  // 5. Deterministic Security Checks & Risk Engine Blending
  const riskResult = calculateRiskScore({
    credentialHarvestingDetected:
      ocrFeatures.credentialKeywords.length > 0 ||
      modelAssessment.threatTypes.includes("CREDENTIAL_HARVESTING") ||
      modelAssessment.primaryCategory === "CREDENTIAL_HARVESTING",
    urgencyManipulationDetected:
      ocrFeatures.urgencyIndicators.length > 0 ||
      modelAssessment.socialEngineering.includes("urgency") ||
      modelAssessment.socialEngineering.includes("fear"),
    brandImpersonationDetected:
      digitalReport.suspiciousReasons.some((r) => r.includes("Brand spoofing")) ||
      modelAssessment.threatTypes.includes("IMPERSONATION") ||
      modelAssessment.primaryCategory === "IMPERSONATION",
    suspiciousUrlDetected:
      digitalReport.deterministicRiskBonus > 0 ||
      modelAssessment.visualIndicators.some((v) => v.category === "url"),
    paymentManipulationDetected:
      ocrFeatures.paymentKeywords.length > 0 ||
      modelAssessment.primaryCategory === "PAYMENT_SCAM",
    qrThreatDetected: isQrSuspicious,
    visualInconsistencyDetected:
      modelAssessment.visualIndicators.length > 0 &&
      modelAssessment.verdict !== "SAFE",
    punycodeOrIpDetected: digitalReport.indicators.some((i) => i.isSuspicious),
    isLegitimateDomainVerified:
      modelAssessment.verdict === "SAFE" &&
      digitalReport.deterministicRiskBonus === 0,
    noSensitiveDataRequested:
      ocrFeatures.credentialKeywords.length === 0 &&
      !isQrSuspicious &&
      modelAssessment.verdict === "SAFE",
    modelRiskAssessment: modelAssessment.riskScore,
  });

  // 6. Synthesize Signals
  const signals = [
    ...digitalReport.suspiciousReasons.map((r) => ({
      category: "Digital / Infrastructure",
      severity: "HIGH" as const,
      evidence: r,
      detail: "Deterministic inspection layer",
    })),
    ...ocrFeatures.urgencyIndicators.map((u) => ({
      category: "Psychological Coercion",
      severity: "HIGH" as const,
      evidence: `Urgency marker: "${u}"`,
      detail: "Cognitive vulnerability exploitation",
    })),
    ...ocrFeatures.credentialKeywords.map((k) => ({
      category: "Credential Harvester",
      severity: "CRITICAL" as const,
      evidence: `Direct request for "${k}"`,
      detail: "High-risk data exfiltration risk",
    })),
  ];

  if (isQrSuspicious && qrScan?.notes) {
    signals.push({
      category: "QR Vector",
      severity: "CRITICAL" as const,
      evidence: qrScan.notes,
      detail: "Passive QR payload analysis",
    });
  }

  // 7. Assemble Structured Threat Assessment
  const assessment: ThreatAssessment = {
    id: `scan-${Date.now()}`,
    timestamp: new Date().toISOString(),
    verdict: riskResult.verdict,
    riskScore: riskResult.score,
    confidence: modelAssessment.confidence || riskResult.confidence,
    primaryCategory: modelAssessment.primaryCategory,
    threatTypes: modelAssessment.threatTypes,
    summary: modelAssessment.summary,
    scoreBreakdown: riskResult.breakdown,
    signals,
    socialEngineering: modelAssessment.socialEngineering,
    visualIndicators: modelAssessment.visualIndicators,
    digitalIndicators: digitalReport.indicators,
    attackPattern: modelAssessment.attackPattern,
    explanations: modelAssessment.explanations,
    recommendations: modelAssessment.recommendations,
    metadata: {
      modelUsed: `Gemma 4 (${config.gemmaModel}) via ${provider.name}`,
      processingTimeMs: Date.now() - startTime,
      ocrExtractedLength: combinedText.length,
      detectedLanguage: ocrFeatures.detectedLanguage,
      deterministicFlagCount: digitalReport.suspiciousReasons.length,
      qrDecoded: Boolean(input.qrPayload),
      qrPayload: input.qrPayload,
    },
  };

  return assessment;
}
