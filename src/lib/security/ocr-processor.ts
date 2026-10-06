import { SocialEngineeringTactic } from "@/types/threat";

export interface OcrExtractionResult {
  rawText: string;
  detectedLanguage: string;
  isMixedLanguage: boolean;
  socialTactics: SocialEngineeringTactic[];
  credentialKeywords: string[];
  urgencyIndicators: string[];
  paymentKeywords: string[];
}

export function analyzeTextFeatures(text: string): OcrExtractionResult {
  const lower = text.toLowerCase();
  const tactics: Set<SocialEngineeringTactic> = new Set();
  const credentialKeywords: string[] = [];
  const urgencyIndicators: string[] = [];
  const paymentKeywords: string[] = [];

  // Language detection (Devanagari script detection for Hindi/Marathi)
  const devanagariRegex = /[\u0900-\u097F]/;
  const hasDevanagari = devanagariRegex.test(text);
  const hasEnglish = /[a-zA-Z]/.test(text);

  let detectedLanguage = "English";
  let isMixedLanguage = false;

  if (hasDevanagari && hasEnglish) {
    detectedLanguage = "Hinglish (Mixed Hindi & English)";
    isMixedLanguage = true;
  } else if (hasDevanagari) {
    // Check Marathi specific markers like 'आहे', 'करा', 'झाले' vs Hindi 'होगा', 'करें'
    if (/आहे|करा|झाले|पाहिजे|खाते/i.test(text)) {
      detectedLanguage = "Marathi (मराठी)";
    } else {
      detectedLanguage = "Hindi (हिंदी)";
    }
  }

  // 1. Urgency & Fear Check
  const urgencyTerms = [
    { term: '24 hours', pattern: /24\s*(hours?|hrs?|घंटे|तास)/i },
    { term: 'immediate', pattern: /immediate(ly)?|तुरंत|तात्काळ|त्वरित/i },
    { term: 'suspended', pattern: /suspend(ed)?|blocked|deactivated|बंद|अवरोधित/i },
    { term: 'expire', pattern: /expir(ed?|ing)|समाप्त|मुदत/i },
    { term: 'electricity will be disconnected', pattern: /electricity|power\s*cut|light\s*bill|बिजली\s*कट|विद्युत/i },
    { term: 'urgent', pattern: /urgent|urgent action|critical notice/i },
    { term: 'legal action', pattern: /legal\s*action|police|fir|court|arrest/i },
  ];

  for (const item of urgencyTerms) {
    if (item.pattern.test(lower)) {
      urgencyIndicators.push(item.term);
      tactics.add('urgency');
      tactics.add('fear');
    }
  }

  // 2. Authority & Impersonation Check
  const authorityTerms = [
    /state bank|sbi|hdfc|icici|rbi|reserve bank|income tax|cbi|police|customs|telecom|trai|department/i,
    /govt of india|cyber cell|ministry|uidai|aadhaar|pan card/i
  ];
  for (const pattern of authorityTerms) {
    if (pattern.test(lower)) {
      tactics.add('authority');
      tactics.add('trust_exploitation');
      break;
    }
  }

  // 3. Credential Harvesting Check
  const credTerms = [
    { kw: 'password', regex: /password|passcode|पासवर्ड/i },
    { kw: 'otp', regex: /\botp\b|one\s*time\s*password|ओटीपी/i },
    { kw: 'cvv', regex: /\bcvv\b|security\s*code|card\s*number/i },
    { kw: 'netbanking login', regex: /netbanking|user\s*id|customer\s*id|credentials/i },
    { kw: 'upi pin', regex: /upi\s*pin|mpin|पिन/i },
    { kw: 'kyc document', regex: /kyc\s*update|aadhaar\s*number|pan\s*card/i },
  ];

  for (const item of credTerms) {
    if (item.regex.test(lower)) {
      credentialKeywords.push(item.kw);
    }
  }

  // 4. Reward / Scarcity / Investment Check
  const rewardTerms = [
    { kw: 'lottery/prize', regex: /lottery|won\s*\$|won\s*₹|congratulations|crore|prize/i },
    { kw: 'guaranteed return', regex: /daily\s*profit|guaranteed\s*return|part-time\s*job|earn\s*daily/i },
    { kw: 'refund', regex: /refund|cashback|claim\s*reward/i },
  ];

  for (const item of rewardTerms) {
    if (item.regex.test(lower)) {
      paymentKeywords.push(item.kw);
      tactics.add('reward');
    }
  }

  // 5. Financial Pressure
  if (/fine|penalty|bill\s*pending|payment\s*failed|penalty\s*of/i.test(lower)) {
    tactics.add('financial_pressure');
  }

  return {
    rawText: text,
    detectedLanguage,
    isMixedLanguage,
    socialTactics: Array.from(tactics),
    credentialKeywords,
    urgencyIndicators,
    paymentKeywords
  };
}
