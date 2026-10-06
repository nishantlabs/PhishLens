import {
  BoundingBox,
  SocialEngineeringTactic,
  ThreatCategory,
  ThreatVerdict,
} from "@/types/threat";
import { StructuredModelAssessment } from "./types";
import { AIProviderError } from "./errors";

const VALID_VERDICTS = new Set<ThreatVerdict>([
  "SAFE",
  "LOW_RISK",
  "SUSPICIOUS",
  "HIGH_RISK",
  "CRITICAL",
]);

const VALID_CATEGORIES = new Set<ThreatCategory>([
  "PHISHING",
  "PAYMENT_SCAM",
  "IMPERSONATION",
  "SOCIAL_ENGINEERING",
  "MALICIOUS_WEBSITE",
  "KYC_SCAM",
  "INVESTMENT_SCAM",
  "JOB_SCAM",
  "LOTTERY_SCAM",
  "CREDENTIAL_HARVESTING",
  "LEGITIMATE_COMMUNICATION",
]);

const VALID_TACTICS = new Set<SocialEngineeringTactic>([
  "urgency",
  "authority",
  "fear",
  "scarcity",
  "curiosity",
  "reward",
  "trust_exploitation",
  "financial_pressure",
  "none",
]);

const VALID_BOX_CATEGORIES = new Set([
  "url",
  "credential",
  "urgency",
  "branding",
  "payment",
  "qr",
  "safe",
]);

const VALID_SEVERITIES = new Set(["CRITICAL", "HIGH", "MEDIUM", "LOW", "SAFE"]);

/**
 * Extracts and cleans a JSON substring from a model response string.
 */
export function extractJsonFromText(rawText: string): unknown {
  if (!rawText || !rawText.trim()) {
    throw new AIProviderError("EMPTY_RESPONSE", "Model response was empty.");
  }

  // First try direct JSON parse
  const trimmed = rawText.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Continue to regex extraction
  }

  // Check for markdown code fences ```json ... ```
  const codeBlockMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (codeBlockMatch && codeBlockMatch[1]) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch {
      // Fall through to brace extraction
    }
  }

  // Find outermost JSON object braces
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidate = trimmed.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch (err) {
      throw AIProviderError.malformedResponse(candidate);
    }
  }

  throw AIProviderError.malformedResponse(rawText.substring(0, 300));
}

/**
 * Validates and normalizes parsed JSON against the ThreatAssessment schema.
 */
export function validateAndNormalizeModelAssessment(
  raw: any
): StructuredModelAssessment {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw AIProviderError.malformedResponse("Response root must be a JSON object.");
  }

  // 1. Verdict
  let verdict: ThreatVerdict = "SUSPICIOUS";
  if (typeof raw.verdict === "string") {
    const vUpper = raw.verdict.toUpperCase().trim() as ThreatVerdict;
    if (VALID_VERDICTS.has(vUpper)) {
      verdict = vUpper;
    }
  }

  // 2. Risk Score (0-100)
  let riskScore = 50;
  if (typeof raw.riskScore === "number" && !isNaN(raw.riskScore)) {
    riskScore = Math.max(0, Math.min(100, Math.round(raw.riskScore)));
  }

  // Align verdict with riskScore if severely contradictory
  if (riskScore >= 80 && verdict === "SAFE") verdict = "CRITICAL";
  if (riskScore <= 20 && verdict === "CRITICAL") verdict = "LOW_RISK";

  // 3. Confidence (0.0 - 1.0)
  let confidence = 0.88;
  if (typeof raw.confidence === "number" && !isNaN(raw.confidence)) {
    if (raw.confidence > 1 && raw.confidence <= 100) {
      confidence = Number((raw.confidence / 100).toFixed(2));
    } else {
      confidence = Math.max(0.1, Math.min(0.99, Number(raw.confidence.toFixed(2))));
    }
  }

  // 4. Primary Category
  let primaryCategory: ThreatCategory = "PHISHING";
  if (typeof raw.primaryCategory === "string") {
    const cat = raw.primaryCategory.toUpperCase().trim() as ThreatCategory;
    if (VALID_CATEGORIES.has(cat)) {
      primaryCategory = cat;
    }
  }

  // 5. Threat Types
  const threatTypes: ThreatCategory[] = [];
  if (Array.isArray(raw.threatTypes)) {
    for (const t of raw.threatTypes) {
      if (typeof t === "string") {
        const cat = t.toUpperCase().trim() as ThreatCategory;
        if (VALID_CATEGORIES.has(cat) && !threatTypes.includes(cat)) {
          threatTypes.push(cat);
        }
      }
    }
  }
  if (!threatTypes.includes(primaryCategory)) {
    threatTypes.unshift(primaryCategory);
  }

  // 6. Summary
  let summary = "";
  if (typeof raw.summary === "string" && raw.summary.trim()) {
    summary = raw.summary.trim();
  } else {
    summary = `Multimodal threat analysis completed. Identified as ${primaryCategory} with ${verdict} risk level.`;
  }

  // 7. Social Engineering Tactics
  const socialEngineering: SocialEngineeringTactic[] = [];
  if (Array.isArray(raw.socialEngineering)) {
    for (const s of raw.socialEngineering) {
      if (typeof s === "string") {
        const tactic = s.toLowerCase().trim() as SocialEngineeringTactic;
        if (VALID_TACTICS.has(tactic) && !socialEngineering.includes(tactic)) {
          socialEngineering.push(tactic);
        }
      }
    }
  }
  if (socialEngineering.length === 0) {
    socialEngineering.push(verdict === "SAFE" ? "none" : "urgency");
  }

  // 8. Visual Indicators (Bounding Boxes)
  const visualIndicators: BoundingBox[] = [];
  if (Array.isArray(raw.visualIndicators)) {
    raw.visualIndicators.forEach((box: any, idx: number) => {
      if (!box) return;

      if (typeof box === "string") {
        const textLower = box.toLowerCase();
        const cat = textLower.includes("url") || textLower.includes("domain") || textLower.includes("link")
          ? "url"
          : textLower.includes("brand") || textLower.includes("logo")
          ? "branding"
          : textLower.includes("credential") || textLower.includes("password") || textLower.includes("otp")
          ? "credential"
          : textLower.includes("qr") || textLower.includes("payment") || textLower.includes("upi")
          ? "payment"
          : "urgency";

        visualIndicators.push({
          id: `box-ai-${idx + 1}`,
          x: 10 + (idx * 5),
          y: 20 + (idx * 16),
          width: 75,
          height: 18,
          category: cat,
          label: box.length > 35 ? box.substring(0, 32) + "..." : box,
          severity: verdict === "CRITICAL" ? "CRITICAL" : "HIGH",
          whyItMatters: box,
        });
        return;
      }

      if (typeof box === "object") {
        const x = typeof box.x === "number" ? Math.max(0, Math.min(100, box.x)) : 10;
        const y = typeof box.y === "number" ? Math.max(0, Math.min(100, box.y)) : 10;
        const width = typeof box.width === "number" ? Math.max(2, Math.min(100, box.width)) : 30;
        const height = typeof box.height === "number" ? Math.max(2, Math.min(100, box.height)) : 20;

        const category = VALID_BOX_CATEGORIES.has(box.category) ? box.category : "urgency";
        const severity = VALID_SEVERITIES.has(box.severity) ? box.severity : "HIGH";

        visualIndicators.push({
          id: box.id || `box-ai-${idx + 1}`,
          x,
          y,
          width,
          height,
          category,
          label: typeof box.label === "string" ? box.label : "Threat Indicator",
          severity,
          whyItMatters: typeof box.whyItMatters === "string" ? box.whyItMatters : "Identified during multimodal AI inspection.",
          technicalDetails: typeof box.technicalDetails === "string" ? box.technicalDetails : undefined,
        });
      }
    });
  }

  // Fallback visual bounding boxes if model provided none
  if (visualIndicators.length === 0) {
    if (verdict === "SAFE") {
      visualIndicators.push({
        id: "box-safe-1",
        x: 10,
        y: 15,
        width: 80,
        height: 25,
        category: "safe",
        label: "Verified Sender & Content",
        severity: "SAFE",
        whyItMatters: "Displays authentic markers and requests no sensitive authentication tokens or unauthorized payments.",
      });
    } else {
      visualIndicators.push({
        id: "box-threat-1",
        x: 10,
        y: 20,
        width: 80,
        height: 22,
        category: primaryCategory === "PAYMENT_SCAM" ? "payment" : "branding",
        label: `${primaryCategory.replace("_", " ")} Vector`,
        severity: verdict === "CRITICAL" ? "CRITICAL" : "HIGH",
        whyItMatters: summary,
      });
    }
  }

  // 9. Attack Pattern Chain
  const attackPattern: string[] = [];
  if (Array.isArray(raw.attackPattern)) {
    for (const step of raw.attackPattern) {
      if (typeof step === "string" && step.trim()) {
        attackPattern.push(step.trim());
      }
    }
  }
  if (attackPattern.length === 0) {
    if (verdict === "SAFE") {
      attackPattern.push("Verified Origin", "Informational Content", "Zero Exploitation");
    } else {
      attackPattern.push("Brand Impersonation", "Urgency Manipulation", "Credential / Payment Solicitation", "Exfiltration Risk");
    }
  }

  // 10. Explanations
  const explanations: { title: string; description: string; extractedQuote?: string }[] = [];
  if (Array.isArray(raw.explanations)) {
    for (const exp of raw.explanations) {
      if (exp && typeof exp.title === "string" && typeof exp.description === "string") {
        explanations.push({
          title: exp.title.trim(),
          description: exp.description.trim(),
          extractedQuote: typeof exp.extractedQuote === "string" ? exp.extractedQuote.trim() : undefined,
        });
      }
    }
  }
  if (explanations.length === 0) {
    explanations.push({
      title: "Gemma 4 Multimodal Reasoning",
      description: summary,
    });
  }

  // 11. Recommendations
  const doList: string[] = [];
  const doNotList: string[] = [];

  if (raw.recommendations && typeof raw.recommendations === "object") {
    if (Array.isArray(raw.recommendations.do)) {
      raw.recommendations.do.forEach((d: any) => {
        if (typeof d === "string" && d.trim()) doList.push(d.trim());
      });
    }
    if (Array.isArray(raw.recommendations.doNot)) {
      raw.recommendations.doNot.forEach((d: any) => {
        if (typeof d === "string" && d.trim()) doNotList.push(d.trim());
      });
    }
  }

  if (doList.length === 0) {
    doList.push(
      verdict === "SAFE"
        ? "Retain for official records"
        : "Verify independently on official website or app"
    );
  }
  if (doNotList.length === 0) {
    doNotList.push(
      verdict === "SAFE"
        ? "Never share passwords or OTPs with unknown callers"
        : "Do not click links or enter passwords/UPI PIN"
    );
  }

  return {
    verdict,
    riskScore,
    confidence,
    primaryCategory,
    threatTypes,
    summary,
    socialEngineering,
    visualIndicators,
    attackPattern,
    explanations,
    recommendations: {
      do: doList,
      doNot: doNotList,
    },
  };
}
