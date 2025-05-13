import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function Message({ content, role }) {
  return (
    <div className={`my-4 px-4 py-3 rounded-md shadow-sm ${role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        className="prose max-w-none"
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
