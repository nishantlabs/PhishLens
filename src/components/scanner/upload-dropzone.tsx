"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Camera, Clipboard, FileText, Image as ImageIcon, Sparkles, X, AlertCircle } from "lucide-react";
import { DemoScenario } from "@/types/threat";

interface UploadDropzoneProps {
  onScanFile: (file: File, extractedText?: string) => void;
  onSelectScenario: (scenario: DemoScenario) => void;
  isScanning: boolean;
  demoScenarios: DemoScenario[];
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onScanFile,
  onSelectScenario,
  isScanning,
  demoScenarios,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [manualText, setManualText] = useState("");
  const [showTextTab, setShowTextTab] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Handle Clipboard Paste (Ctrl+V)
  const handlePaste = useCallback((e: ClipboardEvent) => {
    if (isScanning) return;
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          processFile(file);
          e.preventDefault();
          break;
        }
      }
    }
  }, [isScanning]);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  const processFile = (file: File) => {
    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image file (PNG, JPG, WEBP, or SVG).");
      return;
    }

    // Size limit 10MB
    if (file.size > 10 * 1024 * 1024) {
      alert("Image exceeds 10MB limit. Please upload a smaller screenshot.");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleTriggerAnalysis = () => {
    if (selectedFile) {
      onScanFile(selectedFile, manualText.trim() || undefined);
    } else if (manualText.trim()) {
      // Create synthetic image from text if text-only entered
      const textBlob = new Blob([manualText], { type: "text/plain" });
      const syntheticFile = new File([textBlob], "text-artifact.txt", { type: "text/plain" });
      onScanFile(syntheticFile, manualText);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    if (previewUrl && !previewUrl.startsWith("data:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setManualText("");
  };

  return (
    <div className="w-full">
      {/* Dropzone Card */}
      <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Toggle between Screenshot Upload and Text Input */}
        <div className="flex items-center justify-between mb-6 border-b border-cyber-border pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTextTab(false)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !showTextTab
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Screenshot / Image Upload
            </button>
            <button
              onClick={() => setShowTextTab(true)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                showTextTab
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Message / Text Input
            </button>
          </div>

          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Drag &amp; Drop or <kbd className="px-1.5 py-0.5 rounded bg-cyber-surface border border-cyber-border text-slate-300">Ctrl+V</kbd> to Paste
          </span>
        </div>

        {/* Upload Zone or Preview */}
        {!previewUrl && !showTextTab ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all ${
              dragActive
                ? "border-cyan-400 bg-cyan-950/20 scale-[0.99]"
                : "border-cyber-border hover:border-slate-500 bg-cyber-surface/40"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && processFile(e.target.files[0])}
            />

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
              <Upload className="w-8 h-8" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              Upload Screenshot of Suspicious Message or Page
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6">
              Drop screenshot here, paste from clipboard (<kbd className="text-cyan-300">Ctrl+V</kbd>), or pick from camera. Supports Email, WhatsApp, SMS, NetBanking, QR &amp; Payment screens.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 shadow-md"
              >
                <Upload className="w-3.5 h-3.5 text-slate-950" />
                Select Image File
              </button>

              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyber-card border border-cyber-border text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center gap-2 sm:hidden"
              >
                <Camera className="w-3.5 h-3.5" />
                Capture with Camera
              </button>
            </div>
          </div>
        ) : previewUrl ? (
          /* Preview state */
          <div className="border border-cyber-border rounded-xl p-4 bg-cyber-surface/60">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-cyber-border">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono text-slate-300">
                  {selectedFile ? selectedFile.name : "Selected Security Artifact"}
                </span>
                {selectedFile && (
                  <span className="text-[10px] text-slate-400">
                    ({Math.round(selectedFile.size / 1024)} KB)
                  </span>
                )}
              </div>
              <button
                onClick={clearSelection}
                className="text-slate-400 hover:text-rose-400 text-xs flex items-center gap-1 transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>

            <div className="relative max-h-96 overflow-hidden rounded-lg border border-cyber-border bg-black/40 flex items-center justify-center p-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Preview screenshot"
                className="max-h-80 w-auto object-contain rounded"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-cyan-400" />
                Image ready for Gemma 4 multimodal spatial &amp; semantic scan.
              </p>

              <button
                disabled={isScanning}
                onClick={handleTriggerAnalysis}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isScanning ? "Analyzing Signals..." : "Run Gemma 4 Threat Scan"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Text input tab */
          <div className="space-y-4">
            <textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Paste suspicious SMS, Hinglish notice, WhatsApp message or URL here... e.g.: 'Dear Customer, your SBI account बंद हो जाएगा within 24 hours. Update KYC on bit.ly/sbi-kyc-pan'"
              className="w-full h-36 bg-cyber-surface border border-cyber-border rounded-xl p-4 text-xs font-mono text-slate-200 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
            />
            <div className="flex justify-end">
              <button
                disabled={isScanning || !manualText.trim()}
                onClick={handleTriggerAnalysis}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 hover:from-cyan-300 hover:to-blue-400 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isScanning ? "Processing..." : "Analyze Suspicious Message"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Demo Scenarios Quick Pick (Section 13) */}
        <div className="mt-8 pt-6 border-t border-cyber-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              TRY REALISTIC DEMO SCENARIOS (1-CLICK LOAD)
            </span>
            <span className="text-[11px] text-slate-400">Includes Legitimate Baseline</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {demoScenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                onClick={() => onSelectScenario(scenario)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  scenario.isLegitimate
                    ? "bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400/70"
                    : "bg-cyber-surface/80 border-cyber-border hover:border-cyan-500/40 hover:bg-cyber-hover"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                  <span className={scenario.isLegitimate ? "text-emerald-400 font-semibold" : "text-slate-400"}>
                    {scenario.platform}
                  </span>
                  <span className={`px-1.5 py-0.2 rounded text-[9px] ${
                    scenario.isLegitimate
                      ? "bg-emerald-500/20 text-emerald-300"
                      : "bg-rose-500/20 text-rose-300"
                  }`}>
                    {scenario.isLegitimate ? "SAFE" : "ATTACK"}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-200 line-clamp-1">{scenario.title}</div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
