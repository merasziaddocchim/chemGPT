// frontend/pages/retro.tsx

import Layout from '@/components/Layout';
import { useState } from 'react';

export default function RetroPage() {
  const [smiles, setSmiles] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePredict() {
    setLoading(true);
    setResult('');
    try {
      const res = await fetch('https://chemgpt-pro.onrender.com/retrosynthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smiles }),
      });
      const data = await res.json();
      setResult(data.message || 'No result');
    } catch (err) {
      setResult('Error connecting to server.');
    }
    setLoading(false);
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-2 bg-[#343541]">
        <div className="bg-[#222] p-6 rounded-xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">Retrosynthesis Predictor</h1>
          <input
            className="w-full rounded p-3 mb-4 border border-gray-600 bg-[#18181b] text-white"
            type="text"
            value={smiles}
            onChange={e => setSmiles(e.target.value)}
            placeholder="Paste SMILES string (e.g. CC(=O)OC1=CC=CC=C1C(=O)O)"
            disabled={loading}
            autoFocus
          />
          <button
            onClick={handlePredict}
            disabled={loading || !smiles.trim()}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded transition"
          >
            {loading ? 'Predicting...' : 'Predict Route'}
          </button>
          <div className="mt-6 min-h-[48px] text-white whitespace-pre-wrap">
            {result && (
              <div className="bg-[#18181b] p-3 rounded">{result}</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
