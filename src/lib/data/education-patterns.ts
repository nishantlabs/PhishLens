export interface ScamEducationPattern {
  id: string;
  tactic: string;
  name: string;
  psychology: string;
  whyVictimsFall: string;
  howToSpot: string[];
  realWorldExample: string;
  countermeasure: string;
  severityLevel: "CRITICAL" | "HIGH" | "MEDIUM";
}

export const EDUCATION_PATTERNS: ScamEducationPattern[] = [
  {
    id: "urgency",
    tactic: "Urgency Manipulation",
    name: "Artificial Time Compression",
    psychology: "Urgency triggers the brain's amygdala (fight-or-flight), disabling the prefrontal cortex where analytical and critical reasoning occurs.",
    whyVictimsFall: "When people believe they have only minutes or hours ('within 24 hours', 'immediate action'), they panic and skip validation steps.",
    howToSpot: [
      "Explicit deadlines: 'Within 24 hours', 'Before midnight', 'Expires in 15 mins'",
      "Words like 'URGENT', 'IMMEDIATE', 'ACTION REQUIRED NOW'",
      "Threats of irreversible consequences like account deletion or power cutoff"
    ],
    realWorldExample: "'Dear Customer, your electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Call officer immediately.'",
    countermeasure: "Enforce a mandatory 10-minute pause. Legitimate institutions give weeks of formal notice before taking punitive action.",
    severityLevel: "CRITICAL"
  },
  {
    id: "authority",
    tactic: "Authority Impersonation",
    name: "The Milgram Obedience Exploitation",
    psychology: "Humans are conditioned from childhood to comply with authority figures (banks, law enforcement, income tax officers, court judges).",
    whyVictimsFall: "Questioning a legitimate government agency or bank feels risky. Scammers exploit this fear of non-compliance.",
    howToSpot: [
      "Official-looking logos and stamps copied without authorization",
      "Mentions of legal acts: 'Under RBI guidelines', 'Income Tax notice Section 148', 'CBI cyber cell arrest warrant'",
      "Demands to resolve legal or regulatory matters over WhatsApp or private phone calls"
    ],
    realWorldExample: "'CBI Cyber Crime Cell: A parcel containing contraband has been intercepted in your name. Connect on video call to verify.'",
    countermeasure: "Never accept inbound authority claims. Hang up and verify through an official publicly listed government/bank switchboard.",
    severityLevel: "CRITICAL"
  },
  {
    id: "fear",
    tactic: "Fear & Loss Aversion",
    name: "Loss Aversion Bias (Kahneman-Tversky)",
    psychology: "Psychologically, people feel the pain of losing something roughly twice as intensely as the pleasure of gaining an equal amount.",
    whyVictimsFall: "Fear of losing an active bank account, facing a police complaint, or having electricity cut off overrules rationality.",
    howToSpot: [
      "Language threatening arrest, penalty fees, or asset seizure",
      "False alerts of unauthorized access or impending account blocks",
      "Intimidation tactics instructing the victim not to tell family or bank staff"
    ],
    realWorldExample: "'Your SIM card has been blocked due to KYC non-compliance. Call telecom manager within 2 hours or permanent FIR will be lodged.'",
    countermeasure: "Recognize that fear is the attacker's weapon. If a digital interaction makes your heart race, it is almost certainly a scam.",
    severityLevel: "HIGH"
  },
  {
    id: "reward",
    tactic: "Greed & Reward Exploitation",
    name: "Dopamine-Driven Optimization Fallacy",
    psychology: "The anticipation of effortless financial reward triggers dopamine surges, inducing a cognitive blind spot toward obvious red flags.",
    whyVictimsFall: "The desire for easy money or unexpected good luck makes victims rationalize irregularities as 'good fortune'.",
    howToSpot: [
      "Unexpected prizes, lotteries, or high-value gift cards",
      "Unrealistic part-time job offers: 'Earn ₹5,000–₹8,000 daily from home'",
      "Guaranteed crypto trading returns or secret investment algorithms"
    ],
    realWorldExample: "'Congratulations! Your PhonePe account has been selected for ₹15,000 festival cashback. Scan QR to credit your bank.'",
    countermeasure: "Remember the fundamental law: 'If it sounds too good to be true, it is always a scam.' No stranger gives away free money on the internet.",
    severityLevel: "HIGH"
  },
  {
    id: "trust_exploitation",
    tactic: "Trust & Platform Exploitation",
    name: "Transferred Credibility",
    psychology: "Victims inherently trust recognized brands (Microsoft, Google, SBI, India Post, WhatsApp). Scammers cloak themselves in that trust.",
    whyVictimsFall: "The human eye spots the familiar logo and automatically assumes the communication is authorized and safe.",
    howToSpot: [
      "Familiar logos displayed on non-official URLs (e.g., sbi-update.xyz or login.microsoft-token.cfd)",
      "Generic greetings like 'Dear Customer' instead of your registered name",
      "Inconsistencies in typography, low-resolution imagery, or missing HTTPS encryption"
    ],
    realWorldExample: "A Microsoft login popup displaying the genuine 4-color Microsoft logo, but hosted on an unverified third-party cloud domain.",
    countermeasure: "Always inspect the root domain name in the address bar before typing passwords or authorization tokens.",
    severityLevel: "CRITICAL"
  },
  {
    id: "scarcity",
    tactic: "Scarcity & FOMO",
    name: "Fear of Missing Out (FOMO)",
    psychology: "Scarcity creates perceived value. When items or opportunities are portrayed as rare or rapidly vanishing, decision speed increases.",
    whyVictimsFall: "Victims worry they will forfeit a life-changing opportunity if they take time to consult others.",
    howToSpot: [
      "'Only 3 slots remaining!'",
      "'Joining bonus valid for the first 50 applicants only'",
      "Countdown timers ticking down on payment or sign-up pages"
    ],
    realWorldExample: "'Pre-IPO shares allocated to your PAN number. Only 12 hours left to claim before allocation reverts to general pool.'",
    countermeasure: "Any investment opportunity that forbids you from taking 24 hours to think is predatory.",
    severityLevel: "MEDIUM"
  }
];
