"use client";

import React, { useState } from "react";
import { BoundingBox } from "@/types/threat";
import { Eye, AlertTriangle, ShieldCheck, Info, X, Sparkles } from "lucide-react";

interface ThreatMapProps {
  imageUrl: string;
  indicators: BoundingBox[];
}

export const ThreatMap: React.FC<ThreatMapProps> = ({ imageUrl, indicators }) => {
  const [selectedBox, setSelectedBox] = useState<BoundingBox | null>(
    indicators.length > 0 ? indicators[0] : null
  );
  const [showOverlays, setShowOverlays] = useState(true);

  const getBoxStyle = (cat: BoundingBox["category"]) => {
    switch (cat) {
      case "url":
      case "credential":
        return {
          border: "border-rose-500",
          bg: "bg-rose-500/20",
          badge: "bg-rose-950 text-rose-300 border-rose-500/50",
          glow: "shadow-[0_0_15px_rgba(244,63,94,0.4)]",
          color: "#f43f5e",
        };
      case "urgency":
      case "branding":
        return {
          border: "border-amber-500",
          bg: "bg-amber-500/20",
          badge: "bg-amber-950 text-amber-300 border-amber-500/50",
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.4)]",
          color: "#f59e0b",
        };
      case "payment":
      case "qr":
        return {
          border: "border-yellow-400",
          bg: "bg-yellow-400/20",
          badge: "bg-yellow-950 text-yellow-300 border-yellow-400/50",
          glow: "shadow-[0_0_15px_rgba(250,204,21,0.4)]",
          color: "#facc15",
        };
      case "safe":
      default:
        return {
          border: "border-emerald-500",
          bg: "bg-emerald-500/20",
          badge: "bg-emerald-950 text-emerald-300 border-emerald-500/50",
          glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]",
          color: "#10b981",
        };
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-cyber-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-base text-white tracking-wide">
              Spatial Threat Map &amp; Visual Grounding
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Gemma 4 spatial coordinates highlighting deceptive UI elements, fake badges, and traps.
          </p>
        </div>

        {/* Toggle overlay visibility */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setShowOverlays(!showOverlays)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-colors flex items-center gap-1.5 ${
              showOverlays
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                : "bg-cyber-surface text-slate-400 border-cyber-border"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showOverlays ? "Threat Overlay: ON" : "Threat Overlay: OFF"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Screenshot + Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Screenshot Viewport with Overlays (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl border border-cyber-border bg-black/60 shadow-inner group">
            {/* Base Screenshot */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt="Analyzed Security Artifact"
              className="w-full h-auto object-contain block select-none pointer-events-none"
            />

            {/* Bounding Box Highlights */}
            {showOverlays && (
              <div className="absolute inset-0 pointer-events-auto">
                {indicators.map((box) => {
                  const style = getBoxStyle(box.category);
                  const isSelected = selectedBox?.id === box.id;

                  return (
                    <div
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      style={{
                        left: `${box.x}%`,
                        top: `${box.y}%`,
                        width: `${box.width}%`,
                        height: `${box.height}%`,
                      }}
                      className={`absolute border-2 cursor-pointer transition-all duration-200 group/box ${
                        style.border
                      } ${style.bg} ${
                        isSelected
                          ? `ring-2 ring-white scale-[1.01] z-20 ${style.glow}`
                          : "opacity-85 hover:opacity-100 hover:scale-[1.005] z-10"
                      }`}
                    >
                      {/* Floating Category Tag */}
                      <span
                        className={`absolute -top-3.5 left-2 px-1.5 py-0.2 rounded text-[10px] font-mono font-bold uppercase tracking-wider border shadow-md flex items-center gap-1 ${
                          style.badge
                        }`}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: style.color }}
                        />
                        {box.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
            Click any highlighted region above to inspect its security hazard breakdown.
          </p>
        </div>

        {/* Threat Map Inspector Drawer (5 cols) */}
        <div className="lg:col-span-5 bg-cyber-surface/90 border border-cyber-border rounded-xl p-5 shadow-lg">
          {selectedBox ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-cyber-border mb-4">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                  REGION INSPECTION
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wide border ${
                    selectedBox.severity === "CRITICAL"
                      ? "bg-rose-950 text-rose-400 border-rose-500/50"
                      : selectedBox.severity === "HIGH"
                      ? "bg-amber-950 text-amber-400 border-amber-500/50"
                      : selectedBox.severity === "SAFE"
                      ? "bg-emerald-950 text-emerald-400 border-emerald-500/50"
                      : "bg-yellow-950 text-yellow-400 border-yellow-500/50"
                  }`}
                >
                  {selectedBox.severity} SEVERITY
                </span>
              </div>

              <h4 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                {selectedBox.label}
              </h4>

              <div className="mb-4">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                  Why this matters
                </div>
                <p className="text-xs text-slate-300 leading-relaxed bg-cyber-card/80 p-3 rounded-lg border border-cyber-border">
                  {selectedBox.whyItMatters}
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-cyber-border/60">
                  <span className="text-slate-400">Threat Category:</span>
                  <span className="font-mono text-slate-200 uppercase font-semibold">
                    {selectedBox.category}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-cyber-border/60">
                  <span className="text-slate-400">Bounding Coordinate:</span>
                  <span className="font-mono text-slate-400 text-[11px]">
                    X:{selectedBox.x}% Y:{selectedBox.y}% W:{selectedBox.width}% H:{selectedBox.height}%
                  </span>
                </div>
              </div>

              {/* List of other boxes */}
              <div className="mt-6 pt-4 border-t border-cyber-border">
                <div className="text-[11px] font-mono text-slate-400 uppercase mb-2">
                  All Detected Regions ({indicators.length})
                </div>
                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                  {indicators.map((box) => (
                    <button
                      key={box.id}
                      onClick={() => setSelectedBox(box)}
                      className={`w-full text-left p-2 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between ${
                        selectedBox.id === box.id
                          ? "bg-cyan-950/40 border-cyan-500/60 text-cyan-300"
                          : "bg-cyber-card border-cyber-border text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span className="truncate pr-2">{box.label}</span>
                      <span className="text-[10px] font-mono shrink-0 uppercase">{box.category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              <Info className="w-8 h-8 mx-auto mb-2 text-slate-400" />
              Select an indicator from the map or list to view security reasoning.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
