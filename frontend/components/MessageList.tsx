import React, { useEffect, useRef } from 'react'
import Message from './Message'

type MessageType = {
  role: 'user' | 'bot';
  content: string | { answer?: string };
};

type MessageListProps = {
  messages: MessageType[];
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 px-6 py-4 overflow-y-auto">
      {messages.map((msg, i) => (
        <Message
          key={i}
          role={msg.role}
          content={msg.content}
        />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;
