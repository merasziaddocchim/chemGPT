import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import ChatInterface from '@/components/ChatInterface'
import { useEffect, useState } from 'react'

export default function ChatPage() {
  const router = useRouter()
  const [initialQuery, setInitialQuery] = useState('')

  useEffect(() => {
    if (router.query.question) {
      setInitialQuery(router.query.question)
    }
  }, [router.query.question])

  return (
    <Layout>
      <ChatInterface initialQuery={initialQuery} />
    </Layout>
  )
}
