import React from 'react'

export default function Message({ role, content }) {
  let safeContent = ''

  if (content && typeof content === 'object' && 'answer' in content) {
    safeContent = content.answer
  } else if (typeof content === 'string') {
    safeContent = content
  } else {
    safeContent = JSON.stringify(content, null, 2)
  }

  return (
    <div style={{
      background: role === 'user' ? '#cce3ff' : '#f0f0f0',
      color: role === 'user' ? '#08335c' : '#111',
      borderRadius: 14,
      padding: '14px 18px',
      margin: '12px 0',
      maxWidth: '85%',
      alignSelf: role === 'user' ? 'flex-end' : 'flex-start'
    }}>
      {safeContent}
    </div>
  )
}
