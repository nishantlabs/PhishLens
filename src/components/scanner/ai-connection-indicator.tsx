"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Cpu, RefreshCw, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

interface AIHealthResponse {
  status: "ok" | "unavailable" | "error";
  reachable: boolean;
  modelExists: boolean;
  multimodalSupported: boolean;
  modelName: string;
  baseUrl: string;
  latencyMs?: number;
  availableModels?: string[];
  error?: string;
}

export const AIConnectionIndicator: React.FC = () => {
  const [health, setHealth] = useState<AIHealthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const checkHealth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health/ai", { cache: "no-store" });
      const data: AIHealthResponse = await res.json();
      setHealth(data);
    } catch (err: any) {
      setHealth({
        status: "unavailable",
        reachable: false,
        modelExists: false,
        multimodalSupported: false,
        modelName: "Unknown",
        baseUrl: "https://generativelanguage.googleapis.com",
        error: "Google AI is not reachable",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  const isConnected = health?.status === "ok" && health.reachable && health.modelExists;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyber-card/90 border border-cyber-border text-xs shadow-sm">
      <div className="flex items-center gap-1.5">
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
          Google AI:
        </span>
      </div>

      {loading ? (
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-mono text-[11px]">Connecting...</span>
        </div>
      ) : isConnected ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-emerald-400 font-semibold font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Connected</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 font-mono text-[11px]">
            Gemma: <strong className="text-cyan-300 font-normal">{health.modelName}</strong>
          </span>
          {health.multimodalSupported && (
            <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
              VISION
            </span>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-rose-400 font-semibold font-mono text-[11px]">
            <XCircle className="w-3.5 h-3.5" />
            <span>Unavailable</span>
          </div>
          <span className="text-slate-500">|</span>
          <span className="text-rose-300/90 font-mono text-[11px]">
            {health?.error || "Google AI is not reachable"}
          </span>
        </div>
      )}

      <button
        onClick={checkHealth}
        disabled={loading}
        title="Refresh AI connection status"
        className="ml-1 p-1 text-slate-400 hover:text-cyan-300 rounded hover:bg-cyber-surface transition-colors disabled:opacity-40"
      >
        <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
      </button>
    </div>
  );
};
