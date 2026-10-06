"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { ShieldAlert, ShieldCheck, Activity, Target, AlertTriangle } from "lucide-react";

export const AnalyticsOverview: React.FC = () => {
  const categoryData = [
    { name: "Phishing & Fake Login", value: 38, color: "#ff3366" },
    { name: "Payment & UPI QR Scam", value: 24, color: "#f59e0b" },
    { name: "Brand Impersonation", value: 18, color: "#00f0ff" },
    { name: "Fake KYC & Electricity", value: 14, color: "#a855f7" },
    { name: "Legitimate Baseline", value: 6, color: "#10b981" },
  ];

  const timelineData = [
    { day: "Mon", avgRisk: 64, scans: 14 },
    { day: "Tue", avgRisk: 72, scans: 22 },
    { day: "Wed", avgRisk: 81, scans: 31 },
    { day: "Thu", avgRisk: 69, scans: 25 },
    { day: "Fri", avgRisk: 88, scans: 38 },
    { day: "Sat", avgRisk: 84, scans: 29 },
    { day: "Sun", avgRisk: 79, scans: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-cyber-card border border-cyber-border shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>TOTAL SCANS ANALYZED</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">1,842</div>
          <div className="text-[11px] text-cyan-400 font-mono mt-1">▲ +24% this week</div>
        </div>

        <div className="p-5 rounded-2xl bg-cyber-card border border-cyber-border shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>THREAT DETECTION RATE</span>
            <Target className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-extrabold text-rose-400">89.4%</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">High/Critical malicious ratio</div>
        </div>

        <div className="p-5 rounded-2xl bg-cyber-card border border-cyber-border shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>AVERAGE RISK SCORE</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400">76.8</div>
          <div className="text-[11px] text-slate-400 font-mono mt-1">High-Risk tier benchmark</div>
        </div>

        <div className="p-5 rounded-2xl bg-cyber-card border border-cyber-border shadow-md">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span>CRITICAL ATTACKS PREVENTED</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-400">1,647</div>
          <div className="text-[11px] text-emerald-400 font-mono mt-1">Zero credential leaks</div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Risk Trend Chart (7 cols) */}
        <div className="lg:col-span-7 bg-cyber-card border border-cyber-border rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Threat Risk Index Over Time</h3>
              <p className="text-xs text-slate-400">Weekly tracking of average severity and volume</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/30">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[40, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0b0f19", borderColor: "#1e293b", fontSize: 12 }}
                  labelStyle={{ color: "#00f0ff", fontWeight: "bold" }}
                />
                <Area type="monotone" dataKey="avgRisk" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#riskGradient)" name="Avg Risk Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Donut Chart (5 cols) */}
        <div className="lg:col-span-5 bg-cyber-card border border-cyber-border rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white mb-1">Threat Category Distribution</h3>
            <p className="text-xs text-slate-400 mb-4">Breakdown of analyzed attack vectors</p>

            <div className="h-48 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0b0f19", borderColor: "#1e293b", fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-cyber-border text-xs">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-300">{item.name}</span>
                </div>
                <span className="font-mono text-slate-400 font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
