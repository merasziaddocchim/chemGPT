import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function Message({ role, content }) {
  // Safe string conversion to avoid React crashing on objects
  let safeContent = ''

  try {
    if (typeof content === 'string') {
      safeContent = content
    } else if (typeof content === 'object') {
      safeContent = JSON.stringify(content, null, 2)
    } else if (content !== undefined && content !== null) {
      safeContent = String(content)
    }
  } catch (e) {
    safeContent = '[Error rendering message content]'
  }

  return (
    <div className={`my-4 p-4 rounded-lg max-w-3xl mx-auto shadow-sm ${
      role === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'
    }`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {safeContent}
      </ReactMarkdown>
    </div>
  )
}
