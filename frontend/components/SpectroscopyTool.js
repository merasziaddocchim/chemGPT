import { useState } from "react";
import { fetcher } from "../utils/api";

export default function SpectroscopyTool() {
  const [compound, setCompound] = useState("");
  const [spectrum, setSpectrum] = useState(null);
  const [loading, setLoading] = useState(false);

  const getSpectrum = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetcher(`/api/spectrum/${encodeURIComponent(compound)}`);
      setSpectrum(data);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={getSpectrum} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter compound name or SMILES"
        value={compound}
        onChange={(e) => setCompound(e.target.value)}
        className="px-4 py-3 border rounded-lg"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Analyzing..." : "Get Spectrum"}
      </button>
      {spectrum && (
        <pre className="bg-gray-100 p-4 rounded border whitespace-pre-wrap">
          {JSON.stringify(spectrum, null, 2)}
        </pre>
      )}
    </form>
  );
}
