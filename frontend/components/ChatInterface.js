import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

export default function ChatInterface({ initialQuery = '' }) {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  const sendMessage = async (question) => {
    if (!question.trim()) return;
    const userMessage = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('https://chemgpt-pro.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });

      const data = await res.json();
      const botMessage = { role: 'bot', content: data.answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMsg = { role: 'bot', content: '❌ An error occurred while contacting the backend.' };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  useEffect(() => {
    if (initialQuery) sendMessage(initialQuery);
  }, [initialQuery]);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <MessageList messages={messages} />
      </main>
      <footer className="border-t bg-white px-4 py-3">
        <ChatInput onSend={sendMessage} />
        <p className="text-center text-xs text-gray-500 mt-2">
          Built by MERAS ZIAD · <a href="/" className="underline">chemgpt.app</a>
        </p>
      </footer>
    </div>
  );
}
