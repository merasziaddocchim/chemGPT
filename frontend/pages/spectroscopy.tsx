// frontend/pages/spectroscopy.tsx
import React, { useState, FormEvent } from "react";
import SpectroscopyResult from "../components/SpectroscopyResult";

interface SpectroResult {
  spectra_markdown: string;
  molecule?: string;
  source?: string;
}

export default function SpectroscopyPage() {
  const [query, setQuery] = useState<string>("");
  const [result, setResult] = useState<SpectroResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const resp = await fetch("https://chemgpt-spectro-production.up.railway.app/spectroscopy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ molecule: query }),
      });
      const data: SpectroResult = await resp.json();
      setResult(data);
    } catch (err: any) {
      alert("Error: " + err.message);
    }
    setLoading(false);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">AI Spectroscopy</h1>
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <input
          className="border px-2 py-1 rounded"
          placeholder="Enter molecule name or SMILES"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" disabled={loading}>
          {loading ? "Loading..." : "Analyze"}
        </button>
      </form>
      {result && <SpectroscopyResult spectraMarkdown={result.spectra_markdown} />}
    </div>
  );
}
