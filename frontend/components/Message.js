import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function Message({ role, content }) {
  let message = ''

  // 🧠 Ensure content is a string before rendering
  if (typeof content === 'string') {
    message = content
  } else if (typeof content === 'object') {
    try {
      message = JSON.stringify(content, null, 2) // fallback for object
    } catch (e) {
      message = '[Error displaying message]'
    }
  } else {
    message = String(content)
  }

  return (
    <div className={`my-4 p-4 rounded-lg max-w-3xl mx-auto shadow-sm ${role === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        className="prose prose-sm sm:prose-base lg:prose-lg"
      >
        {message}
      </ReactMarkdown>
    </div>
  )
}
