import React from "react";
import { Lock, EyeOff, ShieldAlert, Cpu, CheckCircle } from "lucide-react";

export const TrustSecurity: React.FC = () => {
  const principles = [
    {
      icon: EyeOff,
      title: "Ephemeral In-Memory Processing",
      desc: "Uploaded images are analyzed entirely in volatile memory and are not permanently retained on external databases."
    },
    {
      icon: Lock,
      title: "Strict Zero-Execution Sandbox",
      desc: "PhishLens never executes uploaded files, scripts, or APK payloads. All inspection is strictly passive."
    },
    {
      icon: ShieldAlert,
      title: "Passive Defensive Inspection",
      desc: "Suspicious URLs are dissected textually. Links are never automatically opened in live user browsers."
    },
    {
      icon: Cpu,
      title: "Zero Client Credential Leakage",
      desc: "Model credentials and API keys remain on server-side environment variables. No secrets leak to client bundles."
    }
  ];

  return (
    <section className="py-16 bg-cyber-bg border-b border-cyber-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-cyan-500/30 bg-cyber-card/60 p-8 sm:p-12 relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-4">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Cybersecurity &amp; Privacy Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Defensive by Design. Private by Default.
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              We know phishing screenshots often contain confidential information like phone numbers, names, or account snippets.
              <strong className="text-white block mt-1">
                Your screenshot is analyzed securely and is not retained by default.
              </strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="bg-cyber-surface/90 border border-cyber-border rounded-xl p-5 hover:border-cyan-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-100 mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
