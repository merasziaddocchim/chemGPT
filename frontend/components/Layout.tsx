"use client";
import React, { useState, useRef, useEffect, FormEvent, KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// --- Message Type ---
interface Message {
  role: "user" | "assistant";
  content: string;
}

// --- Props for initial question support ---
interface ChatInterfaceProps {
  initialQuery?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialQuery = "" }) => {
  // --- State Management ---
  const [messages, setMessages] = useState<Message[]>(
    initialQuery
      ? [{ role: "user", content: initialQuery }]
      : []
  );
  const [input, setInput] = useState<string>("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // --- Scroll to bottom when messages update ---
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Auto send initialQuery if present (only once) ---
  useEffect(() => {
    if (initialQuery && messages.length === 1 && messages[0].role === "user") {
      handleSend(initialQuery, true);
    }
    // eslint-disable-next-line
  }, [initialQuery]);

  // --- Send Handler (with optional query param for initialQuery) ---
  async function handleSend(queryArg?: string, isInitial?: boolean) {
    const query = typeof queryArg === "string" ? queryArg : input.trim();
    if (!query) return;
    if (!isInitial) setMessages((msgs) => [...msgs, { role: "user", content: query }]);
    setInput("");
    try {
      const res = await fetch("https://chemgpt-pro.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: data.answer || "Sorry, I couldn't answer that." },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Network error. Please try again." },
      ]);
    }
  }

  // --- Enter Key Handler ---
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[85vh] py-10 px-2 sm:px-0 bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Chat Card */}
      <div className="relative flex flex-col w-full max-w-2xl min-h-[70vh] bg-white/90 rounded-2xl shadow-2xl border border-gray-100 px-4 sm:px-8 py-10">
        {/* Messages Section */}
        <div className="flex-1 overflow-y-auto pb-36">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-12">
              <span>Ask your chemistry question to ChemGPT…</span>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex mb-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  px-4 py-3 max-w-[80%] text-base leading-relaxed
                  shadow
                  break-words
                  ${msg.role === "user"
                    ? "bg-cyan-500 text-white rounded-xl rounded-br-sm self-end font-semibold"
                    : "bg-violet-50 text-gray-900 border border-violet-100 rounded-xl rounded-bl-sm self-start"
                  }
                `}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  className="prose prose-slate max-w-none"
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
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form
          className="absolute bottom-0 left-0 w-full flex justify-center bg-gradient-to-t from-white via-slate-50 to-transparent px-2 pb-4 pt-3"
          onSubmit={e => { e.preventDefault(); handleSend(); }}
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
    </div>
  );
};

export default ChatInterface;
