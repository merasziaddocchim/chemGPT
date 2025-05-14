import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function Message({ role, content }) {
  // Bulletproof: handle object, string, or anything else
  let safeContent = ''
  try {
    if (typeof content === 'string') {
      safeContent = content
    } else if (content && typeof content === 'object') {
      // If object has 'answer' key from backend, use it
      if ('answer' in content) {
        safeContent = content.answer
      } else {
        safeContent = JSON.stringify(content, null, 2)
      }
    } else {
      safeContent = String(content)
    }
  } catch {
    safeContent = '⚠️ Error displaying message content.'
  }

  return (
    <div className={`p-4 rounded-md my-2 ${role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
      <ReactMarkdown
        children={safeContent}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      />
    </div>
  )
}
