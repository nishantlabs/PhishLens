import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ThreatAssessment } from "@/types/threat";

export async function POST(req: NextRequest) {
  try {
    const { question, assessment }: { question: string; assessment: ThreatAssessment } = await req.json();

    if (!question || !assessment) {
      return NextResponse.json({ error: "Missing required query or assessment context." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY;

    if (apiKey) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const systemPrompt = `You are PhishLens Assistant, an elite cybersecurity analyst.
The user is asking a question about a digital artifact that PhishLens just analyzed.
Ground your response ONLY in this threat assessment report:
- Verdict: ${assessment.verdict}
- Risk Score: ${assessment.riskScore}/100
- Category: ${assessment.primaryCategory}
- Summary: ${assessment.summary}
- Explanations: ${JSON.stringify(assessment.explanations)}
- Digital Indicators: ${JSON.stringify(assessment.digitalIndicators)}
- Recommended DOs: ${JSON.stringify(assessment.recommendations.do)}
- Recommended DO NOTs: ${JSON.stringify(assessment.recommendations.doNot)}
- Social Engineering Tactics: ${JSON.stringify(assessment.socialEngineering)}

Keep your answer concise (2-4 sentences max), defensive, authoritative, and direct. Do not give generic advice that contradicts the assessment report.`;

        const result = await model.generateContent([systemPrompt, question]);
        return NextResponse.json({ reply: result.response.text() });
      } catch (e) {
        console.warn("Live chat API bridge error, using grounded local expert:", e);
      }
    }

    // Grounded local reasoning fallback
    const qLower = question.toLowerCase();
    let reply = "";

    if (qLower.includes("why is this dangerous") || qLower.includes("why dangerous") || qLower.includes("why high risk")) {
      if (assessment.verdict === "SAFE") {
        reply = "This interaction is not considered dangerous. It displays verified official sender signatures, standard transaction details, and requests no credentials or funds.";
      } else {
        const firstExp = assessment.explanations[0];
        reply = `This interaction is dangerous because it combines ${assessment.socialEngineering.join(' and ')} techniques with ${assessment.primaryCategory.toLowerCase().replace('_', ' ')} indicators. ${firstExp ? firstExp.description : 'It attempts to harvest credentials or divert payments.'}`;
      }
    } else if (qLower.includes("what should i do") || qLower.includes("next step") || qLower.includes("action")) {
      if (assessment.verdict === "SAFE") {
        reply = "No defensive remediation is needed. You may keep this notification for your transaction records. If you did not make this purchase, contact your bank via their official number.";
      } else {
        reply = `Immediate action recommended: ${assessment.recommendations.doNot[0] || 'Do not click any links'}. Instead, ${assessment.recommendations.do[1] || assessment.recommendations.do[0] || 'open the official app manually'}.`;
      }
    } else if (qLower.includes("link") || qLower.includes("url") || qLower.includes("domain")) {
      const suspiciousDomain = assessment.digitalIndicators.find(d => d.isSuspicious);
      if (suspiciousDomain) {
        reply = `The link (${suspiciousDomain.value}) is deceptive: ${suspiciousDomain.notes}. It is not an authorized official domain.`;
      } else {
        reply = "No deceptive or unverified URLs were flagged in this artifact.";
      }
    } else if (qLower.includes("upi") || qLower.includes("pin") || qLower.includes("qr") || qLower.includes("money")) {
      if (assessment.primaryCategory === "PAYMENT_SCAM") {
        reply = "Important rule: You NEVER need to enter your UPI PIN to receive money. Entering your PIN authorizes money leaving your account. Do not scan this QR code or approve the collect request.";
      } else {
        reply = "Never share your UPI PIN or NetBanking OTP. Legitimate entities and banking representatives will never ask for them.";
      }
    } else {
      reply = `PhishLens classified this artifact as ${assessment.verdict} (${assessment.riskScore}/100 risk score). ${assessment.summary} Proceed with caution and verify independently.`;
    }

    return NextResponse.json({ reply });

  } catch (err: any) {
    return NextResponse.json({ error: "Failed to process question." }, { status: 500 });
  }
}
