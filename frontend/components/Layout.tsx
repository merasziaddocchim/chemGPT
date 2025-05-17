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

  // Navigation Link
  const NavLink = ({ href, icon, label }: { href: string; icon: string; label: string }) => (
    <Link href={href}>
      <div
        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer ${
          isActive(href)
            ? 'bg-[#353740] text-white font-semibold'
            : 'text-gray-300 hover:bg-[#353740] hover:text-white'
        }`}
        onClick={() => setMobileOpen(false)} // close on mobile click
      >
        <span className="text-lg">{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-60 flex-col bg-[#202123] text-gray-200">
        <div>
          <Link href="/" className="block px-6 pt-8 pb-4">
            <span className="text-cyan-400 font-bold text-2xl tracking-tight">ChemGPT</span>
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

      {/* Mobile Header + Slideout Sidebar */}
      <div className="md:hidden flex flex-col flex-shrink-0 w-full">
        {/* Topbar */}
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
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Menu icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </header>
        {/* Slide-in mobile sidebar */}
        <nav
          className={`fixed top-0 left-0 z-40 h-full w-56 bg-[#202123] shadow-lg pt-16 px-3 flex flex-col gap-1 transition-transform duration-300 ${
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
        {/* Overlay for mobile sidebar */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-gradient-to-b from-black to-gray-900 text-gray-100 relative overflow-y-auto">
        <div className="pt-4 md:pt-0 px-2 md:px-8 flex-1 w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
