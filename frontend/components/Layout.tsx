// frontend/components/Layout.tsx

import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const sidebarLinks = [
  { href: '/chat', icon: '💬', label: 'Chat' },
  { href: '/molecule', icon: '🧬', label: 'Molecule' },
  { href: '/retro', icon: '🔄', label: 'Retro' },
  { href: '/spectro', icon: '🧪', label: 'Spectro' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => router.pathname === path;

  const NavLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-base font-medium transition
          ${isActive(href)
            ? 'bg-violet-100 text-violet-700 shadow'
            : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
          }`}
        onClick={() => setMobileOpen(false)}
      >
        <span className="text-xl">{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-white via-slate-50 to-white">
      {/* === Sidebar (Desktop) === */}
      <aside className="hidden md:flex w-60 flex-col bg-white border-r border-gray-200 text-gray-800 py-4 shadow-xl z-10">
        <Link href="/" className="block px-6 pt-2 pb-4 select-none">
          <span className="text-violet-700 font-extrabold text-2xl tracking-tight flex items-center gap-2">
            <span className="text-2xl">🧪</span>
            ChemGPT
          </span>
        </Link>
        <nav className="flex flex-col gap-1 px-2 mt-2">
          {sidebarLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>
        <footer className="px-6 py-6 text-xs text-gray-400 mt-auto">
          Built by MERAS ZIAD · chemgpt.app
        </footer>
      </aside>

      {/* === Mobile Header + Sidebar === */}
      <div className="md:hidden w-full">
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <Link href="/" className="text-violet-700 font-extrabold text-xl tracking-tight flex items-center gap-2">
            <span className="text-2xl">🧪</span> ChemGPT
          </Link>
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </header>
        <nav
          className={`fixed top-0 left-0 z-50 h-full w-60 bg-white border-r border-gray-200 pt-20 px-2 flex flex-col gap-1 shadow-2xl transition-transform duration-300
            ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <Link href="/" className="block px-6 pb-4 select-none">
            <span className="text-violet-700 font-extrabold text-2xl tracking-tight flex items-center gap-2">
              <span className="text-2xl">🧪</span>
              ChemGPT
            </span>
          </Link>
          {sidebarLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
          <footer className="mt-auto px-6 py-6 text-xs text-gray-400 border-t border-gray-200">
            Built by MERAS ZIAD · chemgpt.app
          </footer>
        </nav>
        {/* Overlay for mobile menu */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>

      {/* === Main Content === */}
      <main className="flex-1 flex flex-col min-h-screen w-full md:px-0 bg-gradient-to-br from-white via-slate-50 to-white">
        <div className="flex-1 flex flex-col w-full">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
