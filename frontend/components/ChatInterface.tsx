import React, { useState, useEffect, useCallback, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MessageList from './MessageList';
import { Send } from 'lucide-react';

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
  const router = useRouter();

  // SEO & Dynamic Title
  const latestBotMsg = [...messages].reverse().find(msg => msg.role === 'bot');
  const defaultTitle = "chemGPT - ChemGPT AI Chat";
  const defaultDescription = "Ask questions about molecules, spectra, retrosynthesis, and chemistry with chemGPT. Your AI Chemistry Assistant.";
  const defaultImage = "/opengraph-image.png";
  const baseUrl = "https://www.chemgpt.app";

  let dynamicTitle = defaultTitle;
  let dynamicDescription = defaultDescription;
  if (latestBotMsg && typeof latestBotMsg.content === 'string') {
    const firstLine = latestBotMsg.content.split('\n')[0].split('.')[0].slice(0, 60);
    if (firstLine.length > 10) {
      dynamicTitle = `${firstLine} | chemGPT`;
      dynamicDescription = latestBotMsg.content.slice(0, 160).replace(/\n/g, " ");
    }
  }
  const canonicalUrl = `${baseUrl}${router.asPath}`;

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
    <>
      <Head>
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:image" content={defaultImage} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:image" content={defaultImage} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col h-screen w-full bg-neutral-950">
        {/* Main Chat Area */}
        <main className="flex-1 overflow-y-auto px-0 py-4">
          <MessageList messages={messages} />
          <div ref={bottomRef} />
        </main>
        {/* Sticky Input */}
        <footer className="sticky bottom-0 w-full bg-neutral-900 px-0 py-2 z-10 border-t border-neutral-800">
          <form
            className="flex items-center max-w-2xl mx-auto bg-neutral-800 rounded-2xl shadow px-3 py-2"
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
              className={`rounded-full p-3 hover:bg-cyan-700/20 transition ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
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
    </>
  );
};

export default ChatInterface;
