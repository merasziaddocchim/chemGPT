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
    const question = customInput || input
    if (!question.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: question }])
    setInput('')

    const res = await fetch('https://chemgpt-pro.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    })
    const data = await res.json()
    setMessages(prev => [...prev, { role: 'user', content: question }, { role: 'bot', content: data.answer }])
  }

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <footer className="px-6 py-4 border-t flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
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
