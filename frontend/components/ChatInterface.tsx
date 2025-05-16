// frontend/components/ChatInterface.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import MessageList from './MessageList';

// 1. Define the message type
type Message = {
  role: 'user' | 'bot';
  content: string;
};

// 2. Define props type for the ChatInterface component
interface ChatInterfaceProps {
  initialQuery?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialQuery = '' }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // 3. Handle submit with proper types and error handling
  const handleSubmit = useCallback(
    async (customInput?: string) => {
      const question = typeof customInput === 'string' ? customInput : input;
      if (!question.trim() || loading) return;

      setLoading(true);
      const userMessage: Message = { role: 'user', content: question };
      setMessages((prev) => [...prev, userMessage]);
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
            {
              role: 'bot',
              content: `Server error (code: ${res.status}).\n${errorText || 'Please try again.'}`,
            },
          ]);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data && typeof data.answer === 'string') {
          setMessages((prev) => [...prev, { role: 'bot', content: data.answer }]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: 'bot', content: 'Invalid response from the server.' },
          ]);
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content: 'Network error. Please check your connection and try again.',
          },
        ]);
      }
      setLoading(false);
    },
    [input, loading]
  );

  // 4. If an initial query is provided, run it once
  useEffect(() => {
    if (initialQuery) {
      handleSubmit(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <footer className="px-6 py-4 border-t flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Ask ChemGPT something..."
          className="flex-1 border border-gray-300 rounded px-4 py-2"
          disabled={loading}
          autoFocus
        />
        <button
          onClick={() => handleSubmit()}
          className={`bg-blue-600 text-white px-4 py-2 rounded ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </footer>
    </div>
  );
};

export default ChatInterface;
