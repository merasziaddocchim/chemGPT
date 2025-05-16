import { useState, KeyboardEvent, ChangeEvent, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = useCallback(() => {
    if (query.trim() !== "") {
      router.push(`/chat?question=${encodeURIComponent(query)}`);
    }
  }, [query, router]);

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleSearch();
    },
    [handleSearch]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    []
  );

  const suggestions: string[] = [
    "What is the structure of aspirin?",
    "Show me the IR spectrum of benzene",
    "Retrosynthesis of paracetamol",
    "Visualize caffeine molecule"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-4 relative">
      <nav className="absolute top-6 left-8 text-xl font-bold text-cyan-400">
        ChemGPT
      </nav>
      <nav className="absolute top-6 right-8 text-sm space-x-6 text-gray-300">
        <Link href="/chat" className="hover:text-white">Chat</Link>
        <Link href="/molecule" className="hover:text-white">Molecule</Link>
        <Link href="/retrosynthesis" className="hover:text-white">Retro</Link>
        <Link href="/spectroscopy" className="hover:text-white">Spectro</Link>
      </nav>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 mt-6">
        Unlock Chemistry Intelligence with <span className="text-cyan-400">AI</span>
      </h1>
      <p className="text-lg text-center max-w-xl mb-8 text-gray-300">
        ChemGPT empowers researchers, students, and chemists with cutting-edge tools for retrosynthesis, molecular visualization, and spectroscopy — all in one AI-driven platform.
      </p>
      
      <div className="w-full max-w-xl flex gap-2 mb-6">
        <label htmlFor="main-query" className="sr-only">Ask ChemGPT</label>
        <input
          id="main-query"
          type="text"
          aria-label="Ask ChemGPT"
          placeholder="Ask ChemGPT about reactions, molecules, spectra..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-grow p-3 rounded-lg text-black focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600"
          aria-label="Ask ChemGPT"
        >
          Ask
        </button>
      </div>

      <div className="text-sm text-gray-400">
        Try these:
        <ul className="mt-2 space-y-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="cursor-pointer text-cyan-300 hover:underline"
              tabIndex={0}
              role="button"
              aria-label={`Try: ${s}`}
              onClick={() => {
                setQuery(s);
                router.push(`/chat?question=${encodeURIComponent(s)}`);
              }}
              onKeyDown={e => {
                if (e.key === "Enter" || e.key === " ") {
                  setQuery(s);
                  router.push(`/chat?question=${encodeURIComponent(s)}`);
                }
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-500">
        Built by MERAS ZIAD - chemgpt.app
      </footer>
    </div>
  );
}
