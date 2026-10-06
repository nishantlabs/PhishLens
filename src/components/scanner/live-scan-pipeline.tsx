"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Sparkles, Shield, Cpu, Binary, Search, AlertCircle } from "lucide-react";

interface LiveScanPipelineProps {
  onComplete: () => void;
  active: boolean;
}

const STAGES = [
  { id: 1, label: "IMAGE RECEIVED", desc: "MIME sanitization, resolution scaling & buffer allocation", icon: Search },
  { id: 2, label: "OCR EXTRACTION", desc: "Multi-language lexical parsing (English, Hindi, Marathi, Hinglish)", icon: Binary },
  { id: 3, label: "VISUAL ANALYSIS", desc: "Layout parsing, logo authenticity & fake security badge check", icon: Shield },
  { id: 4, label: "GEMMA 4 REASONING", desc: "Multimodal intent, urgency manipulation & psychological reasoning", icon: Sparkles },
  { id: 5, label: "THREAT SIGNAL EXTRACTION", desc: "URL parsing, Punycode detection, QR code payload & UPI VPA inspection", icon: Cpu },
  { id: 6, label: "RISK ENGINE", desc: "Contribution scoring (+25 Credentials, +20 Impersonation, +15 Urgency)", icon: AlertCircle },
  { id: 7, label: "FINAL VERDICT", desc: "Generating Threat Map bounding boxes & defensive directives", icon: CheckCircle2 }
];

export const LiveScanPipeline: React.FC<LiveScanPipelineProps> = ({ onComplete, active }) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!active) {
      setCurrentStep(1);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STAGES.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 350);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <div className="my-8 p-6 sm:p-8 rounded-2xl border border-cyan-500/40 bg-cyber-card/90 backdrop-blur-md shadow-[0_0_40px_rgba(0,240,255,0.15)] relative overflow-hidden">
      {/* Scanline beam */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent scan-bar opacity-70" />

      <div className="flex items-center justify-between mb-6 border-b border-cyber-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide">
              LIVE MULTIMODAL SECURITY SCAN IN PROGRESS
            </h3>
            <p className="text-xs text-slate-400">
              Correlating visual screenshot and textual features across layered engines
            </p>
          </div>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
          STAGE {currentStep} / {STAGES.length}
        </div>
      </div>

      {/* Pipeline Stages Vertical / Grid flow */}
      <div className="space-y-3">
        {STAGES.map((stage) => {
          const isDone = currentStep > stage.id;
          const isCurrent = currentStep === stage.id;
          const isPending = currentStep < stage.id;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                isCurrent
                  ? "bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : isDone
                  ? "bg-cyber-surface/40 border-emerald-500/30 text-slate-300"
                  : "bg-cyber-surface/10 border-cyber-border/40 text-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono ${
                    isCurrent
                      ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400"
                      : isDone
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                      : "bg-cyber-surface text-slate-600 border border-cyber-border"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className={`text-xs font-bold font-mono tracking-wide ${
                    isCurrent ? "text-cyan-300" : isDone ? "text-slate-200" : "text-slate-500"
                  }`}>
                    {stage.label}
                  </div>
                  <div className="text-[11px] text-slate-400 hidden sm:block">
                    {stage.desc}
                  </div>
                </div>
              </div>

              <div>
                {isCurrent && (
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>Analyzing...</span>
                  </span>
                )}
                {isDone && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
                {isPending && (
                  <span className="text-[11px] font-mono text-slate-600">Pending</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
