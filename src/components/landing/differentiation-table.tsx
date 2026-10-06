import React from "react";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";

export const DifferentiationTable: React.FC = () => {
  const comparisons = [
    {
      dimension: "Detection Focus",
      traditional: "URL-centric blacklist lookups",
      phishlens: "Multimodal security artifact analysis",
      winner: "phishlens"
    },
    {
      dimension: "Methodology",
      traditional: "Static rule matching & database hashes",
      phishlens: "Gemma 4 Multimodal AI + Deterministic Layer",
      winner: "phishlens"
    },
    {
      dimension: "Input Modality",
      traditional: "Text / Raw string URLs only",
      phishlens: "Screenshots, UI layouts, OCR text & QR payloads",
      winner: "phishlens"
    },
    {
      dimension: "Domain Defense",
      traditional: "Reactive domain blocklists (hours/days lag)",
      phishlens: "Zero-hour contextual & visual brand spoofing detection",
      winner: "phishlens"
    },
    {
      dimension: "Output Format",
      traditional: "Opaque binary flag: 'Phish / Clean'",
      phishlens: "Explainable 0–100 score + Contributing Factors",
      winner: "phishlens"
    },
    {
      dimension: "Visual Intelligence",
      traditional: "Blind to UI mimicry, fake badges, cloned layouts",
      phishlens: "Interactive Threat Map highlighting spoofed regions",
      winner: "phishlens"
    },
    {
      dimension: "Psychological Reasoning",
      traditional: "None (ignores urgency or social engineering)",
      phishlens: "Identifies Urgency, Authority, Fear & Scarcity cues",
      winner: "phishlens"
    },
    {
      dimension: "Action Guidance",
      traditional: "Generic 'Do not proceed' browser interstitial",
      phishlens: "Actionable DO / DO NOT directives + Interactive Q&A",
      winner: "phishlens"
    }
  ];

  return (
    <section className="py-16 border-b border-cyber-border/60 bg-cyber-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3 h-3" />
            <span>Why Traditional Scanners Fail</span>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
            Technical Differentiation
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Modern scammers bypass domain blacklists using temporary URLs, Telegram redirects, and reverse UPI QR codes. PhishLens operates on the complete interaction context.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-cyber-border bg-cyber-card shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-cyber-border bg-cyber-surface/90 text-xs font-mono tracking-wider">
                  <th className="py-4 px-6 text-slate-300">DIMENSION</th>
                  <th className="py-4 px-6 text-slate-400">TRADITIONAL DETECTORS</th>
                  <th className="py-4 px-6 text-cyan-400 bg-cyan-950/30 border-l border-r border-cyan-500/30">
                    PHISHLENS (GEMMA 4)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-border text-xs sm:text-sm">
                {comparisons.map((row, idx) => (
                  <tr key={idx} className="hover:bg-cyber-surface/40 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-200">
                      {row.dimension}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      <div className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{row.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-cyan-200 bg-cyan-950/20 border-l border-r border-cyan-500/20 font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{row.phishlens}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
