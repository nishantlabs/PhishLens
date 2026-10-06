import { NextResponse } from "next/server";
import { getAIProvider } from "@/lib/ai/factory";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const provider = getAIProvider();
    const health = await provider.checkHealth();

    const httpStatus = health.status === "ok" ? 200 : 503;
    return NextResponse.json(health, { status: httpStatus });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        reachable: false,
        modelExists: false,
        multimodalSupported: false,
        error: "Failed to query AI runtime health status.",
      },
      { status: 503 }
    );
  }
}
