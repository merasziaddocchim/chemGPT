import React from 'react';
import Message from './Message';

type MessageType = {
  role: 'user' | 'bot';
  content: string;
};

interface MessageListProps {
  messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => (
  <div className="flex flex-col gap-1">
    {messages.map((msg, i) => (
      <Message key={i} role={msg.role} content={msg.content} />
    ))}
  </div>
);

export default MessageList;
