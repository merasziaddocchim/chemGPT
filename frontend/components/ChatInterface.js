import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import MessageList from './MessageList'

export default function ChatInterface({ initialQuery = '' }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Memoize handleSubmit, now handles loading state!
  const handleSubmit = useCallback(async (customInput) => {
    const question = typeof customInput === "string" ? customInput : input
    if (!question.trim() || loading) return

    setLoading(true)
    const userMessage = { role: 'user', content: question }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    try {
      const res = await fetch('https://chemgpt-pro.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })

      if (!res.ok) {
        console.error('API Error:', res.status, await res.text())
        const errorMessage = {
          role: 'bot',
          content: `Server error (code: ${res.status}). Please try again.`
        }
        setMessages(prev => [...prev, errorMessage])
        setLoading(false)
        return
      }

      const data = await res.json()
      console.log('API response:', data)

      if (data && typeof data.answer === 'string') {
        setMessages(prev => [...prev, { role: 'bot', content: data.answer }])
      } else {
        setMessages(prev => [...prev, {
          role: 'bot',
          content: 'Invalid response from the server.'
        }])
      }
    } catch (error) {
      console.error('Submission error:', error)
      setMessages(prev => [...prev, {
        role: 'bot',
        content: 'Network error. Please check your connection and try again.'
      }])
    }
    setLoading(false)
  // loading is a dependency, so we don't re-create the function on every render
  }, [input, loading])

  useEffect(() => {
    if (initialQuery) {
      handleSubmit(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  return (
    <div className="flex flex-col h-screen">
      <MessageList messages={messages} />
      <footer className="px-6 py-4 border-t flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              e.preventDefault()
              handleSubmit()
            }
          }}
          placeholder="Ask ChemGPT something..."
          className="flex-1 border border-gray-300 rounded px-4 py-2"
          disabled={loading}
        />
        <button
          onClick={() => handleSubmit()}
          className={`bg-blue-600 text-white px-4 py-2 rounded ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </footer>
    </div>
  )
}
