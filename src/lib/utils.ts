import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ThreatVerdict } from "@/types/threat";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVerdictDetails(verdict: ThreatVerdict) {
  switch (verdict) {
    case 'SAFE':
      return {
        label: 'SAFE INTERACTION',
        badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        textColor: 'text-emerald-400',
        accentColor: '#00e699',
        border: 'border-emerald-500/40',
        bgGlow: 'shadow-[0_0_30px_rgba(0,230,153,0.15)]',
        description: 'No significant phishing or social engineering markers detected.'
      };
    case 'LOW_RISK':
      return {
        label: 'LOW RISK',
        badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        textColor: 'text-cyan-400',
        accentColor: '#00f0ff',
        border: 'border-cyan-500/40',
        bgGlow: 'shadow-[0_0_30px_rgba(0,240,255,0.15)]',
        description: 'Minor anomalies noted, but insufficient evidence of malicious intent.'
      };
    case 'SUSPICIOUS':
      return {
        label: 'SUSPICIOUS ARTIFACT',
        badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        textColor: 'text-amber-400',
        accentColor: '#ffaa00',
        border: 'border-amber-500/40',
        bgGlow: 'shadow-[0_0_30px_rgba(255,170,0,0.15)]',
        description: 'Multiple caution indicators identified. Exercise elevated vigilance.'
      };
    case 'HIGH_RISK':
      return {
        label: 'HIGH-RISK PHISHING',
        badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        textColor: 'text-rose-400',
        accentColor: '#ff3366',
        border: 'border-rose-500/40',
        bgGlow: 'shadow-[0_0_30px_rgba(255,51,102,0.2)]',
        description: 'Strong deceptive patterns, urgency cues, or credential theft vectors found.'
      };
    case 'CRITICAL':
      return {
        label: 'CRITICAL THREAT DETECTED',
        badgeColor: 'bg-red-600/20 text-red-400 border-red-500/50',
        textColor: 'text-red-500',
        accentColor: '#ef4444',
        border: 'border-red-500/60',
        bgGlow: 'shadow-[0_0_40px_rgba(239,68,68,0.3)]',
        description: 'Immediate threat. Active credential harvesting, financial fraud or spoofing.'
      };
  }
}

export function formatRiskScore(score: number): { level: ThreatVerdict; label: string } {
  if (score <= 20) return { level: 'SAFE', label: 'Safe (0-20)' };
  if (score <= 40) return { level: 'LOW_RISK', label: 'Low Risk (21-40)' };
  if (score <= 60) return { level: 'SUSPICIOUS', label: 'Suspicious (41-60)' };
  if (score <= 80) return { level: 'HIGH_RISK', label: 'High Risk (61-80)' };
  return { level: 'CRITICAL', label: 'Critical (81-100)' };
}
