"use client";

import React from "react";
import { Shield, Sparkles, History, BarChart3, BookOpen, Award, Settings, Terminal } from "lucide-react";

interface NavbarProps {
  activeTab: "scanner" | "analytics" | "history" | "education" | "evaluation";
  setActiveTab: (tab: "scanner" | "analytics" | "history" | "education" | "evaluation") => void;
  onOpenJudgeDemo: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenJudgeDemo,
  onOpenSettings,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-border/80 bg-cyber-bg/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div 
          onClick={() => setActiveTab("scanner")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
            <Shield className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Phish<span className="text-cyan-400">Lens</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                <Sparkles className="w-2.5 h-2.5" />
                Gemma 4
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide hidden sm:block">
              Multimodal Phishing &amp; Scam Intelligence
            </p>
          </div>
        </div>

        {/* Center navigation tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-cyber-card/60 p-1 rounded-xl border border-cyber-border">
          <button
            onClick={() => setActiveTab("scanner")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "scanner"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-cyber-surface"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Scanner
          </button>

          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "analytics"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-cyber-surface"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Threat Intel
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "history"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-cyber-surface"
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Scan History
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "education"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-cyber-surface"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Education Mode
          </button>

          <button
            onClick={() => setActiveTab("evaluation")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === "evaluation"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-cyber-surface"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Eval &amp; Adversarial
          </button>
        </nav>

        {/* Right side CTAs */}
        <div className="flex items-center gap-2.5">
          {/* Judge Demo Quick Tour CTA */}
          <button
            onClick={onOpenJudgeDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/40 hover:border-amber-400 hover:bg-amber-500/30 transition-all shadow-[0_0_12px_rgba(245,158,11,0.15)]"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Judge Demo Tour</span>
            <span className="sm:hidden">Demo</span>
          </button>

          {/* Settings modal trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-cyber-card border border-cyber-border text-slate-400 hover:text-slate-200 hover:border-cyber-hover transition-colors"
            title="System & API Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
