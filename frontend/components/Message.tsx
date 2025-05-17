import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

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

  return (
    <div
      style={{
        background: role === 'user' ? '#cce3ff' : '#23232b',
        color: role === 'user' ? '#08335c' : '#fff',
        borderRadius: 14,
        padding: '14px 18px',
        margin: '12px 0',
        maxWidth: '85%',
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
        fontSize: 16,
        boxShadow: role === 'user'
          ? '0 2px 8px rgba(80,160,255,0.10)'
          : '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      <ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath]}
  rehypePlugins={[rehypeKatex]}
>
  {safeContent}
</ReactMarkdown>
    </div>
  );
};

export default Message;
