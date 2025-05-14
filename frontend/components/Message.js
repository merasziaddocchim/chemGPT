import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

export default function Message({ role, content }) {
  let safeContent = ''
  try {
    if (typeof content === 'string') {
      safeContent = content
    } else if (content && typeof content === 'object') {
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
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} my-2`}>
      <div className={`max-w-xl rounded-2xl px-4 py-3 shadow
        ${role === 'user'
          ? 'bg-blue-600 text-white rounded-br-md'
          : 'bg-gray-100 text-gray-800 rounded-bl-md'
        }
      `}>
        <ReactMarkdown
          children={safeContent}
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        />
      </div>
    </div>
  )
}
