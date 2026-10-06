import { DemoScenario } from "@/types/threat";

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "demo-bank-login",
    title: "Fake Bank NetBanking Login",
    category: "PHISHING",
    description: "Spoofed NetBanking portal harvesting customer ID, password, and transaction OTP with fake SSL badge.",
    platform: "Banking",
    isLegitimate: false,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='750' viewBox='0 0 600 750' fill='%230f172a'><rect width='600' height='750' fill='%230b0f19'/><rect x='20' y='20' width='560' height='60' rx='8' fill='%231e293b'/><circle cx='45' cy='50' r='6' fill='%23ef4444'/><circle cx='65' cy='50' r='6' fill='%23f59e0b'/><circle cx='85' cy='50' r='6' fill='%2310b981'/><rect x='110' y='36' width='380' height='28' rx='6' fill='%230f172a'/><text x='125' y='55' fill='%2394a3b8' font-family='monospace' font-size='12'>http://sbi-secure.netbanking-verify.xyz/login</text><rect x='50' y='110' width='500' height='80' rx='8' fill='%231e3a8a'/><text x='75' y='155' fill='white' font-family='sans-serif' font-weight='bold' font-size='22'>STATE BANK OF INDIA - NETBANKING</text><text x='75' y='175' fill='%2393c5fd' font-family='sans-serif' font-size='12'>Official Online Portal | Urgent Security Re-verification</text><rect x='50' y='220' width='500' height='480' rx='12' fill='%23131b2e' stroke='%23334155'/><text x='80' y='260' fill='%23f87171' font-family='sans-serif' font-weight='bold' font-size='16'>CRITICAL: Your account is locked due to pending KYC!</text><text x='80' y='285' fill='%2394a3b8' font-family='sans-serif' font-size='13'>Please login below within 24 hours to prevent permanent deactivation.</text><text x='80' y='335' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>User ID / Customer ID</text><rect x='80' y='345' width='440' height='45' rx='6' fill='%230b0f19' stroke='%23475569'/><text x='95' y='373' fill='%2364748b' font-family='sans-serif' font-size='14'>Enter 11-digit CIF Number</text><text x='80' y='425' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>NetBanking Password</text><rect x='80' y='435' width='440' height='45' rx='6' fill='%230b0f19' stroke='%23475569'/><text x='95' y='463' fill='%2364748b' font-family='sans-serif' font-size='14'>••••••••••••••••</text><text x='80' y='515' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>Mobile Number linked with OTP</text><rect x='80' y='525' width='440' height='45' rx='6' fill='%230b0f19' stroke='%23475569'/><text x='95' y='553' fill='%2364748b' font-family='sans-serif' font-size='14'>+91 98XXXXXXXX</text><rect x='80' y='600' width='440' height='50' rx='8' fill='%232563eb'/><text x='230' y='632' fill='white' font-family='sans-serif' font-weight='bold' font-size='16'>VERIFY NOW</text><text x='200' y='680' fill='%2364748b' font-family='sans-serif' font-size='11'>256-Bit SSL Encrypted Verification Portal</text></svg>",
    mockResult: {
      id: "demo-bank-login-res",
      timestamp: new Date().toISOString(),
      verdict: "CRITICAL",
      riskScore: 94,
      confidence: 0.97,
      primaryCategory: "PHISHING",
      threatTypes: ["PHISHING", "IMPERSONATION", "CREDENTIAL_HARVESTING"],
      summary: "High-consequence banking credential harvesting site spoofing State Bank of India with disposable .xyz domain and artificial KYC urgency.",
      scoreBreakdown: [
        { name: "Direct Password & CIF Harvesting", score: 25, category: "textual", description: "Collects CIF number, plain text password and OTP." },
        { name: "State Bank Brand Impersonation", score: 20, category: "visual", description: "Clones official SBI banner, typography, and fake trust badges." },
        { name: "Deceptive TLD & Domain (.xyz)", score: 17, category: "digital", description: "Hosted on netbanking-verify.xyz rather than official onlinesbi.sbi." },
        { name: "Artificial 24h Countdown Coercion", score: 15, category: "behavioral", description: "Threatens immediate account lockout to induce panic." },
        { name: "Fake 256-Bit SSL Trust Badge", score: 17, category: "visual", description: "Manipulates victim confidence using counterfeit security seals." }
      ],
      signals: [
        { category: "Digital/URL", severity: "CRITICAL", evidence: "Host is netbanking-verify.xyz (registered via anonymity provider)", detail: "Domain mismatch" },
        { category: "Credential", severity: "CRITICAL", evidence: "Input fields for Customer ID, Password, and SMS OTP", detail: "Exfiltration vector" },
        { category: "Psychology", severity: "HIGH", evidence: "Claims 'Your account is locked due to pending KYC'", detail: "Fear appeal" }
      ],
      socialEngineering: ["urgency", "authority", "fear", "trust_exploitation"],
      visualIndicators: [
        {
          id: "v1",
          x: 18,
          y: 4.8,
          width: 64,
          height: 4.5,
          category: "url",
          label: "Suspicious Domain (netbanking-verify.xyz)",
          severity: "CRITICAL",
          whyItMatters: "Legitimate SBI portals only reside on onlinesbi.sbi or sbi.co.in. The .xyz TLD is a known scam host."
        },
        {
          id: "v2",
          x: 8.3,
          y: 14.6,
          width: 83.3,
          height: 10.6,
          category: "branding",
          label: "Cloned Brand Header",
          severity: "HIGH",
          whyItMatters: "Replicates official bank styling to create an illusion of security and bypass initial scrutiny."
        },
        {
          id: "v3",
          x: 13.3,
          y: 34.6,
          width: 73.3,
          height: 6.6,
          category: "urgency",
          label: "Fake Account Lockout Threat",
          severity: "CRITICAL",
          whyItMatters: "Pressures victim to act within 24 hours before checking bank statements or contacting branch managers."
        },
        {
          id: "v4",
          x: 13.3,
          y: 44.5,
          width: 73.3,
          height: 33,
          category: "credential",
          label: "Full Credential Harvesting Inputs",
          severity: "CRITICAL",
          whyItMatters: "Directly collects User ID, password, and mobile number to execute unauthorized funds transfer."
        }
      ],
      digitalIndicators: [
        { type: "url", value: "http://sbi-secure.netbanking-verify.xyz/login", isSuspicious: true, notes: "Unencrypted HTTP link on unauthorized .xyz domain." },
        { type: "domain", value: "netbanking-verify.xyz", isSuspicious: true, notes: "Not registered to State Bank of India." },
        { type: "form", value: "CIF / Password / OTP Collection", isSuspicious: true, notes: "Direct credential submission endpoint." }
      ],
      attackPattern: ["Bank Impersonation", "Urgency/Account Lock Threat", "Credential Harvesting Form", "Account Takeover"],
      explanations: [
        {
          title: "1. Fake Security Threat",
          description: "Scammers falsely claim the account is locked to trigger panic, suppressing the user's natural caution.",
          extractedQuote: "Your account is locked due to pending KYC!"
        },
        {
          title: "2. Domain Identity Fraud",
          description: "The URL bar shows 'netbanking-verify.xyz' rather than the verified domain 'onlinesbi.sbi'.",
          extractedQuote: "http://sbi-secure.netbanking-verify.xyz"
        },
        {
          title: "3. Direct Credential Harvesting",
          description: "The form prompts for secret authentication details including login credentials and OTP.",
          extractedQuote: "CIF Number & NetBanking Password"
        }
      ],
      recommendations: {
        do: [
          "Close this tab immediately.",
          "Visit onlinesbi.sbi directly by typing it in your browser address bar.",
          "Report this phishing URL to report.phishing@sbi.co.in and cybercrime.gov.in."
        ],
        doNot: [
          "DO NOT enter your CIF number, user ID, or password.",
          "DO NOT provide any SMS OTP received on your mobile.",
          "DO NOT trust security claims on unauthorized domains."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 460,
        ocrExtractedLength: 320,
        detectedLanguage: "English",
        deterministicFlagCount: 3,
        qrDecoded: false
      }
    }
  },
  {
    id: "demo-kyc-sms",
    title: "Fake KYC Hinglish SMS",
    category: "KYC_SCAM",
    description: "Mixed Hindi-English text message warning that account will be closed unless KYC is updated via bit.ly link.",
    platform: "SMS",
    isLegitimate: false,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='550' viewBox='0 0 600 550' fill='%230f172a'><rect width='600' height='550' fill='%23090d16'/><rect x='30' y='30' width='540' height='70' rx='12' fill='%23131c2e'/><circle cx='65' cy='65' r='20' fill='%233b82f6'/><text x='60' y='72' fill='white' font-family='sans-serif' font-weight='bold' font-size='18'>S</text><text x='100' y='60' fill='white' font-family='sans-serif' font-weight='bold' font-size='16'>VM-SBINB (SMS)</text><text x='100' y='80' fill='%2364748b' font-family='sans-serif' font-size='12'>Today 11:42 AM</text><rect x='30' y='130' width='540' height='370' rx='16' fill='%231a2333' stroke='%23334155'/><text x='60' y='180' fill='%23f1f5f9' font-family='sans-serif' font-size='16' font-weight='600'>Dear Customer,</text><text x='60' y='220' fill='%23fca5a5' font-family='sans-serif' font-size='17' font-weight='bold'>Your SBI Account बंद हो जाएगा within 24 hours!</text><text x='60' y='265' fill='%23cbd5e1' font-family='sans-serif' font-size='15'>Aadhaar &amp; PAN card update is mandatory as per RBI.</text><text x='60' y='300' fill='%23cbd5e1' font-family='sans-serif' font-size='15'>Click link below to complete e-KYC verification immediately:</text><rect x='60' y='330' width='480' height='55' rx='8' fill='%230f172a' stroke='%233b82f6'/><text x='80' y='365' fill='%2360a5fa' font-family='monospace' font-size='15' font-weight='bold'>https://bit.ly/sbi-kyc-update-pan24</text><text x='60' y='425' fill='%2394a3b8' font-family='sans-serif' font-size='13'>Otherwise your NetBanking &amp; ATM services will be suspended.</text><text x='60' y='465' fill='%2364748b' font-family='sans-serif' font-size='12'>Helpline: +91 98321 09844 | SBI Support Team</text></svg>",
    mockResult: {
      id: "demo-kyc-sms-res",
      timestamp: new Date().toISOString(),
      verdict: "CRITICAL",
      riskScore: 92,
      confidence: 0.95,
      primaryCategory: "KYC_SCAM",
      threatTypes: ["KYC_SCAM", "PHISHING", "SOCIAL_ENGINEERING"],
      summary: "Classic Indian Hinglish KYC scam leveraging RBI fear triggers, shortened bit.ly URL, and rogue mobile helpline.",
      scoreBreakdown: [
        { name: "PAN / Aadhaar Credential Harvesting", score: 25, category: "textual", description: "Sollicits Aadhaar and PAN update under false mandate." },
        { name: "Hinglish Urgency Manipulation", score: 15, category: "behavioral", description: "Uses mixed language 'बंद हो जाएगा within 24 hours' to provoke panic." },
        { name: "URL Shortener Masking", score: 15, category: "digital", description: "bit.ly link obfuscates true external malicious destination." },
        { name: "RBI / SBI Authority Mimicry", score: 20, category: "behavioral", description: "Falsely invokes Reserve Bank of India regulatory authority." },
        { name: "Rogue Phone Redirection", score: 17, category: "digital", description: "Supplies private 10-digit mobile number as bank helpline." }
      ],
      signals: [
        { category: "Language", severity: "HIGH", evidence: "Mixed Hindi/English (Hinglish): 'Your SBI Account बंद हो जाएगा'", detail: "Localized scam tactic" },
        { category: "Digital", severity: "CRITICAL", evidence: "Obfuscated URL: bit.ly/sbi-kyc-update-pan24", detail: "Redirection risk" },
        { category: "Coercion", severity: "HIGH", evidence: "Threat of ATM/NetBanking suspension within 24 hours", detail: "Scarcity & Fear" }
      ],
      socialEngineering: ["urgency", "authority", "fear", "trust_exploitation"],
      visualIndicators: [
        {
          id: "v1",
          x: 10,
          y: 35,
          width: 80,
          height: 12,
          category: "urgency",
          label: "Hinglish Threat of Deactivation",
          severity: "CRITICAL",
          whyItMatters: "Language designed specifically to alarm Indian bank customers with sudden account closure."
        },
        {
          id: "v2",
          x: 10,
          y: 60,
          width: 80,
          height: 12,
          category: "url",
          label: "Bitly Shortened Link",
          severity: "CRITICAL",
          whyItMatters: "Banks never send Bit.ly shortened links for confidential KYC updates."
        },
        {
          id: "v3",
          x: 10,
          y: 83,
          width: 80,
          height: 10,
          category: "payment",
          label: "Fraudulent Mobile Helpline",
          severity: "HIGH",
          whyItMatters: "A 10-digit mobile number manned by scammers impersonating bank staff."
        }
      ],
      digitalIndicators: [
        { type: "url", value: "https://bit.ly/sbi-kyc-update-pan24", isSuspicious: true, notes: "Shortened link redirecting to unknown external server." },
        { type: "phone", value: "+91 98321 09844", isSuspicious: true, notes: "Private mobile number, not official SBI toll-free number (1800 1234)." }
      ],
      attackPattern: ["SMS Spoofing", "Hinglish Urgency Trigger", "Shortened Link Evasion", "KYC Identity Exfiltration"],
      explanations: [
        {
          title: "1. Artificial 24-Hour Expiration",
          description: "RBI mandates that banks never deactivate accounts abruptly via SMS without formal written notices and grace periods.",
          extractedQuote: "Your SBI Account बंद हो जाएगा within 24 hours!"
        },
        {
          title: "2. Obfuscated Destination Link",
          description: "The bit.ly link hides the actual destination server, which collects PAN and Aadhaar details.",
          extractedQuote: "https://bit.ly/sbi-kyc-update-pan24"
        },
        {
          title: "3. Non-Official Contact Number",
          description: "Official banks provide national 1800 toll-free lines, never random mobile numbers.",
          extractedQuote: "Helpline: +91 98321 09844"
        }
      ],
      recommendations: {
        do: [
          "Delete the SMS.",
          "Check KYC status only inside the SBI YONO official app.",
          "Report the sender number to the 1930 Cyber Fraud Helpline."
        ],
        doNot: [
          "Never click shortened links received via SMS.",
          "Never share OTP or PAN details over web links.",
          "Never dial back the number in the SMS."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 410,
        ocrExtractedLength: 285,
        detectedLanguage: "Hinglish (Mixed Hindi & English)",
        deterministicFlagCount: 2,
        qrDecoded: false
      }
    }
  },
  {
    id: "demo-india-post",
    title: "India Post Failed Delivery Phishing",
    category: "IMPERSONATION",
    description: "Delivery failure SMS claiming parcel is held at depot due to incomplete address, requiring ₹48 redelivery fee.",
    platform: "SMS",
    isLegitimate: false,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='550' viewBox='0 0 600 550' fill='%230f172a'><rect width='600' height='550' fill='%230c101c'/><rect x='30' y='30' width='540' height='70' rx='12' fill='%23192236'/><rect x='50' y='45' width='40' height='40' rx='8' fill='%23dc2626'/><text x='63' y='71' fill='white' font-family='sans-serif' font-weight='bold' font-size='20'>IP</text><text x='105' y='60' fill='white' font-family='sans-serif' font-weight='bold' font-size='16'>India Post Notification</text><text x='105' y='80' fill='%2364748b' font-family='sans-serif' font-size='12'>Sender: AX-POSTAL | Today 09:15 AM</text><rect x='30' y='130' width='540' height='380' rx='16' fill='%23162033' stroke='%23334155'/><text x='60' y='180' fill='%23e2e8f0' font-family='sans-serif' font-size='16' font-weight='600'>[India Post Tracking Service]</text><text x='60' y='220' fill='%23f87171' font-family='sans-serif' font-size='16' font-weight='bold'>Important Notice: Package ID #IN-94827104</text><text x='60' y='260' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>Your consignment could not be delivered due to incomplete street address.</text><text x='60' y='295' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>Item is scheduled to be returned to sender within 12 hours.</text><text x='60' y='340' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>Update correct address and pay nominal redelivery fee (₹48):</text><rect x='60' y='360' width='480' height='50' rx='8' fill='%230f172a' stroke='%23dc2626'/><text x='80' y='392' fill='%23fca5a5' font-family='monospace' font-size='14' font-weight='bold'>http://indiapost-parcel-tracking.top/update</text><text x='60' y='450' fill='%2394a3b8' font-family='sans-serif' font-size='12'>*Failure to respond will incur parcel abandonment fee of ₹500.</text></svg>",
    mockResult: {
      id: "demo-india-post-res",
      timestamp: new Date().toISOString(),
      verdict: "HIGH_RISK",
      riskScore: 88,
      confidence: 0.94,
      primaryCategory: "IMPERSONATION",
      threatTypes: ["IMPERSONATION", "PAYMENT_SCAM", "PHISHING"],
      summary: "India Post parcel delivery scam luring victims with small ₹48 fee to harvest credit/debit card numbers on disposable .top domain.",
      scoreBreakdown: [
        { name: "India Post Government Mimicry", score: 20, category: "visual", description: "Exploits trusted national postal service name and parcel context." },
        { name: "Disposable .top Domain", score: 18, category: "digital", description: "Uses indiapost-parcel-tracking.top rather than indiapost.gov.in." },
        { name: "Address Update & Micro-Payment Trap", score: 25, category: "textual", description: "Requests ₹48 fee to harvest complete debit card details & OTP." },
        { name: "12-Hour Return Threat", score: 15, category: "behavioral", description: "Accelerates panic with parcel abandonment penalty threats." },
        { name: "Passive Card Skimmer", score: 10, category: "digital", description: "Checkout page captures CVV and expiry." }
      ],
      signals: [
        { category: "Digital/URL", severity: "CRITICAL", evidence: "Domain indiapost-parcel-tracking.top is not a gov.in domain", detail: "Government spoofing" },
        { category: "Behavioral", severity: "HIGH", evidence: "Threatens parcel return and ₹500 abandonment fee", detail: "Loss aversion" },
        { category: "Financial", severity: "HIGH", evidence: "Nominal fee trap (₹48) to capture card credentials", detail: "Micro-charge trick" }
      ],
      socialEngineering: ["urgency", "authority", "fear", "scarcity"],
      visualIndicators: [
        {
          id: "v1",
          x: 10,
          y: 38,
          width: 80,
          height: 14,
          category: "urgency",
          label: "12-Hour Return Countdown",
          severity: "HIGH",
          whyItMatters: "Pressures recipient into fast compliance before questioning whether they even ordered a package."
        },
        {
          id: "v2",
          x: 10,
          y: 65,
          width: 80,
          height: 12,
          category: "url",
          label: "Non-Government .top Domain",
          severity: "CRITICAL",
          whyItMatters: "India Post exclusively operates on indiapost.gov.in. Any other domain suffix is fraudulent."
        }
      ],
      digitalIndicators: [
        { type: "domain", value: "indiapost-parcel-tracking.top", isSuspicious: true, notes: "Not registered to Department of Posts, Government of India." },
        { type: "url", value: "http://indiapost-parcel-tracking.top/update", isSuspicious: true, notes: "Insecure HTTP destination." }
      ],
      attackPattern: ["Courier Impersonation", "Delivery Exception Urgency", "Micro-Payment Trap", "Card Harvesting"],
      explanations: [
        {
          title: "1. Fake Domain Impersonation",
          description: "All official Indian government portals strictly use the .gov.in top-level domain. This site uses .top.",
          extractedQuote: "indiapost-parcel-tracking.top"
        },
        {
          title: "2. The ₹48 Micro-Payment Trap",
          description: "Scammers ask for small amounts like ₹48 or ₹25 so victims don't hesitate, but the form steals entire card details.",
          extractedQuote: "nominal redelivery fee (₹48)"
        }
      ],
      recommendations: {
        do: [
          "Check parcel tracking solely on www.indiapost.gov.in.",
          "Check your actual e-commerce orders to see if any shipment is active."
        ],
        doNot: [
          "Do not enter card details or UPI credentials on this site.",
          "Do not download any APK file offered on the update page."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 380,
        ocrExtractedLength: 240,
        detectedLanguage: "English",
        deterministicFlagCount: 2,
        qrDecoded: false
      }
    }
  },
  {
    id: "demo-qr-scam",
    title: "QR Code Payment / Cashback Scam",
    category: "PAYMENT_SCAM",
    description: "Fraudulent OLX/Marketplace buyer sending QR code claiming 'Scan to receive ₹15,000 payment'.",
    platform: "Payment/UPI",
    isLegitimate: false,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='680' viewBox='0 0 600 680' fill='%230f172a'><rect width='600' height='680' fill='%230a0f1d'/><rect x='30' y='30' width='540' height='620' rx='16' fill='%23141e33' stroke='%23334155'/><text x='60' y='75' fill='%2338bdf8' font-family='sans-serif' font-weight='bold' font-size='20'>PHONEPE / GOOGLEPAY INSTANT CASHBACK</text><text x='60' y='105' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>Approved Transaction ID: #TXN-8829104</text><rect x='60' y='130' width='480' height='80' rx='10' fill='%2310b981' fill-opacity='0.15' stroke='%2310b981'/><text x='85' y='165' fill='%2334d399' font-family='sans-serif' font-weight='bold' font-size='18'>CLAIM APPROVED CASHBACK: ₹15,000</text><text x='85' y='190' fill='%23cbd5e1' font-family='sans-serif' font-size='13'>Sender: Merchant Refund Services (Auto-Deposit)</text><rect x='160' y='235' width='280' height='280' rx='12' fill='white'/><rect x='185' y='260' width='60' height='60' fill='black'/><rect x='195' y='270' width='40' height='40' fill='white'/><rect x='205' y='280' width='20' height='20' fill='black'/><rect x='355' y='260' width='60' height='60' fill='black'/><rect x='365' y='270' width='40' height='40' fill='white'/><rect x='375' y='280' width='20' height='20' fill='black'/><rect x='185' y='430' width='60' height='60' fill='black'/><rect x='195' y='440' width='40' height='40' fill='white'/><rect x='205' y='450' width='20' height='20' fill='black'/><circle cx='300' cy='375' r='25' fill='%233b82f6'/><text x='293' y='382' fill='white' font-family='sans-serif' font-weight='bold' font-size='18'>₹</text><text x='60' y='550' fill='%23f87171' font-family='sans-serif' font-weight='bold' font-size='15'>INSTRUCTIONS: SCAN QR &amp; ENTER UPI PIN TO RECEIVE MONEY</text><text x='60' y='580' fill='%2394a3b8' font-family='sans-serif' font-size='13'>Valid for 15 minutes only. Do not cancel the transfer.</text><text x='60' y='615' fill='%2364748b' font-family='sans-serif' font-size='11'>UPI ID: cashback-dept882@okaxis | Powered by NPCI</text></svg>",
    mockResult: {
      id: "demo-qr-scam-res",
      timestamp: new Date().toISOString(),
      verdict: "CRITICAL",
      riskScore: 96,
      confidence: 0.98,
      primaryCategory: "PAYMENT_SCAM",
      threatTypes: ["PAYMENT_SCAM", "SOCIAL_ENGINEERING"],
      summary: "High-risk UPI payment manipulation scam falsely asserting that entering a UPI PIN is required to 'receive' money.",
      scoreBreakdown: [
        { name: "Reverse UPI QR Collect Fraud", score: 25, category: "digital", description: "QR code triggers an outgoing debit payment rather than credit." },
        { name: "UPI PIN Misrepresentation", score: 25, category: "textual", description: "Fraudulently claims entering PIN receives money (fundamental UPI rule violation)." },
        { name: "Deceptive VPA Handle", score: 20, category: "digital", description: "VPA 'cashback-dept882@okaxis' designed to simulate official clearing." },
        { name: "Urgency Timer (15 Minutes)", score: 15, category: "behavioral", description: "Restricts victim response window to disable consultation." },
        { name: "Fake NPCI Trust Seal", score: 11, category: "visual", description: "Unauthorized use of NPCI / PhonePe / Google Pay marks." }
      ],
      signals: [
        { category: "UPI Mechanics", severity: "CRITICAL", evidence: "Claims 'ENTER UPI PIN TO RECEIVE MONEY'", detail: "Fatal scam indicator" },
        { category: "QR Analysis", severity: "CRITICAL", evidence: "QR contains upi://pay debit request for ₹15,000", detail: "Direct fund loss" },
        { category: "Psychology", severity: "HIGH", evidence: "Unsolicited ₹15,000 cashback reward", detail: "Greed/Reward bias" }
      ],
      socialEngineering: ["reward", "urgency", "trust_exploitation"],
      visualIndicators: [
        {
          id: "v1",
          x: 26,
          y: 34,
          width: 48,
          height: 42,
          category: "qr",
          label: "Debit Payment QR Code Trap",
          severity: "CRITICAL",
          whyItMatters: "Scanning this QR code in any UPI app will prompt for PIN to DEDUCT ₹15,000 from your bank account."
        },
        {
          id: "v2",
          x: 10,
          y: 80,
          width: 80,
          height: 8,
          category: "credential",
          label: "Fatal Deception: 'ENTER PIN TO RECEIVE'",
          severity: "CRITICAL",
          whyItMatters: "UPI PIN is NEVER required to receive money. PIN is strictly used to AUTHORIZE DEBITS."
        }
      ],
      digitalIndicators: [
        { type: "qr", value: "upi://pay?pa=cashback-dept882@okaxis&am=15000&tn=Cashback", isSuspicious: true, notes: "Configured to debit ₹15,000 from victim." },
        { type: "upi", value: "cashback-dept882@okaxis", isSuspicious: true, notes: "Private rogue VPA posing as cashback department." }
      ],
      attackPattern: ["Fake Cashback Bait", "Rogue Debit QR Generation", "PIN Inversion Deception", "Immediate Account Drain"],
      explanations: [
        {
          title: "1. Golden Rule of UPI Violated",
          description: "You NEVER need to enter your UPI PIN to receive money. Entering your PIN ALWAYS sends money.",
          extractedQuote: "ENTER UPI PIN TO RECEIVE MONEY"
        },
        {
          title: "2. Debit QR Disguised as Credit",
          description: "The QR code is configured as a collect request targeting your bank account for ₹15,000.",
          extractedQuote: "upi://pay?pa=cashback-dept882@okaxis"
        }
      ],
      recommendations: {
        do: [
          "Report the user/seller immediately on the platform.",
          "Block the UPI ID 'cashback-dept882@okaxis' on your payment app."
        ],
        doNot: [
          "NEVER scan this QR code with Google Pay, PhonePe, or Paytm.",
          "NEVER enter your UPI PIN under any circumstance."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 440,
        ocrExtractedLength: 310,
        detectedLanguage: "English",
        deterministicFlagCount: 3,
        qrDecoded: true,
        qrPayload: "upi://pay?pa=cashback-dept882@okaxis&am=15000&tn=Refund"
      }
    }
  },
  {
    id: "demo-electricity-bill",
    title: "Fake Electricity Bill Disconnection Notice",
    category: "SOCIAL_ENGINEERING",
    description: "Urgent night-time disconnection message threatening power cut tonight at 9:30 PM unless official is called.",
    platform: "SMS",
    isLegitimate: false,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='550' viewBox='0 0 600 550' fill='%230f172a'><rect width='600' height='550' fill='%230a0d18'/><rect x='30' y='30' width='540' height='70' rx='12' fill='%23172136'/><rect x='50' y='45' width='40' height='40' rx='8' fill='%23eab308'/><text x='62' y='72' fill='black' font-family='sans-serif' font-weight='bold' font-size='22'>⚡</text><text x='105' y='60' fill='white' font-family='sans-serif' font-weight='bold' font-size='16'>Electricity Power Board (Urgent)</text><text x='105' y='80' fill='%2364748b' font-family='sans-serif' font-size='12'>Sender: +91 87291 93810 | Today 18:20</text><rect x='30' y='130' width='540' height='380' rx='16' fill='%23172033' stroke='%23334155'/><text x='60' y='180' fill='%23f87171' font-family='sans-serif' font-size='17' font-weight='bold'>Dear Consumer,</text><text x='60' y='220' fill='%23ef4444' font-family='sans-serif' font-size='17' font-weight='bold'>Your Electricity power will be disconnected tonight at 9:30 PM</text><text x='60' y='265' fill='%23cbd5e1' font-family='sans-serif' font-size='15'>Because your previous month bill was not updated in system.</text><text x='60' y='305' fill='%23f59e0b' font-family='sans-serif' font-size='15' font-weight='600'>Please immediately contact our electricity officer to avoid blackout:</text><rect x='60' y='330' width='480' height='60' rx='8' fill='%230f172a' stroke='%23eab308'/><text x='80' y='368' fill='%23fef08a' font-family='monospace' font-size='16' font-weight='bold'>Call Officer: +91 79082 11943</text><text x='60' y='430' fill='%23cbd5e1' font-family='sans-serif' font-size='13'>Download QuickSupport app if advised by officer for bill sync.</text><text x='60' y='465' fill='%2364748b' font-family='sans-serif' font-size='12'>State Electricity Distribution Corporation Ltd.</text></svg>",
    mockResult: {
      id: "demo-electricity-bill-res",
      timestamp: new Date().toISOString(),
      verdict: "HIGH_RISK",
      riskScore: 89,
      confidence: 0.96,
      primaryCategory: "SOCIAL_ENGINEERING",
      threatTypes: ["SOCIAL_ENGINEERING", "IMPERSONATION"],
      summary: "Widespread Indian electricity disconnection scam exploiting evening fear of blackout to trigger remote-access malware (QuickSupport).",
      scoreBreakdown: [
        { name: "Night-Time Power Cut Blackmail", score: 25, category: "behavioral", description: "Threatens 9:30 PM power cutoff to produce immediate household distress." },
        { name: "Remote Access App Lure", score: 20, category: "digital", description: "References QuickSupport / AnyDesk to take over phone." },
        { name: "State DISCOM Impersonation", score: 20, category: "visual", description: "Poses as State Electricity Distribution Corporation." },
        { name: "Personal Mobile Contact Vector", score: 15, category: "digital", description: "Channels victim to direct scam call center." },
        { name: "Off-Hours Pressure", score: 9, category: "behavioral", description: "Sent in evening when official offices are closed." }
      ],
      signals: [
        { category: "Psychology", severity: "CRITICAL", evidence: "Power disconnect threatened tonight at 9:30 PM", detail: "Fear induction" },
        { category: "Malware Vector", severity: "HIGH", evidence: "Urges downloading QuickSupport remote tool", detail: "Device takeover" },
        { category: "Identity", severity: "HIGH", evidence: "Sent from unverified personal mobile number", detail: "Spoofing" }
      ],
      socialEngineering: ["urgency", "fear", "authority"],
      visualIndicators: [
        {
          id: "v1",
          x: 10,
          y: 38,
          width: 80,
          height: 12,
          category: "urgency",
          label: "Immediate Blackout Threat",
          severity: "CRITICAL",
          whyItMatters: "Scammers deliberately threaten immediate power cuts in the evening so victims cannot verify with utility offices."
        },
        {
          id: "v2",
          x: 10,
          y: 60,
          width: 80,
          height: 12,
          category: "payment",
          label: "Rogue 'Officer' Mobile Number",
          severity: "HIGH",
          whyItMatters: "Utility companies do not ask consumers to call individual mobile numbers to resolve billing issues."
        }
      ],
      digitalIndicators: [
        { type: "phone", value: "+91 79082 11943", isSuspicious: true, notes: "Unregistered mobile used to execute screen-sharing fraud." },
        { type: "phone", value: "+91 87291 93810", isSuspicious: true, notes: "Sender mobile number." }
      ],
      attackPattern: ["DISCOM Impersonation", "Evening Blackout Fear", "Phone Call Manipulation", "Remote Access Screen Hijack"],
      explanations: [
        {
          title: "1. Calculated Evening Panic",
          description: "Utility providers never disconnect power at night without issuing statutory 15-day notice letters.",
          extractedQuote: "disconnected tonight at 9:30 PM"
        },
        {
          title: "2. The Remote Access Trap",
          description: "Once the victim calls, scammers instruct them to install remote screen-sharing tools (AnyDesk, QuickSupport) to drain bank accounts.",
          extractedQuote: "Download QuickSupport app"
        }
      ],
      recommendations: {
        do: [
          "Check your electricity bill status on your official state DISCOM portal or electricity app.",
          "Ignore and block the phone number."
        ],
        doNot: [
          "NEVER call the mobile number in the message.",
          "NEVER install QuickSupport, AnyDesk, or TeamViewer at the instruction of a stranger."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 405,
        ocrExtractedLength: 265,
        detectedLanguage: "English",
        deterministicFlagCount: 2,
        qrDecoded: false
      }
    }
  },
  {
    id: "demo-legitimate-receipt",
    title: "Legitimate Bank Transaction SMS",
    category: "LEGITIMATE_COMMUNICATION",
    description: "Authentic HDFC Bank debit transaction alert with verifiable toll-free customer support and zero credential requests.",
    platform: "Legitimate",
    isLegitimate: true,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='480' viewBox='0 0 600 480' fill='%230f172a'><rect width='600' height='480' fill='%230b0f19'/><rect x='30' y='30' width='540' height='70' rx='12' fill='%23131c2e'/><circle cx='65' cy='65' r='20' fill='%23059669'/><text x='58' y='72' fill='white' font-family='sans-serif' font-weight='bold' font-size='18'>H</text><text x='105' y='60' fill='white' font-family='sans-serif' font-weight='bold' font-size='16'>HDFC Bank Alerts (Official)</text><text x='105' y='80' fill='%2364748b' font-family='sans-serif' font-size='12'>Sender: BZ-HDFCBK | Verified Sender Header</text><rect x='30' y='130' width='540' height='300' rx='16' fill='%23131d2e' stroke='%23334155'/><text x='60' y='175' fill='%23cbd5e1' font-family='sans-serif' font-size='15'>Rs 2,450.00 debited from A/C **8912</text><text x='60' y='210' fill='%23cbd5e1' font-family='sans-serif' font-size='15'>at RELIANCE RETAIL LTD on 05-OCT-24 16:32:10.</text><text x='60' y='250' fill='%2394a3b8' font-family='sans-serif' font-size='14'>Avail Bal: Rs 48,120.45. Not you?</text><text x='60' y='290' fill='%2360a5fa' font-family='sans-serif' font-size='14'>Call 1800 202 6161 or SMS BLOCK 8912 to 5676712.</text><rect x='60' y='330' width='480' height='60' rx='8' fill='%23059669' fill-opacity='0.12' stroke='%23059669' stroke-opacity='0.3'/><text x='80' y='365' fill='%2334d399' font-family='sans-serif' font-size='13' font-weight='600'>✓ Verified Institutional Sender Header (BZ-HDFCBK)</text><text x='80' y='382' fill='%2394a3b8' font-family='sans-serif' font-size='12'>Official national toll-free number. No suspicious links or data requests.</text></svg>",
    mockResult: {
      id: "demo-legitimate-res",
      timestamp: new Date().toISOString(),
      verdict: "SAFE",
      riskScore: 12,
      confidence: 0.98,
      primaryCategory: "LEGITIMATE_COMMUNICATION",
      threatTypes: ["LEGITIMATE_COMMUNICATION"],
      summary: "Legitimate automated banking transaction notification. Verified sender header, authentic 1800 helpline, zero credential requests.",
      scoreBreakdown: [
        { name: "Verified Banking Sender ID (BZ-HDFCBK)", score: -35, category: "deterministic", description: "Registered TRAI DLT commercial telecom header." },
        { name: "Zero Sensitive Inquiries", score: -10, category: "behavioral", description: "No passwords, PINs, or confidential credentials requested." },
        { name: "Official National Toll-Free Helpline", score: -10, category: "digital", description: "Refers to verified bank fraud helpline (1800 202 6161)." },
        { name: "Standard Transactional Structure", score: 12, category: "textual", description: "Routine debit alert with balance update and timestamp." }
      ],
      signals: [
        { category: "Authenticity", severity: "INFO", evidence: "DLT Header BZ-HDFCBK matched to HDFC Bank Ltd", detail: "Legitimate origin" },
        { category: "Format", severity: "INFO", evidence: "Standard transactional debit notification", detail: "Benign interaction" }
      ],
      socialEngineering: ["none"],
      visualIndicators: [
        {
          id: "v1",
          x: 10,
          y: 28,
          width: 80,
          height: 25,
          category: "safe",
          label: "Authentic Transaction Record",
          severity: "SAFE",
          whyItMatters: "Contains standard masked account number (**8912), merchant name, and balance info."
        },
        {
          id: "v2",
          x: 10,
          y: 56,
          width: 80,
          height: 18,
          category: "safe",
          label: "Official Toll-Free Support",
          severity: "SAFE",
          whyItMatters: "Provides verified bank hotline 1800 202 6161 and official SMS shortcode 5676712."
        }
      ],
      digitalIndicators: [
        { type: "phone", value: "1800 202 6161", isSuspicious: false, notes: "Verified HDFC Bank toll-free customer support line." }
      ],
      attackPattern: ["Authorized Bank Notification", "Legitimate Debit Confirmation"],
      explanations: [
        {
          title: "1. Authentic Sender Verification",
          description: "The SMS origin matches Telecom Regulatory Authority of India (TRAI) registered DLT headers for HDFC Bank.",
          extractedQuote: "Sender: BZ-HDFCBK"
        },
        {
          title: "2. No External Links or Requests",
          description: "The notification does not include shortened links, payment QR codes, or requests for passwords.",
          extractedQuote: "No link included"
        }
      ],
      recommendations: {
        do: [
          "Keep this notification for your personal accounting.",
          "If you did not authorize this purchase, immediately dial the bank's toll-free number 1800 202 6161 to lock your card."
        ],
        doNot: [
          "Do not share transaction details with unverified third parties."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 290,
        ocrExtractedLength: 220,
        detectedLanguage: "English",
        deterministicFlagCount: 0,
        qrDecoded: false
      }
    }
  },
  {
    id: "demo-whatsapp-investment",
    title: "WhatsApp Part-Time Job / Crypto Scam",
    category: "INVESTMENT_SCAM",
    description: "WhatsApp DM offering ₹3,000–₹8,000 daily for YouTube video likes and VIP Telegram crypto trading signals.",
    platform: "WhatsApp",
    isLegitimate: false,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='580' viewBox='0 0 600 580' fill='%230f172a'><rect width='600' height='580' fill='%2308101a'/><rect x='30' y='30' width='540' height='70' rx='12' fill='%23075e54'/><circle cx='65' cy='65' r='20' fill='%23128c7e'/><text x='58' y='72' fill='white' font-family='sans-serif' font-weight='bold' font-size='18'>W</text><text x='105' y='60' fill='white' font-family='sans-serif' font-weight='bold' font-size='16'>+1 (415) 892-0941 (Recruiter Emily)</text><text x='105' y='80' fill='%23a7f3d0' font-family='sans-serif' font-size='12'>Online | International WhatsApp Number</text><rect x='30' y='130' width='540' height='410' rx='16' fill='%23142233' stroke='%23334155'/><text x='60' y='175' fill='%2334d399' font-family='sans-serif' font-size='16' font-weight='bold'>Hello! Are you looking for high income part-time job?</text><text x='60' y='210' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>Our global media marketing firm is hiring freelance reviewers in India.</text><text x='60' y='250' fill='%23fef08a' font-family='sans-serif' font-size='15' font-weight='bold'>Daily Salary: ₹3,000 to ₹8,500 (Guaranteed)</text><text x='60' y='285' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>Requirement: Just 30 minutes daily. Like YouTube videos &amp; earn.</text><text x='60' y='330' fill='%23cbd5e1' font-family='sans-serif' font-size='14'>We already paid ₹500 joining bonus to 4,200 candidates today.</text><text x='60' y='375' fill='%2360a5fa' font-family='sans-serif' font-size='14'>Contact VIP Manager on Telegram to collect your ₹500 bonus now:</text><rect x='60' y='395' width='480' height='50' rx='8' fill='%230f172a' stroke='%2338bdf8'/><text x='80' y='427' fill='%2338bdf8' font-family='monospace' font-size='15' font-weight='bold'>https://t.me/GlobalTradingVIP_Assistant</text><text x='60' y='485' fill='%2394a3b8' font-family='sans-serif' font-size='12'>*No experience required. Instant payout via UPI.*</text></svg>",
    mockResult: {
      id: "demo-whatsapp-investment-res",
      timestamp: new Date().toISOString(),
      verdict: "HIGH_RISK",
      riskScore: 86,
      confidence: 0.94,
      primaryCategory: "INVESTMENT_SCAM",
      threatTypes: ["INVESTMENT_SCAM", "SOCIAL_ENGINEERING", "JOB_SCAM"],
      summary: "Task-based work-from-home fraud luring victims with unrealistic daily wages and joining bonuses to funnel into high-loss Telegram investment schemes.",
      scoreBreakdown: [
        { name: "Unrealistic Guaranteed Returns", score: 25, category: "textual", description: "Promises ₹3,000-₹8,500 for trivial tasks like liking videos." },
        { name: "Telegram Tunneling Vector", score: 20, category: "digital", description: "Channels targets from WhatsApp to Telegram for untraceable extortion." },
        { name: "Scarcity & Joining Bonus Bait", score: 15, category: "behavioral", description: "Offers ₹500 instant bonus to lower scam skepticism." },
        { name: "Rogue International WhatsApp Account", score: 15, category: "digital", description: "VoIP virtual number (+1 415) contacting Indian users." },
        { name: "Social Proof Fabrication", score: 11, category: "behavioral", description: "Falsely claims '4,200 candidates paid today'." }
      ],
      signals: [
        { category: "Financial", severity: "CRITICAL", evidence: "Daily income promise ₹3,000–₹8,500 for liking videos", detail: "Task fraud" },
        { category: "Channel", severity: "HIGH", evidence: "Migration link to t.me/GlobalTradingVIP_Assistant", detail: "Telegram funnel" },
        { category: "Origin", severity: "HIGH", evidence: "Unsolicited contact from foreign virtual number (+1 415)", detail: "VoIP bot" }
      ],
      socialEngineering: ["reward", "scarcity", "curiosity", "financial_pressure"],
      visualIndicators: [
        {
          id: "v1",
          x: 10,
          y: 40,
          width: 80,
          height: 12,
          category: "payment",
          label: "Unrealistic Income Guarantee",
          severity: "CRITICAL",
          whyItMatters: "No legitimate business pays ₹8,500 daily for liking YouTube videos. Classic pyramid/task scam."
        },
        {
          id: "v2",
          x: 10,
          y: 68,
          width: 80,
          height: 12,
          category: "url",
          label: "Telegram Funnel Redirection",
          severity: "HIGH",
          whyItMatters: "Scammers move victims to Telegram groups where fake profit screenshots induce victims into depositing funds."
        }
      ],
      digitalIndicators: [
        { type: "phone", value: "+1 (415) 892-0941", isSuspicious: true, notes: "Foreign VoIP number used for bulk automated messaging." },
        { type: "url", value: "https://t.me/GlobalTradingVIP_Assistant", isSuspicious: true, notes: "Telegram channel endpoint." }
      ],
      attackPattern: ["Unsolicited WhatsApp Hook", "Instant Bonus Bait", "Telegram Group Migration", "Prepaid Task Extortion"],
      explanations: [
        {
          title: "1. The Task-Based Job Trap",
          description: "Victims are paid a nominal amount (₹150–₹500) initially to establish trust, then coerced to deposit larger sums for 'VIP tasks'.",
          extractedQuote: "Daily Salary: ₹3,000 to ₹8,500"
        },
        {
          title: "2. Channel Switching to Telegram",
          description: "Moving from WhatsApp to Telegram removes accountability and subjects victims to coordinated bot-driven social proof.",
          extractedQuote: "https://t.me/GlobalTradingVIP_Assistant"
        }
      ],
      recommendations: {
        do: [
          "Report and block the sender on WhatsApp.",
          "Warn friends and family about part-time video review scams."
        ],
        doNot: [
          "Never click the Telegram link.",
          "Never transfer money for 'security deposit' or 'prepaid merchant tasks'."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 430,
        ocrExtractedLength: 300,
        detectedLanguage: "English",
        deterministicFlagCount: 2,
        qrDecoded: false
      }
    }
  },
  {
    id: "demo-ms-oauth",
    title: "Fake Microsoft 365 Re-Authentication",
    category: "PHISHING",
    description: "Enterprise phishing screen mimicking Microsoft login with 'Session Expired' notice to hijack corporate credentials.",
    platform: "OAuth/Login",
    isLegitimate: false,
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='700' viewBox='0 0 600 700' fill='%230f172a'><rect width='600' height='700' fill='%230b0f19'/><rect x='20' y='20' width='560' height='55' rx='8' fill='%231e293b'/><circle cx='45' cy='47' r='6' fill='%23ef4444'/><circle cx='65' cy='47' r='6' fill='%23f59e0b'/><circle cx='85' cy='47' r='6' fill='%2310b981'/><rect x='110' y='33' width='410' height='28' rx='6' fill='%230f172a'/><text x='125' y='52' fill='%2394a3b8' font-family='monospace' font-size='12'>https://login.microsoftonline.security-token-sync.cfd</text><rect x='80' y='110' width='440' height='530' rx='12' fill='%23161f30' stroke='%23334155'/><rect x='120' y='150' width='18' height='18' fill='%23f25022'/><rect x='142' y='150' width='18' height='18' fill='%237fba00'/><rect x='120' y='172' width='18' height='18' fill='%2300a4ef'/><rect x='142' y='172' width='18' height='18' fill='%23ffb900'/><text x='175' y='172' fill='white' font-family='sans-serif' font-weight='600' font-size='22'>Microsoft</text><text x='120' y='225' fill='white' font-family='sans-serif' font-weight='bold' font-size='20'>Session Timed Out</text><text x='120' y='255' fill='%2394a3b8' font-family='sans-serif' font-size='13'>Your corporate session expired. Sign in to keep access to Outlook &amp; OneDrive.</text><text x='120' y='310' fill='%23cbd5e1' font-family='sans-serif' font-size='13'>Work, school, or personal account</text><rect x='120' y='325' width='360' height='42' rx='4' fill='%230b0f19' stroke='%2300a4ef'/><text x='135' y='352' fill='%23f8fafc' font-family='sans-serif' font-size='14'>employee@organization.com</text><text x='120' y='400' fill='%23cbd5e1' font-family='sans-serif' font-size='13'>Password</text><rect x='120' y='415' width='360' height='42' rx='4' fill='%230b0f19' stroke='%23475569'/><text x='135' y='442' fill='%2364748b' font-family='sans-serif' font-size='14'>••••••••••••</text><rect x='120' y='490' width='360' height='45' rx='4' fill='%230067b8'/><text x='270' y='518' fill='white' font-family='sans-serif' font-weight='600' font-size='15'>Sign In</text><text x='120' y='575' fill='%2364748b' font-family='sans-serif' font-size='12'>Terms of use | Privacy &amp; cookies</text></svg>",
    mockResult: {
      id: "demo-ms-oauth-res",
      timestamp: new Date().toISOString(),
      verdict: "CRITICAL",
      riskScore: 95,
      confidence: 0.97,
      primaryCategory: "PHISHING",
      threatTypes: ["PHISHING", "IMPERSONATION", "CREDENTIAL_HARVESTING"],
      summary: "Corporate credential harvesting page cloning Microsoft 365 login on disposable .cfd top-level domain.",
      scoreBreakdown: [
        { name: "Corporate Password Harvesting Form", score: 25, category: "textual", description: "Directly traps corporate email and Active Directory password." },
        { name: "Microsoft 4-Color Logo & UI Cloning", score: 20, category: "visual", description: "High-fidelity replica of genuine Microsoft Entra ID login." },
        { name: "Disposable .cfd Domain", score: 18, category: "digital", description: "Hosted on security-token-sync.cfd instead of login.microsoftonline.com." },
        { name: "Session Expiry Routine Coercion", score: 15, category: "behavioral", description: "Fabricates session timeout to make password re-entry feel expected." },
        { name: "Enterprise Impersonation", score: 17, category: "visual", description: "Mimics corporate SSO workflow." }
      ],
      signals: [
        { category: "Digital/URL", severity: "CRITICAL", evidence: "Host contains deceptive 'login.microsoftonline' prefix on .cfd domain", detail: "Subdomain spoofing" },
        { category: "Form", severity: "CRITICAL", evidence: "Password input targeting corporate enterprise credentials", detail: "Exfiltration target" }
      ],
      socialEngineering: ["authority", "urgency", "trust_exploitation"],
      visualIndicators: [
        {
          id: "v1",
          x: 18,
          y: 4.5,
          width: 70,
          height: 4.5,
          category: "url",
          label: "Subdomain Deception (.cfd)",
          severity: "CRITICAL",
          whyItMatters: "Uses 'login.microsoftonline' as a subdomain prefix to fool users who only glance at the start of the URL."
        },
        {
          id: "v2",
          x: 20,
          y: 20,
          width: 60,
          height: 10,
          category: "branding",
          label: "Cloned Microsoft Brand Asset",
          severity: "HIGH",
          whyItMatters: "Illegally mirrors authentic Microsoft 4-square icon and typography."
        },
        {
          id: "v3",
          x: 20,
          y: 45,
          width: 60,
          height: 32,
          category: "credential",
          label: "Enterprise Credential Stealer",
          severity: "CRITICAL",
          whyItMatters: "Captures corporate credentials allowing attackers to breach corporate email, Teams, and cloud storage."
        }
      ],
      digitalIndicators: [
        { type: "domain", value: "login.microsoftonline.security-token-sync.cfd", isSuspicious: true, notes: "Root domain is security-token-sync.cfd, not microsoft.com." },
        { type: "form", value: "Enterprise SSO Input", isSuspicious: true, notes: "Password field posts to foreign server." }
      ],
      attackPattern: ["SSO Brand Mimicry", "Subdomain Obfuscation", "Session Expiry Lure", "Enterprise Account Hijack"],
      explanations: [
        {
          title: "1. Clever Subdomain Spoofing",
          description: "Attackers prepend 'login.microsoftonline' to their own registered domain '.cfd' to deceive visual inspection.",
          extractedQuote: "security-token-sync.cfd"
        },
        {
          title: "2. Session Expiration Lure",
          description: "Routine notifications claiming 'Session Timed Out' trick employees who are accustomed to frequent re-authentication.",
          extractedQuote: "Your corporate session expired"
        }
      ],
      recommendations: {
        do: [
          "Report to your internal Security Operations Center (SOC) / IT helpdesk immediately.",
          "Check whether the domain ends in '.microsoft.com' or '.microsoftonline.com'."
        ],
        doNot: [
          "NEVER enter your corporate email password on this page.",
          "DO NOT approve any Authenticator number-matching push requests."
        ]
      },
      metadata: {
        modelUsed: "Gemma 4 Multimodal",
        processingTimeMs: 440,
        ocrExtractedLength: 290,
        detectedLanguage: "English",
        deterministicFlagCount: 2,
        qrDecoded: false
      }
    }
  }
];
