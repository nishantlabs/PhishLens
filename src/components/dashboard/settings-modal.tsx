"use client";

import React, { useState } from "react";
import { Settings, Key, Shield, EyeOff, Check, X, Info } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  const [saved, setSaved] = useState(false);
  const [ephemeralMode, setEphemeralMode] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem("phishlens_custom_api_key", apiKey.trim());
    } else {
      localStorage.removeItem("phishlens_custom_api_key");
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100">
        
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
              PhishLens System &amp; Privacy Settings
            </h2>
            <p className="text-xs text-slate-400">
              Manage Gemma 4 inference keys and security policies
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 text-xs sm:text-sm">
          
          {/* API Key configuration */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              <span>Google GenAI / Gemini API Key (Optional)</span>
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... (leave blank to use built-in Gemma 4 hybrid engine)"
              className="w-full bg-cyber-surface border border-cyber-border rounded-xl px-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              If left blank, PhishLens operates using its built-in Gemma 4 multi-layer reasoning adapter with zero external dependency delays.
            </p>
          </div>

          {/* Privacy Toggles */}
          <div className="p-4 rounded-xl bg-cyber-surface/70 border border-cyber-border space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-semibold text-xs text-slate-200">Ephemeral In-Memory Scanning</div>
                  <div className="text-[11px] text-slate-400">Never save uploaded screenshots to persistent storage</div>
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
              <strong>Guaranteed:</strong> Your screenshot is analyzed securely and is not retained by default. No uploaded data is transmitted to advertisers or non-security third parties.
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
              <span>Save Preferences</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
