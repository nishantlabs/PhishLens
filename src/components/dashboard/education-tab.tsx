"use client";

import React, { useState } from "react";
import { EDUCATION_PATTERNS } from "@/lib/data/education-patterns";
import { Brain, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight } from "lucide-react";

export const EducationTab: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState(EDUCATION_PATTERNS[0]);

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="mb-8 pb-4 border-b border-cyber-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
          <Brain className="w-3.5 h-3.5" />
          <span>Cognitive Vulnerability Intelligence</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Why Scammers Do This: Psychology of Social Engineering
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl">
          Phishing is not an IT technology attack; it is an attack on human cognitive biases. Learn how attackers manipulate perception and how to neutralize each tactic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Tactics Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            SELECT MANIPULATION TACTIC
          </div>
          {EDUCATION_PATTERNS.map((pattern) => {
            const isSelected = selectedPattern.id === pattern.id;

            return (
              <button
                key={pattern.id}
                onClick={() => setSelectedPattern(pattern)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group ${
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                    : "bg-cyber-surface/60 border-cyber-border text-slate-400 hover:text-slate-200 hover:border-slate-600"
                }`}
              >
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${
                    isSelected ? "text-cyan-400" : "text-slate-300"
                  }`}>
                    {pattern.tactic}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {pattern.name}
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${
                  isSelected ? "text-cyan-400 translate-x-1" : "text-slate-600"
                }`} />
              </button>
            );
          })}
        </div>

        {/* Right Side: Deep Educational Breakdown (8 cols) */}
        <div className="lg:col-span-8 bg-cyber-surface/80 border border-cyber-border rounded-xl p-6 shadow-inner">
          <div className="flex items-center justify-between pb-4 border-b border-cyber-border mb-6">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-semibold">
                TACTIC ANALYSIS
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {selectedPattern.tactic}: {selectedPattern.name}
              </h3>
            </div>
            <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold border ${
              selectedPattern.severityLevel === "CRITICAL"
                ? "bg-rose-950 text-rose-300 border-rose-500/50"
                : "bg-amber-950 text-amber-300 border-amber-500/50"
            }`}>
              {selectedPattern.severityLevel} COGNITIVE RISK
            </span>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            {/* The Psychology */}
            <div>
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyan-400" />
                The Underlying Neuro-Psychology
              </h4>
              <p className="text-slate-300 leading-relaxed bg-cyber-card p-3.5 rounded-xl border border-cyber-border">
                {selectedPattern.psychology}
              </p>
            </div>

            {/* Why Victims Fall */}
            <div>
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                Why Even Smart People Fall For It
              </h4>
              <p className="text-slate-300 leading-relaxed bg-cyber-card p-3.5 rounded-xl border border-cyber-border">
                {selectedPattern.whyVictimsFall}
              </p>
            </div>

            {/* Real World Attack Vector */}
            <div>
              <h4 className="font-bold text-white text-sm mb-1.5 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                Real-World Weaponized Sample
              </h4>
              <div className="bg-rose-950/20 border border-rose-500/40 p-3.5 rounded-xl font-mono text-xs text-rose-200">
                {selectedPattern.realWorldExample}
              </div>
            </div>

            {/* How to spot */}
            <div>
              <h4 className="font-bold text-white text-sm mb-2">
                How to Spot This Manipulation:
              </h4>
              <ul className="space-y-2">
                {selectedPattern.howToSpot.map((spot, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-300 text-xs">
                    <span className="text-cyan-400 font-bold">›</span>
                    <span>{spot}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Psychological Countermeasure */}
            <div className="pt-4 border-t border-cyber-border">
              <h4 className="font-bold text-emerald-400 text-sm mb-1.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Cognitive Defensive Countermeasure
              </h4>
              <p className="text-slate-200 leading-relaxed bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/30">
                {selectedPattern.countermeasure}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
