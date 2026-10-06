# PhishLens — Multimodal Phishing & Scam Detector

### See the scam before you fall for it.

PhishLens is a multimodal AI-powered cybersecurity platform that analyzes screenshots and digital artifacts to identify phishing, scams, impersonation, credential harvesting, QR-based fraud, and other social-engineering attacks.

Instead of checking only whether a URL is suspicious, PhishLens analyzes the **entire interaction** by combining visual, textual, URL, QR, and contextual security signals.

> **Hackathon-grade cybersecurity platform powered by Google Gemma 4**

---

## The Problem

Traditional phishing detection often relies on URL reputation, blacklists, keyword matching, and static rules.

These approaches can miss modern scams because:

- Attackers frequently use newly created or disposable domains.
- Scams are distributed through WhatsApp, SMS, email, social media, and screenshots.
- QR-code scams cannot always be evaluated by URL scanners alone.
- Fake websites and messages can visually imitate trusted brands.
- Social-engineering techniques such as urgency, fear, authority impersonation, and credential requests require contextual analysis.
- A simple "malicious" verdict does not explain **why** something is dangerous.

PhishLens addresses this by analyzing the complete visual and digital context of a suspicious interaction.

---

## The Solution

PhishLens accepts a screenshot as a security artifact and processes it through multiple analysis layers.

It combines:

- OCR and text extraction
- Visual analysis
- URL and domain inspection
- QR-code detection
- Deterministic security checks
- Google Gemma 4 multimodal reasoning
- Weighted risk scoring
- Explainable threat evidence
- Spatial threat mapping
- Actionable recommendations
- A grounded "Ask PhishLens" assistant

The goal is simple:

> **Don't just tell the user that something is suspicious. Explain what makes it suspicious and what they should do next.**

---

## Architecture

```text
                         USER
                           │
                           ▼
                ┌─────────────────────┐
                │   SCREENSHOT UPLOAD  │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   INPUT VALIDATION   │
                │ MIME / SIZE CHECKS   │
                └──────────┬──────────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
          OCR ENGINE    QR SCANNER    URL / DOMAIN
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │    GOOGLE GEMMA 4   │
                │ MULTIMODAL REASONING│
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ DETERMINISTIC CHECKS│
                │  & RISK ENGINE      │
                └──────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │   EXPLAINABLE       │
                │   THREAT REPORT     │
                ├─────────────────────┤
                │ Risk Score           │
                │ Verdict              │
                │ Evidence             │
                │ Threat Map            │
                │ Attack Pattern        │
                │ Recommendations       │
                └─────────────────────┘
```

---

## Analysis Pipeline

### 1. Screenshot Upload

The user uploads a suspicious screenshot through the PhishLens scanner.

The backend validates the uploaded image before processing it.

### 2. OCR & Text Analysis

OCR extracts visible text from the screenshot.

The extracted content can then be used to identify:

- Urgency
- Credential requests
- Suspicious instructions
- Impersonation language
- Payment-related messages
- Social-engineering patterns

### 3. URL & Digital Signal Extraction

PhishLens extracts and analyzes URLs and other digital indicators found in the screenshot.

The deterministic analysis can identify suspicious characteristics such as:

- IP-based hosts
- Suspicious domains
- Punycode/homograph patterns
- Disposable TLDs
- URL shorteners
- Suspicious routing indicators

### 4. QR Code Analysis

QR codes can be detected and inspected without automatically visiting the destination.

This is particularly useful for identifying payment-related scams and suspicious QR-based interactions.

### 5. Gemma 4 Multimodal Reasoning

PhishLens sends the relevant screenshot and extracted security context to **Google Gemma 4** through the Google AI API.

The configured primary model is:

```text
gemma-4-26b-a4b-it
```

Gemma provides multimodal reasoning over the visual and textual context and returns structured threat information.

### 6. Deterministic Security Analysis

AI output is not treated as the only source of truth.

PhishLens also applies deterministic security checks to strengthen the analysis and identify technical indicators independently.

### 7. Risk Engine

The Risk Engine combines deterministic signals and AI-generated evidence into a normalized **0–100 risk score**.

The result includes:

- Verdict
- Risk score
- Confidence
- Threat categories
- Evidence
- Attack pattern
- Recommended actions

### 8. Explainable Result

The final result is presented through the dashboard with visual evidence and actionable guidance.

---

## Core Features

### 1. Multimodal Screenshot Analysis

Analyze phishing and scam screenshots using both visual and textual context rather than relying only on URLs.

### 2. Spatial Threat Map

Suspicious regions can be highlighted directly on the uploaded screenshot.

Examples include:

- Suspicious URLs
- Credential fields
- Impersonated branding
- Urgency indicators
- QR/payment elements

### 3. Explainable Risk Score

PhishLens provides a normalized risk score together with the evidence contributing to the assessment.

The objective is to make the result understandable rather than presenting an unexplained black-box score.

### 4. Attack Pattern Analysis

PhishLens can represent the progression of an attack, for example:

```text
Impersonation
      ↓
Urgency
      ↓
Credential / Payment Request
      ↓
Potential Information or Financial Loss
```

### 5. Action Checklist

The result provides practical **DO / DO NOT** recommendations so users know what to do after identifying a suspicious interaction.

### 6. Grounded "Ask PhishLens"

The application includes an interactive assistant that can answer questions based on the current scan result.

Examples:

```text
Why is this dangerous?

What should I do right now?

Which part of the screenshot is suspicious?

What information is the attacker trying to obtain?
```

### 7. AI Connection Monitoring

PhishLens includes an AI connection indicator and health endpoint to verify the availability of the configured Gemma model.

### 8. Structured AI Output

Gemma responses are requested and validated as structured data before being used by the application.

This allows the AI analysis to integrate consistently with the existing Risk Engine and frontend components.

---

## Technology Stack

| Component | Technology |
|---|---|
| Framework | Next.js 14 |
| Architecture | App Router / Full-stack Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI SDK | `@google/genai` |
| AI Provider | Google AI API |
| AI Model | Google Gemma 4 |
| Primary Model | `gemma-4-26b-a4b-it` |
| OCR | Application OCR pipeline |
| QR Detection | `jsQR` |
| Charts / Visualization | Recharts |
| Icons | Lucide React |

---

## Google AI / Gemma 4 Integration

PhishLens uses a server-side AI provider abstraction.

```text
Browser
   │
   ▼
Next.js Application
   │
   ├── /api/scan
   ├── /api/chat
   └── /api/health/ai
   │
   ▼
AI Provider Layer
   │
   ▼
GoogleAIProvider
   │
   ▼
Google AI API
   │
   ▼
Gemma 4
```

The application uses:

```text
@google/genai
```

and the configured model:

```text
gemma-4-26b-a4b-it
```

The Google AI API key is kept server-side and is loaded through environment variables.

The frontend does **not** directly expose the API key to the browser.

---

## Environment Configuration

Create a `.env.local` file in the project root.

```env
GEMINI_API_KEY=your_google_ai_api_key
GEMMA_MODEL=gemma-4-26b-a4b-it
```

If your project uses a custom timeout configuration, you can also configure:

```env
GEMINI_TIMEOUT_MS=60000
```

### Security

Never commit `.env.local` or your actual API key to GitHub.

The repository includes `.env.example` as a safe configuration reference.

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/nishantlabs/PhishLens.git
cd PhishLens
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

and add your Google AI API key and Gemma model configuration.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## AI Health Check

PhishLens provides an AI health endpoint:

```text
GET /api/health/ai
```

It can be used to verify:

- API connectivity
- Model availability
- Multimodal support
- Configured model
- Request latency

Example:

```bash
curl http://localhost:3000/api/health/ai
```

A healthy response contains information such as:

```json
{
  "status": "ok",
  "reachable": true,
  "modelExists": true,
  "multimodalSupported": true,
  "modelName": "gemma-4-26b-a4b-it"
}
```

---

## API Routes

### Scan

```text
POST /api/scan
```

Processes a screenshot through the complete phishing-analysis pipeline.

### Chat

```text
POST /api/chat
```

Provides the grounded Ask PhishLens assistant.

### AI Health

```text
GET /api/health/ai
```

Checks the configured AI provider and model.

### Configuration

```text
/api/config
```

Provides application AI configuration functionality used by the project.

---

## Security & Privacy

PhishLens follows several security principles:

- **Server-side API credentials** — Google AI credentials are kept outside the client-side application.
- **No automatic URL navigation** — extracted URLs are analyzed as data rather than automatically opened.
- **Passive QR inspection** — QR contents can be inspected without automatically navigating to the destination.
- **Input validation** — uploaded files are validated before processing.
- **Structured AI validation** — AI responses are validated before being consumed by the application.
- **Layered detection** — AI reasoning is combined with deterministic security analysis rather than relying entirely on model output.
- **No automatic execution of uploaded content** — uploaded screenshots are treated as analysis inputs.

> **Important:** When using Google AI for analysis, image and extracted data sent to the Google AI API are processed by that external service. PhishLens therefore should not be described as a fully local-only inference system.

---

## Example Threats

PhishLens is designed to help analyze scenarios such as:

### KYC / Banking Scams

```text
Your account will be blocked within 24 hours.
Complete KYC immediately.
```

### QR / Payment Scams

```text
Scan this QR code to receive your refund.
Enter your UPI PIN to complete the process.
```

### Impersonation

Messages pretending to originate from:

- Banks
- Government organizations
- Delivery services
- Financial services
- Technology companies

### Credential Harvesting

Fake login pages requesting:

- Passwords
- OTPs
- Banking information
- Card information
- Account credentials

### Social Engineering

Scams using:

- Urgency
- Fear
- Authority
- Rewards
- Refunds
- Account suspension
- Payment requests

---

## Limitations

PhishLens is a cybersecurity analysis and educational tool, not a replacement for professional security infrastructure.

Potential limitations include:

- AI analysis can take significant time depending on API availability and model response latency.
- AI-generated assessments can contain errors and should be interpreted alongside deterministic security signals.
- Screenshot quality can affect OCR and visual analysis.
- A screenshot may not contain enough information to determine the complete security status of a website or message.
- Domain reputation and live threat intelligence are not a guarantee of safety or maliciousness.

---

## Future Scope

Possible future improvements include:

- Browser extension for automatic screenshot/page analysis
- Live threat-intelligence integration
- Domain reputation services
- Sandboxed webpage analysis
- HTML/DOM fingerprinting
- Audio and voice scam analysis
- Deepfake and voice-phishing detection
- Expanded multilingual support
- Larger adversarial evaluation datasets
- Offline/local AI inference as an optional provider

---

## Project Structure

```text
PhishLens/
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   ├── config/
│   │   │   ├── health/
│   │   │   └── scan/
│   │   │
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   └── scanner/
│   │
│   └── lib/
│       └── ai/
│           ├── config.ts
│           ├── errors.ts
│           ├── factory.ts
│           ├── gemma-adapter.ts
│           ├── google-ai-provider.ts
│           ├── ollama-provider.ts
│           ├── types.ts
│           └── validation.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## Project Status

PhishLens currently includes:

- Multimodal screenshot analysis
- OCR integration
- URL extraction and analysis
- QR-code detection
- Google Gemma 4 integration
- Structured AI responses
- Deterministic security checks
- Risk scoring
- Evidence generation
- Spatial threat mapping
- Attack-pattern visualization
- Action recommendations
- Grounded Ask PhishLens assistant
- AI health monitoring

The complete scan pipeline has been tested end-to-end using a real screenshot and the configured Gemma 4 model.

---

## Disclaimer

PhishLens is developed for cybersecurity education, research, demonstration, and hackathon purposes.

Detection results should be treated as security guidance rather than absolute proof that an interaction is malicious or legitimate.

---

## License

License information will be added as the project is prepared for public distribution.
