import { NextRequest, NextResponse } from "next/server";
import { getAIConfig, setRuntimeConfig } from "@/lib/ai/config";

export const dynamic = "force-dynamic";

export async function GET() {
  const config = getAIConfig();
  return NextResponse.json({
    gemmaModel: config.gemmaModel,
    hasApiKey: Boolean(config.geminiApiKey),
    timeoutMs: config.timeoutMs,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { geminiApiKey, gemmaModel } = body;

    const updates: Record<string, string> = {};
    if (typeof geminiApiKey === "string" && geminiApiKey.trim()) {
      updates.geminiApiKey = geminiApiKey.trim();
    }
    if (typeof gemmaModel === "string" && gemmaModel.trim()) {
      updates.gemmaModel = gemmaModel.trim();
    }

    setRuntimeConfig(updates);

    const updated = getAIConfig();
    return NextResponse.json({
      message: "Runtime configuration updated successfully.",
      gemmaModel: updated.gemmaModel,
      hasApiKey: Boolean(updated.geminiApiKey),
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to update runtime configuration." },
      { status: 400 }
    );
  }
}
