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
        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-base font-semibold
          ${isActive(href)
            ? 'bg-violet-100 text-violet-700'
            : 'text-gray-600 hover:bg-cyan-50 hover:text-cyan-700 transition'
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
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col bg-white/90 border-r border-gray-100 shadow-lg">
        <div>
          <Link href="/" className="block px-6 pt-8 pb-4 select-none">
            <span className="text-violet-700 font-extrabold text-2xl tracking-tight flex items-center">
              <span className="mr-1">🧪</span> ChemGPT
            </span>
          </Link>
          <nav className="flex flex-col gap-1 px-2 mt-2">
            {sidebarLinks.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>
        <footer className="px-6 py-5 text-xs text-gray-400">
          Built by MERAS ZIAD · chemgpt.app
        </footer>
      </aside>

      {/* Mobile Header + Sidebar */}
      <div className="md:hidden w-full">
        <header className="w-full bg-white/90 border-b border-gray-100 flex items-center justify-between px-4 py-4 shadow">
          <Link href="/" className="text-violet-700 font-extrabold text-xl tracking-tight flex items-center">
            <span className="mr-1">🧪</span> ChemGPT
          </Link>
          <button
            className="text-gray-600 focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </header>
        <nav
          className={`fixed top-0 left-0 z-40 h-full w-56 bg-white border-r border-gray-100 pt-16 px-3 flex flex-col gap-1 shadow-lg transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
          <footer className="mt-auto px-4 py-5 text-xs text-gray-400 border-t border-gray-100">
            Built by MERAS ZIAD · chemgpt.app
          </footer>
        </nav>
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 bg-gradient-to-br from-white via-slate-50 to-white">
        <div className="flex-1 flex flex-col w-full md:px-0">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
