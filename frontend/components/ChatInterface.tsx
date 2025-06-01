"use client";
import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
const SpectroPlot = dynamic(() => import("@/components/SpectroPlot"), { ssr: false });

interface Message {
  role: "user" | "assistant";
  content: string;
  spectroData?: any;
}

interface ChatInterfaceProps {
  initialQuery?: string;
}

const GATEWAY_CHAT_URL = "https://chemgpt-gateway-production.up.railway.app/chat";

function formatSpectroscopyMessage(data: any): string {
  const uv = data.uv?.peaks ?? [];
  const ir = data.ir?.peaks ?? [];
  const explanation = data.explanation ?? "";

  let uvTable = "### 📈 UV Spectrum\n\n| λ (nm) | Intensity | Type |\n|--------|-----------|------|\n";
  uv.forEach((peak: any) => {
    uvTable += `| ${peak.wavelength} | ${peak.intensity} | ${peak.type || ""} |\n`;
  });

  let irTable = "### 🔬 IR Spectrum\n\n| Wavenumber (cm⁻¹) | Intensity | Assignment |\n|-------------------|-----------|------------|\n";
  ir.forEach((peak: any) => {
    irTable += `| ${peak.wavenumber} | ${peak.intensity} | ${peak.assignment || ""} |\n`;
  });

  return `${uvTable}\n\n${irTable}\n\n### 🧠 Explanation\n\n${explanation}`;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialQuery = "" }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>(initialQuery);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasSentInitialQuery = useRef(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialQuery && !hasSentInitialQuery.current) {
      hasSentInitialQuery.current = true;
      handleSend(undefined, initialQuery);
    }
  }, [initialQuery]);

  // 🧠 All-in-one chat — calls only /chat API
  async function handleSend(e?: FormEvent, customInput?: string) {
    if (e) e.preventDefault();
    const query = customInput !== undefined ? customInput : input.trim();
    if (!query) return;

    setMessages((msgs) => [...msgs, { role: "user", content: query }]);
    setInput("");

    try {
      const res = await fetch(GATEWAY_CHAT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });

      const data = await res.json();

      let answerContent = "";
      let spectroData = undefined;

      if (data.type === "extract") {
        answerContent =
          `**Extracted compounds:**\n\n` +
          (data.answer.entities?.compounds?.length
            ? data.answer.entities.compounds.join(", ")
            : "_No compounds found._");
      } else if (data.type === "spectro") {
        answerContent = formatSpectroscopyMessage(data.answer);
        spectroData = {
          uv: data.answer.uv?.peaks ?? [],
          ir: data.answer.ir?.peaks ?? [],
        };
      } else if (data.type === "retro") {
        answerContent = `**Retrosynthesis Result:**\n\n\`\`\`json\n${JSON.stringify(data.answer, null, 2)}\n\`\`\``;
      } else {
        answerContent = typeof data.answer === "string"
          ? data.answer
          : JSON.stringify(data.answer, null, 2);
      }

      setMessages((msgs) => [
        ...msgs,
        {
          role: "assistant",
          content: answerContent,
          spectroData,
        }
      ]);
    } catch (error) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) handleSend();
  }

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto min-h-[72vh] sm:min-h-[80vh] bg-white/90 rounded-2xl shadow-xl px-2 py-8 mt-4 mb-8 relative overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-h-[80vh] px-1 pb-32">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <span>Ask your chemistry question to ChemGPT…</span>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`mb-4 px-4 py-3 max-w-[85%] text-base shadow-md prose prose-slate
                ${
                  msg.role === "user"
                    ? "bg-cyan-500 text-white rounded-xl rounded-br-sm self-end"
                    : "bg-violet-50 text-gray-900 border border-violet-100 rounded-xl rounded-bl-sm self-start"
                }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={{
                  code({node, inline, className, children, ...props}) {
                    return (
                      <code
                        className={
                          "bg-gray-200 px-1 rounded text-[0.95em] " + (className || "")
                        }
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {msg.content}
              </ReactMarkdown>
              {msg.role === "assistant" && msg.spectroData && (
                <SpectroPlot uv={msg.spectroData.uv} ir={msg.spectroData.ir} />
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        className="absolute bottom-0 left-0 w-full flex justify-center bg-gradient-to-t from-white via-slate-50 to-transparent px-2 pb-4 pt-3"
        onSubmit={handleSend}
      >
        <div className="w-full max-w-2xl flex bg-white rounded-xl border border-gray-300 shadow-lg p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask ChemGPT something…"
            className="flex-grow p-3 rounded-lg text-black border-none focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-white"
            autoFocus
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-cyan-500 rounded-lg text-white font-semibold hover:bg-cyan-600 transition"
            disabled={!input.trim()}
          >
            <svg className="w-6 h-6 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 12l16-8-7 7m0 0l7 7-16-8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
