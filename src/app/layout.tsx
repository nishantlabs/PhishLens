import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhishLens — Multimodal Phishing & Scam Detector",
  description: "See the scam before you fall for it. Multimodal cybersecurity intelligence platform powered by Google Gemma 4.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-cyber-bg text-slate-100 antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
        {children}
      </body>
    </html>
  );
}
