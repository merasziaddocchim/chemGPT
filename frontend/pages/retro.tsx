// frontend/pages/retro.tsx

import Layout from '@/components/Layout';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function RetroPage() {
  const [smiles, setSmiles] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handlePredict() {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('https://chemgpt-pro.onrender.com/retrosynthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ smiles }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.message || 'No result.');
      } else {
        setError(data.answer || 'Unknown server error.');
      }
    } catch {
      setError('Error connecting to server.');
    }
    setLoading(false);
  }

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-2 bg-[#343541]">
        <div className="bg-[#222] p-6 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-cyan-400 mb-2 text-center">🔄 Retrosynthesis Predictor</h1>
          <p className="text-gray-400 mb-4 text-center text-sm">
            Paste a <span className="text-cyan-300 font-medium">SMILES</span> string and predict the retrosynthetic route.<br />
            Example: <code className="bg-[#18181b] rounded px-1 py-0.5">CC(=O)OC1=CC=CC=C1C(=O)O</code>
          </p>
          <div className="flex gap-2 mb-4">
            <input
              className="flex-1 rounded px-3 py-2 border border-gray-600 bg-[#18181b] text-white"
              type="text"
              value={smiles}
              onChange={e => setSmiles(e.target.value)}
              placeholder="Paste SMILES string"
              disabled={loading}
              autoFocus
            />
            <button
              onClick={handlePredict}
              disabled={loading || !smiles.trim()}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded transition"
            >
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <>Predict</>
              )}
            </button>
          </div>

          {/* RESULT/ERROR SECTION */}
          <div className="min-h-[60px] mt-2">
            {loading && (
              <div className="flex justify-center items-center text-cyan-300 animate-pulse">
                Predicting retrosynthesis route...
              </div>
            )}
            {error && (
              <div className="bg-red-900/70 border border-red-600 text-red-300 rounded p-3 text-center">
                {error}
              </div>
            )}
            {result && !error && (
              <div className="bg-[#18181b] border border-gray-700 rounded-xl p-4 mt-2">
                <div className="font-semibold text-cyan-400 mb-2">🧪 Prediction Result</div>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm, remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  className="prose prose-invert max-w-none text-white"
                >
                  {result}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
