"use client";

import React from "react";
import { ThreatAssessment } from "@/types/threat";
import { ShieldAlert, Quote, CheckCircle } from "lucide-react";

interface EvidenceCardsProps {
  assessment: ThreatAssessment;
}

export const EvidenceCards: React.FC<EvidenceCardsProps> = ({ assessment }) => {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="mb-6 pb-4 border-b border-cyber-border">
        <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
          EXPLAINABLE AI • DEEP REASONING
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Why This Artifact Is Dangerous
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Gemma 4 extracted evidence directly from visual pixels, typography, and text semantics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assessment.explanations.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-cyber-surface/80 border border-cyber-border hover:border-cyan-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <h4 className="text-sm font-bold text-slate-100">
                  {item.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {item.extractedQuote && (
              <div className="pt-3 border-t border-cyber-border/60 flex items-start gap-2 bg-cyber-bg/60 p-2.5 rounded-lg">
                <Quote className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-[11px] font-mono text-cyan-200/90 italic">
                  &ldquo;{item.extractedQuote}&rdquo;
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
