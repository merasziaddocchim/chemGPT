export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col md:flex-row bg-white text-gray-900">
      <div className="md:w-64 w-full md:h-full h-16 bg-blue-900 text-white flex md:flex-col justify-between md:justify-start items-center p-4">
        <h1 className="text-xl font-bold mb-4 hidden md:block">ChemGPT</h1>
        <nav className="flex md:flex-col gap-2">
          <a href="/chat" className="hover:bg-blue-800 px-3 py-1 rounded">🧠 Chat</a>
          <a href="/molecule" className="hover:bg-blue-800 px-3 py-1 rounded">🧬 Molecule</a>
          <a href="/retrosynthesis" className="hover:bg-blue-800 px-3 py-1 rounded">🔁 Retro</a>
          <a href="/spectroscopy" className="hover:bg-blue-800 px-3 py-1 rounded">📊 Spectro</a>
        </nav>
      </div>
      <main className="flex-1 p-4 overflow-y-auto">{children}</main>
    </div>
  )
}
