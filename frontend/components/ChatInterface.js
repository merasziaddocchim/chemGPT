import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import MessageList from './MessageList'

export default function ChatInterface({ initialQuery = '' }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (initialQuery) {
      handleSubmit(initialQuery)
    }
  }, [initialQuery])

  const handleSubmit = async (customInput) => {
  const question = customInput || input;
  if (!question.trim()) return;

  const userMessage = { role: 'user', content: question };
  setMessages(prevMessages => [...prevMessages, userMessage]);
  setInput('');

  try {
    const res = await fetch('https://chemgpt-pro.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    if (!res.ok) {
      console.error("API Error:", res.status, await res.text());
      const errorMessage = {
        role: 'bot',
        content: `Server error (code: ${res.status}). Please try again.`
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const data = await res.json();
    console.log('API response:', data);
    console.log('Answer:', data.answer);

    if (data && typeof data.answer === 'string') {
      const botMessage = { role: 'bot', content: data.answer };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } else {
      console.error("Invalid response format:", data);
      setMessages(prev => [...prev, {
        role: 'bot',
        content: "The server response is invalid or missing expected content."
      }]);
    }

  } catch (error) {
    console.error("Submit error:", error);
    setMessages(prev => [...prev, {
      role: 'bot',
      content: "Connection error. Please check your internet and try again."
    }]);
  }
};

console.log("Messages being rendered:", messages);

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <footer className="px-6 py-4 border-t flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSubmit();
  }
}}

          placeholder="Ask ChemGPT something..."
          className="flex-1 border border-gray-300 rounded px-4 py-2"
        />
        <button onClick={() => handleSubmit()} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </footer>
    </div>
  )
}
