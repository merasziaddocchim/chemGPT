export default function Message({ role, content }) {
  const isUser = role === "user"
  return (
    <div className={`w-full py-2 px-4 my-2 rounded-md text-sm leading-relaxed ${
      isUser ? "bg-blue-50 text-right" : "bg-green-50 text-left"
    }`}>
      <p className={`${isUser ? "text-blue-900 font-semibold" : "text-gray-800"}`}>
        {content}
      </p>
    </div>
  )
}