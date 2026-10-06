import { NextResponse } from "next/server";
import { BENCHMARK_DATASET, computeBenchmarkMetrics } from "@/lib/data/evaluation-dataset";

export async function GET() {
  const metrics = computeBenchmarkMetrics();
  return NextResponse.json({
    metrics,
    dataset: BENCHMARK_DATASET
  });
}
