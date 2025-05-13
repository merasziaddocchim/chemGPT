// frontend/components/Message.js
export default function Message({ role, content }) {
  const isUser = role === 'user';

  return (
    <div className={`my-4 p-4 rounded-lg ${isUser ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'}`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
