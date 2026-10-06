"use client";

import React from "react";
import { Shield, Sparkles, ArrowRight, Eye, CheckCircle2, AlertTriangle, Cpu } from "lucide-react";

interface HeroProps {
  onScanClick: () => void;
  onHowItWorksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScanClick, onHowItWorksClick }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden border-b border-cyber-border/60">
      {/* Background radial glow & grid */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-semibold mb-6 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Powered by Google Gemma 4 Multimodal Reasoning</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            See the scam before <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">
              you fall for it.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Traditional detectors ask: <span className="text-slate-400 italic">“Is this URL blacklisted?”</span><br />
            <strong className="text-white">PhishLens asks:</strong> <span className="text-cyan-300 font-medium">“Does the entire interaction look like a scam?”</span>
            {" "}We analyze screenshots across visual, textual, psychological, and digital signals.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onScanClick}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_25px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <Eye className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
              <span>Scan a Screenshot</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onHowItWorksClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm bg-cyber-card border border-cyber-border text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <span>See How It Works</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Visualization Diagram (Section 17) */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-cyber-border bg-cyber-card/70 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
          <div className="text-xs font-mono text-cyan-400 mb-4 flex items-center justify-between border-b border-cyber-border pb-3">
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              MULTIMODAL THREAT DISCOVERY PIPELINE
            </span>
            <span className="text-slate-400">SOC LIVE ARTIFACT MONITOR</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* Step 1: Ingestion */}
            <div className="bg-cyber-surface/90 border border-cyber-border rounded-xl p-4 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Step 01</div>
              <div className="font-semibold text-sm text-white mb-1">Suspicious Artifact</div>
              <p className="text-xs text-slate-400">Screenshot, SMS, WhatsApp, QR, or NetBanking UI</p>
            </div>

            {/* Step 2: Gemma 4 Reasoning */}
            <div className="bg-cyan-950/30 border border-cyan-500/40 rounded-xl p-4 text-center shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1">Step 02 • Core AI</div>
              <div className="font-semibold text-sm text-cyan-300 mb-1 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Gemma 4 Multimodal
              </div>
              <p className="text-xs text-slate-300">Visual spoofing + NLP coercion + Psychological cues</p>
            </div>

            {/* Step 3: Layered Security */}
            <div className="bg-cyber-surface/90 border border-cyber-border rounded-xl p-4 text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Step 03</div>
              <div className="font-semibold text-sm text-white mb-1">Deterministic Engine</div>
              <p className="text-xs text-slate-400">Punycode, raw IPs, UPI VPA checks &amp; QR decoders</p>
            </div>

            {/* Step 4: Explainable Verdict */}
            <div className="bg-rose-950/30 border border-rose-500/40 rounded-xl p-4 text-center shadow-[0_0_15px_rgba(255,51,102,0.1)]">
              <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider mb-1">Step 04 • Verdict</div>
              <div className="font-bold text-base text-rose-400 mb-1">
                92 / 100 Risk Score
              </div>
              <p className="text-xs text-slate-300">Threat Map + Attack Chain + Defensive Directives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
