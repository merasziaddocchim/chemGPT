import { useState } from 'react'

export default function ChatPage() {
  const [message, setMessage] = useState('')
  const [responses, setResponses] = useState([])

  const sendMessage = async () => {
    if (!message.trim()) return

    const userMessage = { role: 'user', content: message }
    setResponses(prev => [...prev, userMessage])
    setMessage('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: message }),
      })
      const data = await res.json()
      console.log('🔍 Backend raw response:', data)

      const botMessage = { role: 'bot', content: data.answer || data.message || "⚠️ No response." }
      setResponses(prev => [...prev, botMessage])
    } catch (err) {
      console.error('❌ Error from backend:', err)
      setResponses(prev => [...prev, { role: 'bot', content: "❌ Error reaching the backend." }])
    }
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4">
        {responses.map((msg, i) => (
          <div key={i} className={`p-2 my-1 rounded ${msg.role === 'user' ? 'bg-blue-200 text-right' : 'bg-green-200 text-left'}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Ask something about chemistry..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  )
}
