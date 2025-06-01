// frontend/pages/extract-test.js

import { useState } from "react";
import { extractEntities } from "../utils/api";

export default function ExtractTest() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async () => {
    setLoading(true);
    try {
      const res = await extractEntities(input);
      setResult(res);
    } catch (err) {
      setResult({ error: err.message });
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Test /extract API</h2>
      <textarea
        rows={3}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type chemistry text..."
        style={{ width: 400 }}
      />
      <br />
      <button onClick={handleExtract} disabled={loading}>
        {loading ? "Extracting..." : "Extract Entities"}
      </button>
      <pre style={{ background: "#eee", marginTop: 16 }}>
        {result ? JSON.stringify(result, null, 2) : "Result will appear here"}
      </pre>
    </div>
  );
}
