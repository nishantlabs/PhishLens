"use client";

import React, { useState } from "react";
import { Award, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, X, ShieldAlert, ShieldCheck } from "lucide-react";
import { DemoScenario } from "@/types/threat";

interface JudgeDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: DemoScenario) => void;
  scenarios: DemoScenario[];
}

export const JudgeDemoModal: React.FC<JudgeDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
  scenarios,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: "1. The Modern Scam Dilemma",
      subtitle: "Why Traditional Antivirus & URL Blocklists Fail",
      content: "Scammers no longer rely on static blacklisted domains. They send high-pressure screenshots on WhatsApp, SMS with Bitly links, and QR codes requiring PIN entry to 'receive cashback'. Traditional URL scanners see nothing; humans panic and comply.",
      highlight: "PhishLens evaluates the entire interaction holistically.",
      actionLabel: "Next: Analyze Attack Artifact",
      scenarioTarget: null
    },
    {
      title: "2. Real Attack: State Bank KYC Hinglish Scam",
      subtitle: "Multimodal Visual + NLP Linguistic Threat Fusion",
      content: "Watch how PhishLens analyzes a realistic Hinglish SMS: 'Your SBI Account बंद हो जाएगा within 24 hours. Update KYC on bit.ly/sbi-kyc-pan'. Gemma 4 detects the Hindi-English code-mixing, the 24h urgency coercion, and the obfuscated Bitly redirect.",
      highlight: "Produces 92/100 Risk Score + Spatial Threat Map coordinates.",
      actionLabel: "Load & Inspect Attack",
      scenarioTarget: scenarios.find(s => s.id === "demo-kyc-sms") || scenarios[1]
    },
    {
      title: "3. Spatial Threat Map & Interactive AI Grounding",
      subtitle: "Explainable AI Judges Can Click and Verify",
      content: "Instead of a black-box AI verdict, PhishLens renders an interactive Threat Map. Clicking any highlighted bounding box explains WHY it is dangerous, backed by a grounded Q&A assistant.",
      highlight: "Full transparency: non-arbitrary score breakdown (+25, +20, +15, +17).",
      actionLabel: "Next: Test the Reverse UPI Trap",
      scenarioTarget: null
    },
    {
      title: "4. The Reverse UPI QR Code Trap",
      subtitle: "Fatal Social Engineering: 'Enter PIN to Receive Money'",
      content: "A buyer sends a QR code claiming: 'Scan QR & Enter PIN to receive ₹15,000'. PhishLens passive jsQR scanner extracts the debit payload and alerts the user to the golden rule: You never need a PIN to receive funds.",
      highlight: "Scored 96/100 Critical Risk + Immediate Defensive DO/DO NOT directives.",
      actionLabel: "Load QR Attack Demo",
      scenarioTarget: scenarios.find(s => s.id === "demo-qr-scam") || scenarios[3]
    },
    {
      title: "5. The Legitimate Baseline (Zero False Positives)",
      subtitle: "Distinguishing Benign Messages from Real Scams",
      content: "To prove PhishLens doesn't just flag everything as dangerous, load an authentic HDFC transaction alert. The system verifies official telecom headers and drops the score down to 12/100 (Safe).",
      highlight: "Demonstrating high accuracy and zero alarm fatigue.",
      actionLabel: "Load Legitimate Control",
      scenarioTarget: scenarios.find(s => s.isLegitimate) || scenarios[5]
    }
  ];

  const current = steps[currentStep];

  const handleAction = () => {
    if (current.scenarioTarget) {
      onSelectScenario(current.scenarioTarget);
      onClose();
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-cyber-card border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.25)] text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyber-border">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              JUDGE DEMO MODE • 60-90 SECOND STORY WALKTHROUGH
            </div>
            <h2 className="text-xl font-bold text-white">
              {current.title}
            </h2>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-6">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? "w-10 bg-amber-400"
                  : idx < currentStep
                  ? "w-6 bg-amber-600/60"
                  : "w-4 bg-cyber-surface"
              }`}
            />
          ))}
          <span className="text-[11px] font-mono text-slate-400 ml-auto">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>

        {/* Content Body */}
        <div className="space-y-4 mb-8">
          <h3 className="text-sm font-semibold text-amber-300">
            {current.subtitle}
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {current.content}
          </p>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 flex items-center gap-3 text-xs text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{current.highlight}</span>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-cyber-border">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyber-surface border border-cyber-border text-slate-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Previous
          </button>

          <button
            onClick={handleAction}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            <span>{current.actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
