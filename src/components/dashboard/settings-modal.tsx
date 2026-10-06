"use client";

import React, { useState, useEffect } from "react";
import { Settings, Cpu, Shield, EyeOff, Check, X, RefreshCw, CheckCircle2, XCircle, Key } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [hasServerKey, setHasServerKey] = useState(false);
  const [gemmaModel, setGemmaModel] = useState("gemma-4-26b-a4b-it");
  const [ephemeralMode, setEphemeralMode] = useState(true);
  const [saved, setSaved] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  // Load existing config on open
  useEffect(() => {
    if (!isOpen) return;
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data.gemmaModel) setGemmaModel(data.gemmaModel);
        if (data.hasApiKey) setHasServerKey(true);
      })
      .catch(() => {
        // use defaults
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      if (apiKey.trim()) {
        await fetch("/api/config", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ geminiApiKey: apiKey.trim(), gemmaModel }),
        });
      }

      // Query health endpoint
      const res = await fetch("/api/health/ai", { cache: "no-store" });
      const health = await res.json();

      if (health.status === "ok") {
        setTestResult({
          ok: true,
          message: `Connected to Google AI Studio! Model "${health.modelName}" active (${health.latencyMs}ms). Multimodal Vision: ${health.multimodalSupported ? "Supported" : "No"}`,
        });
      } else {
        setTestResult({
          ok: false,
          message: health.error || "Failed to reach Google AI Studio or model unavailable.",
        });
      }
    } catch (err: any) {
      setTestResult({
        ok: false,
        message: "Failed to connect to health endpoint.",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    try {
      const payload: Record<string, string> = { gemmaModel };
      if (apiKey.trim()) {
        payload.geminiApiKey = apiKey.trim();
      }
      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        onClose();
      }, 700);
    } catch {
      alert("Failed to save configuration.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyber-border">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              Google AI Studio &amp; Gemma 4 Settings
            </h2>
            <p className="text-xs text-slate-400">
              Configure Google AI Studio cloud reasoning and security policies
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 text-xs sm:text-sm">
          
          {/* API Key configuration */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google AI Studio API Key (GEMINI_API_KEY)</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder={hasServerKey ? "•••••••••••••••• (Active in .env.local)" : "Enter Google AI Studio API key"}
              className="w-full bg-cyber-surface border border-cyber-border rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Securely stored server-side. Never transmitted to or exposed in client browser code.
            </p>
          </div>

          {/* Gemma Model configuration */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google Gemma Model (GEMMA_MODEL)</span>
            </label>
            <input
              type="text"
              value={gemmaModel}
              onChange={(e) => setGemmaModel(e.target.value)}
              placeholder="gemma-4-26b-a4b-it"
              className="w-full bg-cyber-surface border border-cyber-border rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Primary multimodal reasoning model (default: <code className="text-cyan-300 font-mono">gemma-4-26b-a4b-it</code>).
            </p>
          </div>

          {/* Connection Test Section */}
          <div className="p-3.5 rounded-xl bg-cyber-surface/70 border border-cyber-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-300 font-medium">
                Test Google AI Connection
              </span>
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyber-card border border-cyan-500/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${testing ? "animate-spin" : ""}`} />
                <span>{testing ? "Testing..." : "Test Connection"}</span>
              </button>
            </div>

            {testResult && (
              <div
                className={`p-2.5 rounded-lg text-xs font-mono flex items-start gap-2 ${
                  testResult.ok
                    ? "bg-emerald-950/40 border border-emerald-500/30 text-emerald-300"
                    : "bg-rose-950/40 border border-rose-500/30 text-rose-300"
                }`}
              >
                {testResult.ok ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>

          {/* Privacy Toggles */}
          <div className="p-4 rounded-xl bg-cyber-surface/70 border border-cyber-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-semibold text-xs text-slate-200">Ephemeral In-Memory Scanning</div>
                  <div className="text-[11px] text-slate-400">Never save uploaded screenshots to persistent disk storage</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={ephemeralMode}
                onChange={(e) => setEphemeralMode(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-400 bg-cyber-card border-cyber-border cursor-pointer"
              />
            </div>
          </div>

          {/* Privacy statement callout */}
          <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-start gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Guaranteed:</strong> All inference requests are executed securely over encrypted HTTPS directly with Google AI Studio API. Screenshots are processed ephemerally and never retained.
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-cyber-border mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyber-surface border border-cyber-border text-slate-300 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors flex items-center gap-1.5 shadow-md"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Save Configuration</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
