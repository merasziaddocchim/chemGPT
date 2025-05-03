"use client";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const ask = async () => {
    const res = await fetch("/api/ask", {
      method: "POST",
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResult(data.answer);
  };

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pose ta question en chimie..."
        className="border p-2 mr-2"
      />
      <button onClick={ask} className="bg-blue-600 text-white px-4 py-2 rounded">
        Demander
      </button>
      <div className="mt-4 text-green-700">{result}</div>
    </div>
  );
}
