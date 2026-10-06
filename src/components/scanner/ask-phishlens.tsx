"use client";

import React, { useState } from "react";
import { ThreatAssessment, ChatMessage } from "@/types/threat";
import { MessageSquare, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface AskPhishLensProps {
  assessment: ThreatAssessment;
}

export const AskPhishLens: React.FC<AskPhishLensProps> = ({ assessment }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial",
      role: "assistant",
      content: `I have completed the multimodal threat analysis for this artifact. It was scored ${assessment.riskScore}/100 (${assessment.verdict}). Ask me anything about the suspicious elements, attack mechanics, or safe next steps.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "Why is this dangerous?",
    "What should I do right now?",
    "Is the URL in this message legitimate?",
    "Does scanning a QR code ever require my PIN?"
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg.content,
          assessment
        })
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.reply || "Analysis concluded: follow the recommended DO and DO NOT guidelines above.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: "PhishLens recommends: Do not click the link, do not enter credentials or PIN, and verify directly through the official app.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-cyber-card border border-cyber-border rounded-2xl p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center justify-between pb-4 border-b border-cyber-border mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Ask PhishLens Assistant
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                Grounded in Artifact
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive cybersecurity assistant conditioned on this scan report.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="space-y-3 max-h-72 overflow-y-auto mb-4 pr-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 text-xs ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}
            <div
              className={`p-3 rounded-xl max-w-lg leading-relaxed ${
                msg.role === "user"
                  ? "bg-cyan-600/30 border border-cyan-500/40 text-cyan-100"
                  : "bg-cyber-surface border border-cyber-border text-slate-200"
              }`}
            >
              <p>{msg.content}</p>
              <span className="text-[9px] font-mono text-slate-400 block text-right mt-1">
                {msg.timestamp}
              </span>
            </div>
            {msg.role === "user" && (
              <div className="w-6 h-6 rounded-md bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 text-xs items-center text-slate-400">
            <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            </div>
            <span>PhishLens reasoning grounded in report...</span>
          </div>
        )}
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-lg text-[11px] bg-cyber-surface border border-cyber-border text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this artifact..."
          className="flex-1 bg-cyber-surface border border-cyber-border rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 flex items-center justify-center"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
