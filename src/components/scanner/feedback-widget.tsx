"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react";

export const FeedbackWidget: React.FC = () => {
  const [feedback, setFeedback] = useState<"CORRECT" | "INCORRECT" | null>(null);

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2 text-slate-300">
        <span className="font-semibold text-white">Was this AI assessment helpful?</span>
        <span className="text-slate-400 hidden sm:inline">Your feedback assists continuous security benchmarking.</span>
      </div>

      <div className="flex items-center gap-2">
        {feedback ? (
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Thank you for validating this detection!</span>
          </div>
        ) : (
          <>
            <button
              onClick={() => setFeedback("CORRECT")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-border hover:border-emerald-500/50 hover:text-emerald-400 text-slate-300 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>Accurate</span>
            </button>
            <button
              onClick={() => setFeedback("INCORRECT")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-surface border border-cyber-border hover:border-rose-500/50 hover:text-rose-400 text-slate-300 transition-colors"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
              <span>Inaccurate</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
