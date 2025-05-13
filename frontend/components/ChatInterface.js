import { useEffect, useState } from 'react'

export default function ChatInterface({ initialQuery = '' }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    if (initialQuery) handleAsk(initialQuery)
  }, [initialQuery])

  const handleAsk = async (question) => {
    setMessages(prev => [...prev, { role: 'user', content: question }])

    const res = await fetch('https://chemgpt-pro.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })
    const data = await res.json()

    setMessages(prev => [...prev, { role: 'user', content: question }, { role: 'bot', content: data.answer }])
  }

  const handleSubmit = async () => {
    if (!input.trim()) return
    await handleAsk(input.trim())
    setInput('')
  }

  return (
    <div className="flex flex-col flex-1 p-6 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-4 rounded-md ${msg.role === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-100 text-left'}`}>
            <div dangerouslySetInnerHTML={{ __html: msg.content }} />
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2 border-t pt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Ask ChemGPT something..."
          className="flex-1 px-4 py-2 border rounded shadow-sm"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  )
}
