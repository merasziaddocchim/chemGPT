import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function Message({ role, content }) {
  if (typeof content !== 'string') {
    console.warn('⚠️ Invalid message content type:', typeof content, content)
    return (
      <div className="my-4 p-4 rounded-lg max-w-3xl mx-auto shadow-sm bg-red-100 text-left">
        ⚠️ Unable to display this message.
      </div>
    )
  }

  return (
    <div className={`my-4 p-4 rounded-lg max-w-3xl mx-auto shadow-sm ${role === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        className="prose"
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
