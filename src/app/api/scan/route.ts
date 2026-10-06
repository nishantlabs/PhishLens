import { NextRequest, NextResponse } from "next/server";
import { analyzeMultimodal } from "@/lib/ai/gemma-adapter";
import { parseQrData } from "@/lib/security/qr-scanner";

export const dynamic = "force-dynamic";

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml'
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, imageMimeType, extractedText, filename, qrData } = body;

    // MIME validation
    if (imageMimeType && !ALLOWED_MIME_TYPES.has(imageMimeType)) {
      return NextResponse.json(
        { error: "Unsupported file type. Only PNG, JPEG, WEBP and SVG security captures are accepted." },
        { status: 400 }
      );
    }

    // Size limit check on base64 string
    if (imageBase64 && imageBase64.length > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image payload exceeds safety threshold of 10MB." },
        { status: 413 }
      );
    }

    // Passive QR decoding check if client provided or detected
    let parsedQrPayload: string | undefined = undefined;
    if (qrData) {
      const qrScan = parseQrData(qrData);
      if (qrScan.detected) {
        parsedQrPayload = qrScan.data;
      }
    }

    // Execute multimodal layered pipeline
    const assessment = await analyzeMultimodal({
      imageBase64,
      imageMimeType: imageMimeType || "image/png",
      extractedText: extractedText || "",
      filename: filename || "screenshot.png",
      qrPayload: parsedQrPayload
    });

    return NextResponse.json(assessment);

  } catch (err: any) {
    console.error("Scan processing error:", err);
    return NextResponse.json(
      { 
        error: "Security analysis pipeline encountered an error. Please verify the image file and retry.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined 
      },
      { status: 500 }
    );
  }
}
