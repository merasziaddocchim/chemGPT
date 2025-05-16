// frontend/components/Message.tsx

import React from 'react';

type MessageProps = {
  role: 'user' | 'bot';
  content: string | { answer?: string };
};

const Message: React.FC<MessageProps> = ({ role, content }) => {
  // Normalize content
  let safeContent = '';
  if (typeof content === 'object' && content !== null && 'answer' in content) {
    safeContent = content.answer || '';
  } else if (typeof content === 'string') {
    safeContent = content;
  } else {
    safeContent = JSON.stringify(content, null, 2);
  }

  // You can add Markdown/KaTeX rendering here if needed
  return (
    <div
      style={{
        background: role === 'user' ? '#cce3ff' : '#f0f0f0',
        color: role === 'user' ? '#08335c' : '#111',
        borderRadius: 14,
        padding: '14px 18px',
        margin: '12px 0',
        maxWidth: '85%',
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
        whiteSpace: 'pre-wrap',
        fontSize: 16,
        boxShadow: role === 'user'
          ? '0 2px 8px rgba(80,160,255,0.10)'
          : '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      {safeContent}
    </div>
  );
};

export default Message;
