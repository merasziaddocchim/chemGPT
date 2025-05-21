import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ChatInterface from '@/components/ChatInterface';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const [initialQuery, setInitialQuery] = useState<string>('');

  useEffect(() => {
    if (typeof router.query.query === "string") {
      setInitialQuery(router.query.query as string);
    }
  }, [router.query.query]);

  return (
    <Layout>
      <ChatInterface initialQuery={initialQuery} />
    </Layout>
  );
}
