import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          <Link href="/" className="text-2xl font-semibold px-6 py-4 block">ChemGPT</Link>
          <nav className="flex flex-col gap-4 px-6 mt-6 text-sm">
            <Link href="/chat" className="hover:text-blue-300">🧠 Chat</Link>
            <Link href="/molecule" className="hover:text-blue-300">🧪 Molecule</Link>
            <Link href="/retro" className="hover:text-blue-300">🔁 Retro</Link>
            <Link href="/spectro" className="hover:text-blue-300">📊 Spectro</Link>
          </nav>
        </div>
        <footer className="px-6 py-4 text-xs text-gray-400">
          Built by MERAS ZIAD · chemgpt.app
        </footer>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  )
}
