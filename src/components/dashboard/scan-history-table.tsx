"use client";

import React from "react";
import { ScanHistoryItem } from "@/types/threat";
import { getVerdictDetails } from "@/lib/utils";
import { ExternalLink, Shield, Trash2 } from "lucide-react";

interface ScanHistoryTableProps {
  history: ScanHistoryItem[];
  onSelectScan: (id: string) => void;
  onClearHistory: () => void;
}

export const ScanHistoryTable: React.FC<ScanHistoryTableProps> = ({
  history,
  onSelectScan,
  onClearHistory,
}) => {
  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cyber-border mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Security Scan History
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Locally audited interactions. Select any item to re-examine full Threat Map &amp; signals.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-rose-400 hover:bg-rose-950/20 border border-cyber-border hover:border-rose-500/40 transition-colors self-start sm:self-center"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Local History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Shield className="w-10 h-10 mx-auto mb-3 opacity-40 text-slate-400" />
          <p className="text-sm">No historical scans recorded in this session.</p>
          <p className="text-xs text-slate-400 mt-1">Upload a screenshot in the Scanner to start building your threat record.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-cyber-border bg-cyber-surface/60 font-mono text-[11px] text-slate-400">
                <th className="py-3.5 px-4">TIMESTAMP</th>
                <th className="py-3.5 px-4">ARTIFACT NAME</th>
                <th className="py-3.5 px-4">CATEGORY</th>
                <th className="py-3.5 px-4">RISK SCORE</th>
                <th className="py-3.5 px-4">VERDICT</th>
                <th className="py-3.5 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/70">
              {history.map((item) => {
                const verdictInfo = getVerdictDetails(item.verdict);

                return (
                  <tr key={item.id} className="hover:bg-cyber-surface/40 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-xs">
                      {item.timestamp}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-200">
                      {item.filename}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-400 text-xs uppercase">
                      {item.primaryCategory.replace('_', ' ')}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">
                      <span className={`px-2 py-0.5 rounded ${
                        item.riskScore > 80
                          ? "bg-rose-950 text-rose-300"
                          : item.riskScore > 60
                          ? "bg-amber-950 text-amber-300"
                          : item.riskScore > 40
                          ? "bg-yellow-950 text-yellow-300"
                          : "bg-emerald-950 text-emerald-300"
                      }`}>
                        {item.riskScore} / 100
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider border ${verdictInfo.badgeColor}`}>
                        {item.verdict}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onSelectScan(item.id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-cyber-surface border border-cyber-border hover:border-cyan-400 hover:text-cyan-300 text-xs font-mono transition-colors"
                      >
                        <span>Inspect</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
