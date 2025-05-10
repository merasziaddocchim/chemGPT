import { useState } from "react";
import { fetcher } from "../utils/api";

export default function AskChemGPT() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAnswer("");
    setError("");
    setLoading(true);
    try {
      const data = await fetcher("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      setAnswer(data.answer);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Ask a chemistry question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-3 border rounded-lg"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Asking..." : "Ask ChemGPT"}
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {answer && (
        <div className="bg-gray-50 p-4 border rounded-lg">{answer}</div>
      )}
    </form>
  );
}
