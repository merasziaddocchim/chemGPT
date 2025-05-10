import { useState } from "react";
import { fetcher } from "../utils/api";

export default function RetrosynthesisTool() {
  const [smiles, setSmiles] = useState("");
  const [routes, setRoutes] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRoutes = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetcher(`/api/retrosynthesis?smiles=${encodeURIComponent(smiles)}`);
      setRoutes(data);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={getRoutes} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter SMILES (e.g. CC(=O)OC1=CC=CC=C1C(=O)O)"
        value={smiles}
        onChange={(e) => setSmiles(e.target.value)}
        className="px-4 py-3 border rounded-lg"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {loading ? "Generating..." : "Generate Retrosynthesis"}
      </button>
      {routes && (
        <pre className="bg-gray-100 p-4 rounded border whitespace-pre-wrap">
          {JSON.stringify(routes, null, 2)}
        </pre>
      )}
    </form>
  );
}
