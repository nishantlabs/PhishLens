import React from "react";
import { Shield, Sparkles, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyber-border/80 bg-cyber-bg py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand and motto */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-200">
              Phish<span className="text-cyan-400">Lens</span>
            </div>
            <p className="text-[11px] text-slate-400">
              See the scam before you fall for it. Powered by Google Gemma 4.
            </p>
          </div>
        </div>

        {/* Defense and Privacy Notice */}
        <div className="text-center sm:text-right">
          <p className="text-slate-400">
            Strictly defensive cybersecurity product. No malicious payloads executed.
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            National Cyber Crime Reporting Portal: <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">cybercrime.gov.in</a> (Helpline: 1930)
          </p>
        </div>

      </div>
    </footer>
  );
};
