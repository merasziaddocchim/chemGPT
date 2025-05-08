import Head from 'next/head';

export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Head>
        <title>chemGPT – Your AI Chemistry Companion</title>
        <meta name="description" content="Visualize molecules, predict reactions, and learn chemistry with AI." />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Your AI Chemistry Companion</h1>
        <p className="text-xl md:text-2xl mb-8">Visualize molecules, predict reactions, and learn chemistry with AI.</p>
        <div className="flex justify-center gap-4">
          <a href="#features" className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-full shadow hover:bg-gray-100 transition">Try chemGPT</a>
          <a href="#viewer" className="border border-white py-3 px-6 rounded-full hover:bg-white hover:text-blue-800 transition">View Molecules</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You Can Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">3D Molecule Viewer</h3>
              <p>Upload or draw molecules. Visualize them in 3D instantly using 3Dmol.js.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">AI Chemistry Chatbot</h3>
              <p>Ask chemistry questions and get clear, contextual answers using AI.</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">Reaction Predictor</h3>
              <p>Input compounds and get AI-predicted reaction pathways powered by AiZynthFinder.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Viewer Placeholder */}
      <section id="viewer" className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Live Molecule Viewer</h2>
        <p className="mb-8">Soon you'll be able to upload a molecule or SMILES string and see it here in 3D.</p>
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600">
          3Dmol.js Viewer Placeholder
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-blue-50">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-5xl mb-4">🧪</div>
            <h4 className="font-semibold text-xl mb-2">1. Ask a Question</h4>
            <p>Type any chemistry question and let AI explain it in seconds.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🔬</div>
            <h4 className="font-semibold text-xl mb-2">2. Visualize Molecules</h4>
            <p>Paste or upload molecular data to see 3D models instantly.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">⚗️</div>
            <h4 className="font-semibold text-xl mb-2">3. Predict Reactions</h4>
            <p>Explore AI-generated reaction suggestions and learning paths.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Powered By</h2>
        <p className="mb-6">Built with cutting-edge chemistry and AI tools</p>
        <div className="flex justify-center gap-6 flex-wrap text-blue-900 font-semibold">
          <span>Next.js</span>
          <span>FastAPI</span>
          <span>3Dmol.js</span>
          <span>OpenAI</span>
          <span>AiZynthFinder</span>
          <span>Tailwind CSS</span>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="bg-blue-900 text-white text-center py-10">
        <h3 className="text-xl font-semibold mb-2">Ready to Explore Chemistry Smarter?</h3>
        <p className="mb-6">Join the AI-powered learning revolution today.</p>
        <a href="#" className="inline-block bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">Launch chemGPT</a>
      </footer>
    </div>
  );
}
