// app/page.tsx or pages/index.tsx

import Link from "next/link";
import { useState } from "react";

// Optional: Import your card/UI components or use plain divs for now

export default function HomePage() {
  // For the email input (CTA)
  const [email, setEmail] = useState("");

  // For suggestions, feature toggles, etc.
  const suggestions = [
    "What is the structure of aspirin?",
    "Show me the IR spectrum of benzene",
    "Retrosynthesis of paracetamol",
    "Visualize caffeine molecule",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white text-gray-900 flex flex-col">
      {/* 1. Header/Navbar */}
      <header className="w-full py-6 px-6 flex justify-between items-center">
        <Link href="/" className="font-extrabold text-2xl text-violet-700 tracking-tight">
          <span className="mr-1">🧪</span> ChemGPT
        </Link>
        <nav className="flex items-center gap-6 text-base font-medium">
          <Link href="#features" className="hover:text-violet-700 transition">Features</Link>
          <Link href="#who" className="hover:text-violet-700 transition">For Who</Link>
          <Link href="#roadmap" className="hover:text-violet-700 transition">Roadmap</Link>
          <Link href="#faq" className="hover:text-violet-700 transition">FAQ</Link>
          <Link
            href="/register"
            className="ml-4 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-lg font-bold shadow"
          >
            Get Early Access
          </Link>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="flex flex-col items-center justify-center pt-10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-4 leading-tight">
          The <span className="text-violet-700">AI-Powered Platform</span> for <span className="text-cyan-500">Chemistry</span>
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl mb-6 text-gray-600">
          Combining AI models, molecular visualization, and educational tools for students, researchers, and professionals in chemistry.
        </p>

        {/* Ask Bar */}
        <div className="w-full max-w-xl flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Ask a chemistry question…"
            className="flex-grow px-4 py-3 rounded-xl border border-gray-300 shadow bg-white text-gray-900 focus:outline-none"
          />
          <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-xl text-white font-bold shadow">
            Ask
          </button>
        </div>
        {/* Hashtags */}
        <div className="flex gap-2 mb-6">
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold text-xs">#ChemistryAI</span>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-semibold text-xs">#MoleculeViz</span>
          <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full font-semibold text-xs">#Retrosynthesis</span>
        </div>
        {/* Demo Image */}
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 mb-6 flex flex-col items-center">
          {/* Replace with your actual demo/graphic */}
          <img src="/demo-molecule.png" alt="ChemGPT Visualization Demo" className="mx-auto mb-3" />
          <div className="flex justify-end w-full">
            <button className="text-xs text-gray-400 hover:underline flex items-center gap-1">
              <span>Export as JPEG</span>
            </button>
          </div>
        </div>
      </section>

      {/* More sections here: Features, Who For, Roadmap, FAQ, Community, CTA, Footer */}
      {/* ... */}

      <footer className="py-8 mt-16 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ChemGPT. All rights reserved. <span className="ml-2">for the chemistry community</span>
      </footer>
    </div>
  );
}
