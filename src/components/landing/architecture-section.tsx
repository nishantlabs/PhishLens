import React from "react";
import { ArrowDown, Cpu, ShieldCheck, Database, Layers, Terminal, Sparkles, AlertOctagon } from "lucide-react";

export const ArchitectureSection: React.FC = () => {
  return (
    <section id="architecture" className="py-16 border-b border-cyber-border/60 bg-cyber-card/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Layers className="w-3 h-3" />
            <span>Layered Cybersecurity Architecture</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
            How PhishLens Works
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            We never trust AI blindly. PhishLens fuses Gemma 4 multimodal reasoning with deterministic cryptographic and heuristics verification layers.
          </p>
        </div>

        {/* Visual Architecture Diagram */}
        <div className="max-w-4xl mx-auto bg-cyber-bg border border-cyber-border rounded-2xl p-6 sm:p-8 relative">
          
          {/* Top: User & Artifact Ingestion */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-cyber-surface border border-cyber-border text-slate-200 text-sm font-semibold shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>User Screenshot / Suspicious Digital Artifact</span>
            </div>
            <ArrowDown className="w-5 h-5 text-cyan-500/70 my-3" />
          </div>

          {/* Preprocessing Layer */}
          <div className="bg-cyber-card border border-cyber-border/80 rounded-xl p-5 mb-4 shadow-sm">
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>LAYER 01 — SECURE PREPROCESSING &amp; EXTRACTION</span>
              <span className="text-slate-400">Zero Execution Environment</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-cyber-surface/90 border border-cyber-border rounded-lg p-3 text-xs">
                <div className="font-semibold text-slate-200 mb-1">OCR Engine</div>
                <div className="text-slate-400">Extracts text across English, Hindi &amp; Marathi</div>
              </div>
              <div className="bg-cyber-surface/90 border border-cyber-border rounded-lg p-3 text-xs">
                <div className="font-semibold text-slate-200 mb-1">QR Code Processor</div>
                <div className="text-slate-400">Passive jsQR decoding for UPI intents &amp; URLs</div>
              </div>
              <div className="bg-cyber-surface/90 border border-cyber-border rounded-lg p-3 text-xs">
                <div className="font-semibold text-slate-200 mb-1">Deterministic Inspector</div>
                <div className="text-slate-400">Punycode, raw IP hosts, suspicious TLDs, VPA handles</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center my-3">
            <ArrowDown className="w-5 h-5 text-cyan-500/70" />
          </div>

          {/* Core Reasoning: Gemma 4 Multimodal */}
          <div className="bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-purple-950/30 border-2 border-cyan-500/50 rounded-xl p-6 mb-4 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Google Gemma 4 Multimodal Engine</h3>
                  <p className="text-xs text-cyan-300/80">Cross-modal cognitive correlation: Vision + Semantics</p>
                </div>
              </div>
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                Temperature: 0.1 • Strict JSON
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              <div className="bg-cyber-bg/80 border border-cyan-500/20 p-2.5 rounded-lg text-slate-300">
                <strong className="text-cyan-300 block mb-0.5">Visual Authenticity</strong>
                Logo cloning &amp; fake badges
              </div>
              <div className="bg-cyber-bg/80 border border-cyan-500/20 p-2.5 rounded-lg text-slate-300">
                <strong className="text-cyan-300 block mb-0.5">Social Engineering</strong>
                Urgency, fear, scarcity, rewards
              </div>
              <div className="bg-cyber-bg/80 border border-cyan-500/20 p-2.5 rounded-lg text-slate-300">
                <strong className="text-cyan-300 block mb-0.5">Credential Vectors</strong>
                Password / OTP / PIN traps
              </div>
              <div className="bg-cyber-bg/80 border border-cyan-500/20 p-2.5 rounded-lg text-slate-300">
                <strong className="text-cyan-300 block mb-0.5">Spatial Threat Map</strong>
                Bounding box coordinates
              </div>
            </div>
          </div>

          <div className="flex justify-center my-3">
            <ArrowDown className="w-5 h-5 text-cyan-500/70" />
          </div>

          {/* Aggregation & Scoring */}
          <div className="bg-cyber-card border border-cyber-border/80 rounded-xl p-5 mb-4 shadow-sm">
            <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider mb-3">
              LAYER 03 — DETERMINISTIC RISK ENGINE &amp; EXPLAINABILITY
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-cyber-surface/90 border border-cyber-border rounded-lg p-3">
                <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  0–100 Normalized Risk Score
                </div>
                <div className="text-slate-400">
                  Transparent point-based breakdown (+25 Credentials, +20 Impersonation, +15 Urgency, +17 URL)
                </div>
              </div>
              <div className="bg-cyber-surface/90 border border-cyber-border rounded-lg p-3">
                <div className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-amber-400" />
                  Defensive Action Engine
                </div>
                <div className="text-slate-400">
                  Grounded DO / DO NOT recommendations &amp; interactive assistant advice
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
