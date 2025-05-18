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
        className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm ${
          isActive(href)
            ? 'bg-[#353740] text-white font-semibold'
            : 'text-gray-300 hover:bg-[#353740] hover:text-white'
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex w-56 flex-col bg-[#202123] text-gray-200">
        <div>
          <Link href="/" className="block px-6 pt-8 pb-4 select-none">
            <span className="text-cyan-400 font-bold text-xl tracking-tight">ChemGPT</span>
          </Link>
          <nav className="flex flex-col gap-1 px-2 mt-2">
            {sidebarLinks.map(link => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>
        </div>
        <footer className="px-6 py-5 text-xs text-gray-500">
          Built by MERAS ZIAD · chemgpt.app
        </footer>
      </aside>

      {/* Mobile Header + Sidebar */}
      <div className="md:hidden w-full">
        <header className="w-full bg-[#202123] flex items-center justify-between px-4 py-4">
          <Link href="/" className="text-cyan-400 font-bold text-xl tracking-tight">
            ChemGPT
          </Link>
          <button
            className="text-gray-300 focus:outline-none"
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
          className={`fixed top-0 left-0 z-40 h-full w-56 bg-[#202123] pt-16 px-3 flex flex-col gap-1 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarLinks.map(link => (
            <NavLink key={link.href} {...link} />
          ))}
          <footer className="mt-auto px-4 py-5 text-xs text-gray-500 border-t border-[#353740]">
            Built by MERAS ZIAD · chemgpt.app
          </footer>
        </nav>
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#343541]">
        <div className="flex-1 flex flex-col w-full md:px-0">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
