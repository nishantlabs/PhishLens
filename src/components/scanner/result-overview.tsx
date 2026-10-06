"use client";

import React from "react";
import { ThreatAssessment } from "@/types/threat";
import { getVerdictDetails } from "@/lib/utils";
import { ShieldAlert, ShieldCheck, AlertTriangle, Sparkles, Clock, CheckCircle2, Cpu } from "lucide-react";

interface ResultOverviewProps {
  assessment: ThreatAssessment;
}

export const ResultOverview: React.FC<ResultOverviewProps> = ({ assessment }) => {
  const verdictInfo = getVerdictDetails(assessment.verdict);

  return (
    <div className={`rounded-2xl border ${verdictInfo.border} bg-cyber-card p-6 sm:p-8 shadow-2xl ${verdictInfo.bgGlow} transition-all relative overflow-hidden`}>
      {/* Background Accent Gradient */}
      <div 
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ backgroundColor: verdictInfo.accentColor }}
      />

      {/* Top Banner Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyber-border mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl border ${verdictInfo.badgeColor} flex items-center justify-center`}>
            {assessment.verdict === "SAFE" ? (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            ) : assessment.verdict === "CRITICAL" || assessment.verdict === "HIGH_RISK" ? (
              <ShieldAlert className="w-6 h-6 text-rose-500" />
            ) : (
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            )}
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
              SECURITY VERDICT
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${verdictInfo.textColor}`}>
              {verdictInfo.label}
            </h2>
          </div>
        </div>

        {/* Model and Confidence Badge */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          <div className="px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-border text-xs font-mono text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Confidence: <strong>{Math.round(assessment.confidence * 100)}%</strong></span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-border text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{assessment.metadata.processingTimeMs}ms</span>
          </div>
        </div>
      </div>

      {/* Score and Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
        
        {/* Score Gauge (4 cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-cyber-surface/60 rounded-xl border border-cyber-border text-center">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            AGGREGATED RISK SCORE
          </div>

          <div className="relative flex items-center justify-center my-2">
            <svg className="w-36 h-36 transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="58"
                stroke="#1f293d"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="72"
                cy="72"
                r="58"
                stroke={verdictInfo.accentColor}
                strokeWidth="10"
                strokeDasharray={364}
                strokeDashoffset={364 - (364 * assessment.riskScore) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {assessment.riskScore}
              </span>
              <span className="text-[10px] font-mono text-slate-400">/ 100</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-2 max-w-[200px]">
            {verdictInfo.description}
          </p>
        </div>

        {/* Threat Summary & Primary Category (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              THREAT INTELLIGENCE SUMMARY
            </div>
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
              {assessment.summary}
            </p>
          </div>

          {/* Social Engineering Tactics Badges */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
              IDENTIFIED PSYCHOLOGICAL TACTICS
            </div>
            <div className="flex flex-wrap gap-2">
              {assessment.socialEngineering.map((tactic, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-wider bg-cyber-surface border border-cyber-border text-cyan-300"
                >
                  {tactic.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Target Architecture Metas */}
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
            <span>Model: <strong className="text-slate-200">{assessment.metadata.modelUsed}</strong></span>
            <span>Language: <strong className="text-slate-200">{assessment.metadata.detectedLanguage}</strong></span>
            {assessment.metadata.qrDecoded && (
              <span className="text-amber-400">QR Code Decoded</span>
            )}
          </div>
        </div>

      </div>

      {/* Transparent Contributing Factors Breakdown (Section 6) */}
      <div className="border-t border-cyber-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-2">
            <span>RISK SCORE CONTRIBUTING FACTORS</span>
            <span className="text-[10px] text-slate-400">(Non-arbitrary transparent calculation)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {assessment.scoreBreakdown.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-cyber-surface/70 border border-cyber-border hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200">{item.name}</span>
                <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                  item.score > 0
                    ? "bg-rose-950 text-rose-300 border border-rose-500/40"
                    : "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                }`}>
                  {item.score > 0 ? `+${item.score}` : `${item.score}`}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
