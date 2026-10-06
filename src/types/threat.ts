export type ThreatVerdict = 'SAFE' | 'LOW_RISK' | 'SUSPICIOUS' | 'HIGH_RISK' | 'CRITICAL';

export type ThreatCategory = 
  | 'PHISHING' 
  | 'PAYMENT_SCAM' 
  | 'IMPERSONATION' 
  | 'SOCIAL_ENGINEERING' 
  | 'MALICIOUS_WEBSITE' 
  | 'KYC_SCAM' 
  | 'INVESTMENT_SCAM' 
  | 'JOB_SCAM' 
  | 'LOTTERY_SCAM'
  | 'CREDENTIAL_HARVESTING'
  | 'LEGITIMATE_COMMUNICATION';

export type SocialEngineeringTactic = 
  | 'urgency' 
  | 'authority' 
  | 'fear' 
  | 'scarcity' 
  | 'curiosity' 
  | 'reward' 
  | 'trust_exploitation' 
  | 'financial_pressure'
  | 'none';

export interface BoundingBox {
  id: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  width: number; // percentage 0 - 100
  height: number; // percentage 0 - 100
  category: 'url' | 'credential' | 'urgency' | 'branding' | 'payment' | 'qr' | 'safe';
  label: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  whyItMatters: string;
  technicalDetails?: string;
}

export interface ScoreContribution {
  name: string;
  score: number;
  category: 'visual' | 'textual' | 'digital' | 'behavioral' | 'deterministic';
  description: string;
}

export interface ThreatSignal {
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  evidence: string;
  detail: string;
}

export interface DigitalIndicator {
  type: 'url' | 'domain' | 'email' | 'phone' | 'qr' | 'upi' | 'form';
  value: string;
  isSuspicious: boolean;
  notes: string;
}

export interface ThreatAssessment {
  id: string;
  timestamp: string;
  verdict: ThreatVerdict;
  riskScore: number; // 0 - 100
  confidence: number; // 0.0 - 1.0 (e.g. 0.94)
  primaryCategory: ThreatCategory;
  threatTypes: ThreatCategory[];
  summary: string;
  
  // Layered evidence
  scoreBreakdown: ScoreContribution[];
  signals: ThreatSignal[];
  socialEngineering: SocialEngineeringTactic[];
  visualIndicators: BoundingBox[];
  digitalIndicators: DigitalIndicator[];
  attackPattern: string[]; // e.g. ["Impersonation", "Urgency Manipulation", "Credential Request", "Malicious Destination"]
  
  // Explainable AI
  explanations: {
    title: string;
    description: string;
    extractedQuote?: string;
  }[];
  
  // Recommendations
  recommendations: {
    do: string[];
    doNot: string[];
  };

  // Technical metadata
  metadata: {
    modelUsed: string;
    processingTimeMs: number;
    ocrExtractedLength: number;
    detectedLanguage: string;
    deterministicFlagCount: number;
    qrDecoded: boolean;
    qrPayload?: string;
  };

  // User feedback on assessment
  feedback?: 'CORRECT' | 'INCORRECT';
}

export interface ScanHistoryItem {
  id: string;
  timestamp: string;
  imageUrl?: string;
  filename: string;
  fileType: string;
  verdict: ThreatVerdict;
  riskScore: number;
  primaryCategory: ThreatCategory;
  summary: string;
  confidence: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  category: ThreatCategory;
  description: string;
  platform: 'Banking' | 'WhatsApp' | 'SMS' | 'Email' | 'Payment/UPI' | 'Govt' | 'OAuth/Login' | 'Legitimate';
  isLegitimate: boolean;
  imageUrl: string;
  mockResult: ThreatAssessment;
}
