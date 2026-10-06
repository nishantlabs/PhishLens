"use client";

import React from "react";
import { Check, X, ShieldAlert, PhoneCall, ExternalLink } from "lucide-react";

interface ActionChecklistProps {
  recommendations: {
    do: string[];
    doNot: string[];
  };
  isLegitimate: boolean;
}

export const ActionChecklist: React.FC<ActionChecklistProps> = ({ recommendations, isLegitimate }) => {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="mb-6 pb-4 border-b border-cyber-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
            DEFENSIVE ACTION PROTOCOL
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            What You Should Do Next
          </h3>
        </div>

        {/* Emergency reporting tip */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-mono">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>India Cyber Fraud Helpline: <strong>1930</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* DO NOT LIST */}
        <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-4">
            <X className="w-4 h-4 p-0.5 bg-rose-500/20 rounded-full" />
            <span>STRICTLY DO NOT:</span>
          </div>
          <ul className="space-y-3">
            {recommendations.doNot.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="text-rose-400 font-bold shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DO LIST */}
        <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4">
            <Check className="w-4 h-4 p-0.5 bg-emerald-500/20 rounded-full" />
            <span>RECOMMENDED DEFENSIVE ACTIONS:</span>
          </div>
          <ul className="space-y-3">
            {recommendations.do.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Cyber Crime Portal Reporting Link */}
      <div className="mt-6 pt-4 border-t border-cyber-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <span>Need to lodge an official complaint?</span>
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 underline font-mono flex items-center gap-1"
        >
          <span>National Cyber Crime Reporting Portal (cybercrime.gov.in)</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
