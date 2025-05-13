export default function Message({ role, content }) {
  return (
    <div className={`my-4 px-4 py-3 rounded-lg max-w-3xl mx-auto shadow-sm ${
      role === 'user' ? 'bg-blue-50 text-right' : 'bg-gray-50 text-left prose prose-slate'
    }`}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
