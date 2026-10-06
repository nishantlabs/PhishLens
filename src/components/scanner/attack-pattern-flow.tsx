"use client";

import React from "react";
import { ArrowRight, ShieldCheck, AlertOctagon } from "lucide-react";

interface AttackPatternFlowProps {
  steps: string[];
  isLegitimate: boolean;
}

export const AttackPatternFlow: React.FC<AttackPatternFlowProps> = ({ steps, isLegitimate }) => {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="mb-6 pb-4 border-b border-cyber-border flex items-center justify-between">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
            BEHAVIORAL SEQUENCE RECONSTRUCTION
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {isLegitimate ? "Communication Sequence" : "Reconstructed Attack Pattern Chain"}
          </h3>
        </div>
        <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${
          isLegitimate
            ? "bg-emerald-950 text-emerald-400 border-emerald-500/40"
            : "bg-rose-950 text-rose-400 border-rose-500/40"
        }`}>
          {isLegitimate ? "BENIGN WORKFLOW" : "EXPLOIT FUNNEL"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={idx}>
              <div className="p-4 rounded-xl bg-cyber-surface/90 border border-cyber-border hover:border-slate-500 transition-all flex flex-col justify-between h-full relative group">
                <div className="text-[10px] font-mono text-cyan-400 uppercase mb-2">
                  STAGE 0{idx + 1}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-100 mb-1">
                  {step}
                </div>
                <div className="text-[11px] text-slate-400">
                  {idx === 0 && "Initial brand mimicry or channel hook"}
                  {idx === 1 && "High-pressure psychological trigger"}
                  {idx === 2 && "Demands password, OTP, or PIN entry"}
                  {idx === 3 && "Exfiltration of financial/personal assets"}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
