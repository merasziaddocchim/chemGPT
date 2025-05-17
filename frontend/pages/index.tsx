import { useState, KeyboardEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/chat?question=${encodeURIComponent(query)}`);
    }
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const suggestions: string[] = [
    "What is the structure of aspirin?",
    "Show me the IR spectrum of benzene",
    "Retrosynthesis of paracetamol",
    "Visualize caffeine molecule",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col items-center justify-center px-4 relative">
      {/* Navbar */}
      <nav className="absolute top-6 left-8 text-xl font-bold text-cyan-400">
        ChemGPT
      </nav>
      <nav className="absolute top-6 right-8 flex gap-4 items-center text-sm">
        <Link href="/chat" className="hover:text-white text-gray-300">
          Chat
        </Link>
        <Link href="/molecule" className="hover:text-white text-gray-300">
          Molecule
        </Link>
        <Link href="/retrosynthesis" className="hover:text-white text-gray-300">
          Retro
        </Link>
        <Link href="/spectroscopy" className="hover:text-white text-gray-300">
          Spectro
        </Link>
        {/* Divider */}
        <span className="h-5 border-l border-gray-600 mx-2"></span>
        {/* Login/Register */}
        <Link
          href="/login"
          className="bg-transparent border border-cyan-400 text-cyan-400 px-4 py-1 rounded-lg hover:bg-cyan-400 hover:text-black transition"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-cyan-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-cyan-600 transition"
        >
          Register
        </Link>
      </nav>

      {/* Hero */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 mt-16">
        Unlock Chemistry Intelligence with <span className="text-cyan-400">AI</span>
      </h1>
      <p className="text-lg text-center max-w-xl mb-8 text-gray-300">
        ChemGPT empowers researchers, students, and chemists with cutting-edge tools for retrosynthesis, molecular visualization, and spectroscopy — all in one AI-driven platform.
      </p>

      {/* Card Example */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="w-[350px] mx-auto mb-8"
>
  <Card>
    <CardHeader>
      <CardTitle>Welcome to ChemGPT!</CardTitle>
    </CardHeader>
    <CardContent>
      <p>Start exploring retrosynthesis, 3D molecules, and more.</p>
    </CardContent>
  </Card>
</motion.div>


      {/* Ask Input */}
      <div className="w-full max-w-xl flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Ask ChemGPT about reactions, molecules, spectra..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-grow p-3 rounded-lg text-black focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600"
        >
          Ask
        </button>
      </div>

      {/* Suggestions */}
      <div className="text-sm text-gray-400 mb-8">
        Try these:
        <ul className="mt-2 space-y-1">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="cursor-pointer text-cyan-300 hover:underline"
              onClick={() => {
                setQuery(s);
                router.push(`/chat?question=${encodeURIComponent(s)}`);
              }}
            >
              {s}
            </li>
          ))}
        </ul>
      </div>

      {/* Big Hero Buttons */}
      <div className="flex gap-6 mt-2">
        <Link
          href="/register"
          className="bg-cyan-500 px-8 py-3 rounded-xl text-lg font-bold shadow-lg hover:bg-cyan-600 transition"
        >
          Get Started – Register
        </Link>
        <Link
          href="/login"
          className="bg-white px-8 py-3 rounded-xl text-lg font-bold text-cyan-500 border-2 border-cyan-400 shadow-lg hover:bg-cyan-50 transition"
        >
          Login
        </Link>
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-500">
        Built by MERAS ZIAD – chemgpt.app
      </footer>
    </div>
  );
}
