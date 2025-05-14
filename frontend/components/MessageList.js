import Message from './Message'

export default function MessageList({ messages }) {
  console.log("MessageList received:", messages);

  return (
    <div className="flex-1 px-6 py-4 overflow-y-auto">
      {messages.map((msg, i) => (
        <Message key={i} content={msg.content} role={msg.role} />
      ))}
    </div>
  )
}
