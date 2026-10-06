# PhishLens — Multimodal Phishing & Scam Detector
### *See the scam before you fall for it.*

> **Hackathon-Grade Multimodal AI Cybersecurity Platform powered by Google Gemma 4**  
> *Combines Multimodal AI + Computer Vision + Natural Language Processing + Spatial Threat Mapping + Deterministic Security + Explainable Risk Scoring.*

---

## 1. The Problem
Traditional phishing detection relies almost entirely on:
- URL blacklists & domain reputation databases
- Keyword filters
- Regular expressions

**Why traditional detectors fail:**
1. **Zero-Hour Phishing:** Modern attackers generate thousands of disposable domains (`.xyz`, `.top`, `.cfd`, direct IP addresses) that stay alive for only 2–4 hours—long before reputation blacklists update.
2. **Channel Hopping:** Real-world attacks happen via **WhatsApp screenshots, SMS messages, Hinglish KYC alerts, and QR codes**, where the user interacts visually with brand logos, urgent countdowns, and payment requests rather than clicking a simple hypertext link.
3. **The Reverse UPI / QR Trap:** Fraudsters send QR codes claiming *"Scan QR and enter your UPI PIN to receive ₹15,000 refund"*. URL scanners cannot inspect what is encoded inside a graphical QR code or understand that entering a PIN debits an account.
4. **Lack of Explainability:** Traditional firewalls show a generic *"This page was blocked"*. They do not teach users *why* the interaction was malicious or what cognitive manipulation technique was used.

---

## 2. The Solution
PhishLens introduces a paradigm shift:
> Traditional detectors ask: *“Is this URL suspicious?”*  
> **PhishLens asks: *“Does the entire interaction look like a scam?”***

PhishLens treats uploaded screenshots, messages, and QR codes as **multimodal security artifacts**. Powered by **Google Gemma 4**, it correlates visual layout, typography, cloned branding, linguistic urgency, and technical routing indicators into a unified, explainable threat report.

---

## 3. Why Multimodal AI & Why Gemma 4?

| Modality | What Traditional Tools See | What Gemma 4 Reasons Across |
|---|---|---|
| **Visual Signals** | Blind to images | Cloned State Bank / Microsoft logos, fake 256-bit SSL trust badges, disproportionate layouts |
| **Textual Signals** | Keyword matches ("password") | Psychological coercion: artificial 24h deadlines, fear of electricity blackout tonight, authority impersonation |
| **Digital Signals** | Domain string matching | Punycode homographs, subdomains like `login.microsoft.token.cfd`, raw IP hosts |
| **Behavioral Signals** | None | Exploit funnels: Impersonation ➔ Urgency ➔ Credential Solicitation ➔ Exfiltration |

**Why Gemma 4?**
- **Spatial Reasoning & Grounding:** Gemma 4 generates spatial bounding box coordinates across visual artifacts, enabling PhishLens's flagship **Spatial Threat Map**.
- **Multilingual & Hinglish Agility:** High accuracy parsing mixed-language Indian scam formats (e.g., *“Your SBI account बंद हो जाएगा within 24 hours”*).
- **Latency & Lightweight Footprint:** Delivers rapid sub-500ms inference for real-time security scanning.

---

## 4. Layered Defense Architecture

We never trust AI blindly. PhishLens fuses **multimodal AI with deterministic cryptographic and security checks**:

```text
                           USER
                            │
                            ▼
               SCREENSHOT / DIGITAL ARTIFACT
                            │
                            ▼
              ┌───────────────────────────┐
              │     INPUT PROCESSOR       │
              │  (Zero-Execution Memory)  │
              └─────────────┬─────────────┘
                            │
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
      OCR ENGINE       QR SCANNER     URL / DOMAIN
    (En / Hi / Mr)      (jsQR)         INSPECTOR
            │               │               │
            └───────────────┼───────────────┘
                            ▼
              ┌───────────────────────────┐
              │      GOOGLE GEMMA 4       │
              │  MULTIMODAL AI REASONING  │
              └─────────────┬─────────────┘
                            │
                            ▼
              ┌───────────────────────────┐
              │    DETERMINISTIC AGG.     │
              │    & RISK ENGINE (0-100)  │
              └─────────────┬─────────────┘
                            │
                            ▼
              ┌───────────────────────────┐
              │    EXPLAINABLE REPORT     │
              │  • Spatial Threat Map     │
              │  • Attack Pattern Chain   │
              │  • DO / DO NOT Protocol   │
              │  • Grounded "Ask Phish"   │
              └───────────────────────────┘
```

### Layered Pipeline:
1. **Layer 1 — Secure Ephemeral Ingestion:** MIME validation (PNG, JPG, WEBP, SVG), 10MB limit, zero execution.
2. **Layer 2 — OCR & Multilingual Lexical Analysis:** Extracts text across English, Hindi, and Marathi; identifies code-mixed Hinglish.
3. **Layer 3 — Passive QR & Digital Parser:** Passive `jsQR` decoding detects `upi://pay` debit requests and masked URLs.
4. **Layer 4 — Deterministic Security Engine:** Flags IP-based hosts, Punycode homographs, disposable TLDs (`.xyz`, `.top`, `.cfd`), URL shorteners, and fraudulent UPI VPA handles.
5. **Layer 5 — Gemma 4 Multimodal Reasoning:** Spatial object detection, brand verification, cognitive manipulation analysis.
6. **Layer 6 — Transparent Risk Engine:** Computes a normalized 0–100 score with exact point breakdowns (+25 Credentials, +20 Impersonation, +15 Urgency, +17 Suspicious URL).
7. **Layer 7 — Actionable Defense:** DO / DO NOT directives and grounded interactive Q&A.

---

## 5. Core Features

### 🗺️ 1. Interactive Spatial Threat Map
Highlights suspicious regions directly on the uploaded screenshot with color-coded severity:
- 🔴 **Red:** Credential harvesting fields & malicious URLs
- 🟠 **Amber:** Urgency manipulation & cloned branding
- 🟡 **Yellow:** Reverse UPI payment requests & QR code traps
- 🟢 **Green:** Verified authentic sender elements
*Click any highlighted region to view the "Why this matters" security breakdown.*

### 📊 2. Transparent 0–100 Risk Score
No black-box mystery numbers. Every score includes a detailed ledger:
- Direct Credential Harvesting: `+25`
- Authority & Brand Impersonation: `+20`
- Urgency Manipulation: `+15`
- Disposable TLD / URL Shortener: `+17`
- Deceptive QR Collect Request: `+18`
- Verified Official DLT Origin: `-35`

### ⚡ 3. Live Animated Scan Pipeline
Watch each backend inspection step run in real time:
`IMAGE RECEIVED` ➔ `OCR EXTRACTION` ➔ `VISUAL ANALYSIS` ➔ `GEMMA 4 REASONING` ➔ `THREAT SIGNAL EXTRACTION` ➔ `RISK ENGINE` ➔ `FINAL VERDICT`.

### 🇮🇳 4. India-Specific & Multilingual Threat Coverage
Pre-calibrated for high-volume Indian scam patterns:
- **UPI Reverse Collect Fraud:** Detects the fatal deception *"Enter UPI PIN to receive money"*.
- **Fake Electricity Disconnection:** Night-time blackout threats with rogue mobile numbers and QuickSupport APK traps.
- **Hinglish e-KYC Scams:** Multilingual deactivation warnings with Bitly links.
- **India Post Delivery Scams:** ₹48 redelivery traps on `.top` domains.
- **WhatsApp Task/Part-Time Job Scams:** Telegram crypto & YouTube review funnels.

### 🤖 5. Grounded "Ask PhishLens" Assistant
Interactive conversational AI conditioned strictly on the scan report. Ask:
- *"Why is this dangerous?"*
- *"What should I do right now?"*
- *"Does receiving a refund ever need my UPI PIN?"*

### 🏆 6. Judge Demo Mode (60–90 Second Guided Pitch)
Built-in presentation tour walking judges through the entire problem, an attack scenario, the Threat Map, the reverse UPI trap, and a legitimate baseline control.

### 🔬 7. Model Evaluation & Adversarial Benchmark
Empirical validation framework measuring **Accuracy, Precision, Recall, F1-Score, False Positive Rate, and False Negative Rate** with a live confusion matrix and adversarial stress-test lab.

---

## 6. Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.6
- **Styling:** Tailwind CSS with SOC Dark Cybersecurity theme
- **Primary AI Runtime:** Google AI Studio (Official `@google/genai` SDK)
- **Primary AI Reasoning Model:** Google Gemma 4 (`gemma-4-26b-a4b-it`)
- **AI Abstraction Layer:** Replaceable `AIProvider` (Google AI Cloud and local Ollama providers)
- **Computer Vision & QR:** `jsQR` (passive QR decoding)
- **Data Visualization:** `Recharts`
- **Icons:** `Lucide React`

---

## 7. Google AI Studio & Gemma 4 Setup

PhishLens connects directly to **Google AI Studio** using the official `@google/genai` SDK, running Google's **Gemma 4** (`gemma-4-26b-a4b-it`) as its primary multimodal reasoning engine.

### Architecture Overview:
```text
Browser (Frontend UI)
       │
       ▼
PhishLens Next.js API (/api/scan, /api/health/ai, /api/chat)
       │
       ▼
    AIProvider (Abstraction Layer)
       │
       ▼
 GoogleAIProvider (Dedicated Service using @google/genai)
       │
       ▼
 Google AI Studio API (https://generativelanguage.googleapis.com)
       │
       ▼
 Google Gemma 4 (gemma-4-26b-a4b-it - Multimodal Vision & Reasoning)
```

> **Security Note:** The Google AI API key is kept strictly server-side in `.env.local`. The frontend never calls Google AI directly and never exposes the API key to client browsers or network logs.

---

### Step 1: Obtain a Google AI Studio API Key
1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Create or copy your Gemini / Google AI API key.

---

### Step 2: Configure Environment Variables
PhishLens supports zero-code configuration via `.env.local`.

Create or edit `.env.local` in the project root:
```env
# Google AI Studio API Key (Server-Side Only)
GEMINI_API_KEY=your_google_ai_studio_api_key_here

# Selected Gemma 4 Multimodal Model
GEMMA_MODEL=gemma-4-26b-a4b-it

# Optional Request Timeout (ms)
GEMINI_TIMEOUT_MS=60000
```

> **Runtime Configuration:** You can also configure or update your `GEMINI_API_KEY` and `GEMMA_MODEL` at runtime without restarting the server via the in-app **Settings** modal (Gear icon in top navigation) or via the `/api/config` development endpoint.

---

### Step 3: Start PhishLens
Install Node dependencies and start the development server:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### Step 4: Test the AI Connection

PhishLens provides multiple methods to test and verify the AI runtime connection:

1. **AI Health Endpoint:**
   Query the real backend health check:
   ```bash
   curl http://localhost:3000/api/health/ai
   ```
   Example healthy response:
   ```json
   {
     "status": "ok",
     "reachable": true,
     "modelExists": true,
     "multimodalSupported": true,
     "modelName": "gemma-4-26b-a4b-it",
     "baseUrl": "https://generativelanguage.googleapis.com",
     "latencyMs": 350
   }
   ```

2. **In-App "AI Connection" Indicator:**
   In the PhishLens scanner header, the indicator displays real-time connectivity:
   - `● Connected | Gemma: gemma-4-26b-a4b-it [VISION]`
   - Or `✕ Unavailable | <reason>` if the API key is missing or invalid.

3. **In-App Settings Connection Test:**
   Click the **Settings** icon in the navbar, enter or change your Google AI key or Model name, and click **"Test Connection"** to verify round-trip health.

*(Note: PhishLens also includes an `OllamaProvider` implementation if local offline inference is ever desired).*

---

## 8. Complete Analysis Pipeline

PhishLens preserves strict pipeline ordering and fuses deterministic security controls with Gemma 4's multimodal reasoning:

```text
Screenshot Upload
       │
       ▼
Image Validation (MIME type, 10MB limit)
       │
       ▼
OCR & Script Detection (English, Hindi, Marathi, Hinglish)
       │
       ▼
URL & Digital Extraction (Domain hierarchy, Punycode, TLDs)
       │
       ▼
Passive QR Code Inspection (jsQR, UPI scheme detection)
       │
       ▼
Gemma 4 Multimodal Reasoning through Ollama
       │
       ▼
Structured Threat Assessment & Schema Validation
       │
       ▼
Deterministic Security Checks (IP, Homograph, Brand Spoofing)
       │
       ▼
Risk Engine (0-100 Weighted Blended Score)
       │
       ▼
Explainable Result UI (Spatial Threat Map, Evidence, DO/DO NOT)
```

---

## 9. Security & Privacy Guarantees
- **Local-Only AI Inference:** All multimodal reasoning is executed on your local Ollama server. No images, screenshots, or credentials leave your machine.
- **Ephemeral Processing:** Uploaded images are processed in-memory and never stored permanently on disk.
- **Passive Inspection:** Links and URLs are analyzed textually. They are never opened automatically in user browsers.
- **Zero-Execution Sandbox:** Uploaded files and APKs are never executed.
- **No Hallucinated Fallbacks:** If Ollama is unreachable, PhishLens reports an honest error rather than returning fake scan results.

---

## 10. Limitations & Future Work
- **Live Sandbox Detonation:** Future iterations will integrate headless sandboxes for passive DOM fingerprinting.
- **Browser Extension:** Packaged Chrome extension for auto-scanning active viewport captures.
- **Audio Scams:** Expanding Gemma multimodal analysis to deepfake voice calls and automated IVR robocalls.
