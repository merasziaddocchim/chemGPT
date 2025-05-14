import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import './message.css' // Optional: if you're applying local styling

export default function Message({ role, content }) {
  if (typeof content !== 'string') {
    console.error('❌ content is not a string:', content)
    return null
  }

  return (
    <div className={`my-4 p-4 rounded-lg max-w-3xl mx-auto shadow-sm ${role === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left'}`}>
      <div className="prose prose-sm sm:prose-base lg:prose-lg">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}
