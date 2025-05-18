import React, { useState, useEffect, useCallback, useRef } from 'react';
import MessageList from './MessageList';
import { Send } from 'lucide-react'; // new

type Message = {
  role: 'user' | 'bot';
  content: string;
};

interface ChatInterfaceProps {
  initialQuery?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialQuery = '' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    async (customInput?: string) => {
      const question = typeof customInput === 'string' ? customInput : input;
      if (!question.trim() || loading) return;

      setLoading(true);
      setMessages((prev) => [...prev, { role: 'user', content: question }]);
      setInput('');

      try {
        const res = await fetch('https://chemgpt-pro.onrender.com/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question }),
        });
        if (!res.ok) {
          const errorText = await res.text();
          setMessages((prev) => [
            ...prev,
            { role: 'bot', content: `Server error (${res.status}): ${errorText || 'Try again.'}` },
          ]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: data?.answer || 'Invalid response from server.' },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: 'bot', content: 'Network error. Please try again.' },
        ]);
      }
      setLoading(false);
    },
    [input, loading]
  );

  useEffect(() => {
    if (initialQuery) handleSubmit(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-neutral-950 to-neutral-900">
      {/* Header */}
      <header className="flex items-center px-4 py-3 bg-neutral-950 shadow z-10">
        <span className="font-bold text-2xl text-cyan-400 tracking-tight select-none">ChemGPT</span>
        <span className="ml-3 text-sm text-neutral-400 font-mono hidden sm:inline">AI Chemistry Assistant</span>
      </header>

      {/* Chat area */}
      <main className="flex-1 overflow-y-auto px-2 pt-3 pb-4 md:px-0">
        <MessageList messages={messages} />
        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="w-full bg-neutral-900 px-2 md:px-0 py-3 z-10">
        <form
          className="flex max-w-xl mx-auto items-center gap-2 bg-neutral-800 rounded-2xl shadow-lg px-3 py-2"
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask ChemGPT something…"
            className="flex-1 bg-transparent outline-none border-none text-white text-base placeholder-neutral-400 px-2 py-2"
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className={`rounded-full p-2 hover:bg-cyan-700/20 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={loading}
            aria-label="Send"
          >
            {loading ? (
              <span className="animate-pulse px-2 text-cyan-300">...</span>
            ) : (
              <Send className="w-6 h-6 text-cyan-400" />
            )}
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatInterface;
