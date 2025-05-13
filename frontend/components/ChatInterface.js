import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const router = useRouter();

  const fetchAnswer = async (question) => {
    const res = await fetch('https://chemgpt-pro.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });
    const data = await res.json();
    setMessages([
      { role: 'user', content: question },
      { role: 'bot', content: data.answer }
    ]);
  };

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await fetchAnswer(input);
    setInput('');
  };

  useEffect(() => {
    const query = router.query.question;
    if (query) fetchAnswer(query);
  }, [router.query]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-blue-600">ChemGPT</a>
        <nav className="space-x-6 text-sm">
          <a href="/chat" className="hover:text-blue-600">Chat</a>
          <a href="/molecule" className="hover:text-blue-600">Molecule</a>
          <a href="/retro" className="hover:text-blue-600">Retro</a>
          <a href="/spectro" className="hover:text-blue-600">Spectro</a>
        </nav>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-4">
        {messages.map((msg, i) => (
          <div key={i} className={`my-4 p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-green-100 text-left'}`}>
            <div dangerouslySetInnerHTML={{ __html: msg.content }} />
          </div>
        ))}
      </main>

      <footer className="bg-white px-6 py-3 shadow-inner">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about chemistry..."
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="flex-1 border border-gray-300 rounded px-4 py-2"
          />
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Send
          </button>
        </div>
        <p className="text-center text-xs text-gray-500 mt-2">
          Built by MERAS ZIAD · chemgpt.app
        </p>
      </footer>
    </div>
  );
}
