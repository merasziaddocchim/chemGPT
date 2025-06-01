import { useState } from "react";
import { getRetro } from "../utils/api";

export default function RetroTest() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRetro = async () => {
    setLoading(true);
    try {
      const res = await getRetro(input);
      setResult(res);
    } catch (err: any) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test /retro API</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type SMILES string (e.g. c1ccccc1)"
        style={{ width: 300 }}
      />
      <br />
      <button onClick={handleRetro} disabled={loading}>
        {loading ? "Loading..." : "Predict Retro"}
      </button>
      <pre style={{ background: "#eee", marginTop: 16 }}>
        {result ? JSON.stringify(result, null, 2) : "Result will appear here"}
      </pre>
    </div>
  );
}
