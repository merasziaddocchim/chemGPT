import { useState } from "react";
import { getSpectra } from "../utils/api";

export default function SpectroTest() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSpectro = async () => {
    setLoading(true);
    try {
      const res = await getSpectra(input);
      setResult(res);
    } catch (err: any) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test /spectro API</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type molecule name (e.g. benzene)"
        style={{ width: 300 }}
      />
      <br />
      <button onClick={handleSpectro} disabled={loading}>
        {loading ? "Loading..." : "Get Spectra"}
      </button>
      <pre style={{ background: "#eee", marginTop: 16 }}>
        {result ? JSON.stringify(result, null, 2) : "Result will appear here"}
      </pre>
    </div>
  );
}
