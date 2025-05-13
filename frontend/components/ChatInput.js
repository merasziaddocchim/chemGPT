export default function ChatInput({ message, setMessage, handleSend }) {
  return (
    <div className="w-full border-t px-4 py-3 flex items-center gap-2">
      <input
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
        type="text"
        placeholder="Ask ChemGPT something..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  )
}