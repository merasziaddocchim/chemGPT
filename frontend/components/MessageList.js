// frontend/components/MessageList.js
import Message from './Message';

export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <Message key={index} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
