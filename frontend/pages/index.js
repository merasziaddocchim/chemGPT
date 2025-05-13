import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-tight text-cyan-400">ChemGPT</h1>
        <nav className="space-x-6 text-sm">
          <Link href="/chat" className="hover:text-cyan-400">Chat</Link>
          <Link href="/molecule" className="hover:text-cyan-400">Molecule</Link>
          <Link href="/retro" className="hover:text-cyan-400">Retro</Link>
          <Link href="/spectro" className="hover:text-cyan-400">Spectro</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-24">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
          Unlock Chemistry Intelligence with <span className="text-cyan-400">AI</span>
        </h2>
        <p className="max-w-xl text-base sm:text-lg text-white/80 mb-10">
          ChemGPT empowers researchers, students, and chemists with cutting-edge tools for retrosynthesis, molecular visualization, and spectroscopy — all in one AI-driven platform.
        </p>

        {/* Ask Bar */}
        <form action="/chat" className="w-full max-w-xl">
          <input
            type="text"
            placeholder="Ask ChemGPT about reactions, molecules, spectra..."
            className="w-full p-4 rounded-xl bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </form>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-white/40 py-6 border-t border-white/10">
        Built by a MERAS ZIAD · chemgpt.app
      </footer>
    </div>
  )
}
