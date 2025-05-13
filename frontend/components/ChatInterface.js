import { useState, useEffect, useRef } from 'react'

export default function ChatInterface({ initialQuery = '' }) {
  const [message, setMessage] = useState('')
  const [responses, setResponses] = useState([])
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [responses])

  useEffect(() => {
    if (initialQuery) {
      setMessage(initialQuery)
      sendMessage(initialQuery)
    }
  }, [initialQuery])

  useEffect(() => {
    if (responses.length > 0) {
      const last = responses[responses.length - 1]
      if (last.role === 'user') {
        document.title = `${last.content.slice(0, 40)} - ChemGPT`
        const query = encodeURIComponent(last.content.trim())
        const url = new URL(window.location.href)
        url.searchParams.set('question', query)
        window.history.replaceState({}, '', url.toString())
      } else if (last.role === 'bot') {
        const summary = last.content.split(/[.?!]/)[0].slice(0, 50)
        document.title = `${summary} - ChemGPT`
      }
    }
  }, [responses])

  useEffect(() => {
    const originalTitle = document.title
    return () => {
      document.title = originalTitle
    }
  }, [])

  const sendMessage = async (msgToSend = message) => {
    if (!msgToSend.trim()) return
    const userMessage = { role: 'user', content: msgToSend }
    setResponses(prev => [...prev, userMessage])
    setMessage('')
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: msgToSend }),
      })
      const data = await res.json()
      const botMessage = { role: 'bot', content: data.answer || data.message || "⚠️ No response." }
      setResponses(prev => [...prev, botMessage])
    } catch (err) {
      setResponses(prev => [...prev, { role: 'bot', content: "❌ Error reaching the backend." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {responses.length > 0 && responses.some(r => r.role === 'bot') && (
        <div className="flex justify-end mb-2 pr-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
              alert("🔗 Link copied to clipboard!")
            }}
            className="text-sm text-blue-600 underline hover:text-blue-800 transition"
          >
            🔗 Copy link to this question
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto space-y-2 mb-2">
        {responses.map((msg, i) => (
          <div key={i} className={`p-3 max-w-xl rounded-lg ${
            msg.role === 'user' ? 'bg-blue-100 self-end text-right' : 'bg-green-100 self-start text-left'
          }`}>
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 italic">Thinking...</div>}
        <div ref={bottomRef}></div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          placeholder="Ask something about chemistry..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={() => sendMessage()} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  )
}
