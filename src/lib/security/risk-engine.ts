import { ScoreContribution, ThreatVerdict } from "@/types/threat";

export interface RiskCalculationInput {
  credentialHarvestingDetected: boolean;
  urgencyManipulationDetected: boolean;
  brandImpersonationDetected: boolean;
  suspiciousUrlDetected: boolean;
  paymentManipulationDetected: boolean;
  qrThreatDetected: boolean;
  visualInconsistencyDetected: boolean;
  punycodeOrIpDetected: boolean;
  isLegitimateDomainVerified: boolean;
  noSensitiveDataRequested: boolean;
  modelRiskAssessment?: number;
}

export interface RiskCalculationResult {
  score: number;
  verdict: ThreatVerdict;
  confidence: number;
  breakdown: ScoreContribution[];
}

export function calculateRiskScore(input: RiskCalculationInput): RiskCalculationResult {
  const breakdown: ScoreContribution[] = [];
  let rawScore = 0;

  // 1. Credential harvesting (+25)
  if (input.credentialHarvestingDetected) {
    const pts = 25;
    rawScore += pts;
    breakdown.push({
      name: "Credential Harvesting Vectors",
      score: pts,
      category: "textual",
      description: "Direct solicitation of passwords, OTP tokens, NetBanking PINs, or card CVVs."
    });
  }

  // 2. Brand Impersonation (+20)
  if (input.brandImpersonationDetected) {
    const pts = 20;
    rawScore += pts;
    breakdown.push({
      name: "Brand & Authority Impersonation",
      score: pts,
      category: "visual",
      description: "Visual or textual mimicry of reputable institutions (banks, government, logistics)."
    });
  }

  // 3. Urgency & Psychological Coercion (+15)
  if (input.urgencyManipulationDetected) {
    const pts = 15;
    rawScore += pts;
    breakdown.push({
      name: "Urgency Manipulation",
      score: pts,
      category: "behavioral",
      description: "Artificial deadline ('within 24 hours', immediate disconnect) designed to bypass critical thinking."
    });
  }

  // 4. Suspicious URL / Domain (+17)
  if (input.suspiciousUrlDetected) {
    const pts = 17;
    rawScore += pts;
    breakdown.push({
      name: "Suspicious Destination / TLD",
      score: pts,
      category: "digital",
      description: "Disposable top-level domain, deceptive subdomains, or unverified routing path."
    });
  }

  // 5. Payment / QR Manipulation (+15)
  if (input.paymentManipulationDetected || input.qrThreatDetected) {
    const pts = input.qrThreatDetected ? 18 : 12;
    rawScore += pts;
    breakdown.push({
      name: input.qrThreatDetected ? "Deceptive QR Payment Code" : "Unsolicited Payment Trigger",
      score: pts,
      category: "digital",
      description: "Embedded UPI collect link or fake refund payment interface."
    });
  }

  // 6. Punycode or IP host (+15)
  if (input.punycodeOrIpDetected) {
    const pts = 15;
    rawScore += pts;
    breakdown.push({
      name: "Homograph / Direct-IP Evasion",
      score: pts,
      category: "deterministic",
      description: "Punycode domain mimicry or raw IP server routing."
    });
  }

  // 7. Visual UI Inconsistencies (+12)
  if (input.visualInconsistencyDetected) {
    const pts = 12;
    rawScore += pts;
    breakdown.push({
      name: "Multimodal Visual Anomalies",
      score: pts,
      category: "visual",
      description: "Disproportionate logos, fake trust badges, or spoofed OS notification shell."
    });
  }

  // If AI model provided a risk assessment, blend it cleanly with deterministic weights
  if (input.modelRiskAssessment !== undefined) {
    // 60% deterministic signals + 40% multimodal Gemma 4 reasoning
    rawScore = Math.round((rawScore * 0.6) + (input.modelRiskAssessment * 0.4));
  }

  // Safe dampening factors
  if (input.isLegitimateDomainVerified && !input.credentialHarvestingDetected) {
    const deduction = -35;
    rawScore += deduction;
    breakdown.push({
      name: "Verified Official Origin",
      score: deduction,
      category: "deterministic",
      description: "Sender cryptographic signatures or official top-level domain verified."
    });
  }

  if (input.noSensitiveDataRequested && rawScore < 40) {
    const deduction = -10;
    rawScore += deduction;
    breakdown.push({
      name: "Zero Credential / Fund Request",
      score: deduction,
      category: "behavioral",
      description: "Interaction contains purely informational or authorized transactional receipt data."
    });
  }

  // Clamp normalized score between 0 and 100
  const normalizedScore = Math.max(2, Math.min(99, rawScore));

  // Determine verdict category
  let verdict: ThreatVerdict = 'SAFE';
  if (normalizedScore > 80) {
    verdict = 'CRITICAL';
  } else if (normalizedScore > 60) {
    verdict = 'HIGH_RISK';
  } else if (normalizedScore > 40) {
    verdict = 'SUSPICIOUS';
  } else if (normalizedScore > 20) {
    verdict = 'LOW_RISK';
  } else {
    verdict = 'SAFE';
  }

  // Confidence is calculated from agreement across signals
  const signalCount = breakdown.length;
  const confidence = Math.min(0.98, Math.max(0.85, 0.82 + (signalCount * 0.025)));

  return {
    score: normalizedScore,
    verdict,
    confidence: Number(confidence.toFixed(2)),
    breakdown
  };
}
