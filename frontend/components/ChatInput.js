// frontend/components/ChatInput.js
export default function ChatInput({ input, setInput, onSubmit }) {
  return (
    <div className="flex border-t p-4">
      <input
        type="text"
        className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none"
        placeholder="Ask ChemGPT something..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
      >
        Send
      </button>
    </div>
  );
}
