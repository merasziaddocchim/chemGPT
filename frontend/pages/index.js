// frontend/pages/index.js
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [backendMsg, setBackendMsg] = useState('');

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!url) return;

    fetch(`${url}/`)
      .then(res => res.json())
      .then(data => setBackendMsg(data.message))
      .catch(() => setBackendMsg('Error connecting to backend'));
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Head>
        <title>chemGPT – Your AI Chemistry Companion</title>
        <meta
          name="description"
          content="Visualize molecules, predict reactions, and learn chemistry with AI."
        />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-24 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Your AI Chemistry Companion
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Visualize molecules, predict reactions, and learn chemistry with AI.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="#features"
            className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition"
          >
            Try chemGPT
          </a>
          <a
            href="#viewer"
            className="border border-white py-3 px-6 rounded-full hover:bg-white hover:text-blue-800 transition"
          >
            View Molecules
          </a>
        </div>
        {backendMsg && (
          <p className="mt-6 italic text-cyan-200">
            Backend says: “{backendMsg}”
          </p>
        )}
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-6 bg-gray-100 text-center max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-12">What You Can Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">
              3D Molecule Viewer
            </h3>
            <p>
              Upload or draw molecules. Visualize them in 3D instantly using
              3Dmol.js.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">
              AI Chemistry Chatbot
            </h3>
            <p>
              Ask chemistry questions and get clear, contextual answers using
              AI.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Reaction Predictor</h3>
            <p>
              Input compounds and get AI-predicted reaction pathways powered
              by AiZynthFinder.
            </p>
          </div>
        </div>
      </section>

      {/* Viewer Placeholder */}
      <section
        id="viewer"
        className="py-20 px-6 text-center bg-white max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4">Live Molecule Viewer</h2>
        <p className="mb-8">
          Soon you’ll be able to upload a molecule or SMILES string and see
          it here in 3D.
        </p>
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
          3Dmol.js Viewer Placeholder
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-blue-900 text-white text-center py-10">
        <h3 className="text-xl font-semibold mb-2">
          Ready to Explore Chemistry Smarter?
        </h3>
        <p className="mb-6">
          Join the AI-powered learning revolution today.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Launch chemGPT
        </a>
      </footer>
    </div>
  );
}
