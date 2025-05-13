
import { useState } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/chat?question=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-4">
      <nav className="absolute top-6 right-8 text-sm space-x-6 text-gray-300">
        <a href="/chat" className="hover:text-white">Chat</a>
        <a href="/molecule" className="hover:text-white">Molecule</a>
        <a href="/retrosynthesis" className="hover:text-white">Retro</a>
        <a href="/spectroscopy" className="hover:text-white">Spectro</a>
      </nav>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6">
        Unlock Chemistry Intelligence with <span className="text-cyan-400">AI</span>
      </h1>
      <p className="text-lg text-center max-w-xl mb-8 text-gray-300">
        ChemGPT empowers researchers, students, and chemists with cutting-edge tools for retrosynthesis, molecular visualization, and spectroscopy — all in one AI-driven platform.
      </p>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Ask ChemGPT about reactions, molecules, spectra..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full p-3 rounded-lg text-black focus:outline-none"
        />
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-500">
        Built by MERAS ZIAD - chemgpt.app
      </footer>
    </div>
  );
}
