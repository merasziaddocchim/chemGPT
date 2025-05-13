import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import MessageList from "./MessageList"
import ChatInput from "./ChatInput"

export default function ChatInterface() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const router = useRouter()

  const sendMessage = async () => {
    if (!message.trim()) return
    const userMsg = { role: "user", content: message }
    setMessages(prev => [...prev, userMsg])
    setMessage("")

    try {
      const res = await fetch("https://chemgpt-pro.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message })
      })

      const data = await res.json()
      setMessages(prev => [...prev, { role: "bot", content: data.answer || "⚠️ No response." }])
    } catch (err) {
      setMessages(prev => [...prev, { role: "bot", content: "❌ Error reaching the backend." }])
    }
  }

  useEffect(() => {
    if (router.query.question) {
      setMessage(router.query.question)
      sendMessage()
    }
  }, [router.query.question])

  return (
    <div className="flex flex-col h-screen bg-white">
      <MessageList messages={messages} />
      <ChatInput message={message} setMessage={setMessage} handleSend={sendMessage} />
    </div>
  )
}
