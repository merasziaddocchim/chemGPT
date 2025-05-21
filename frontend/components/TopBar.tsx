import Link from "next/link";
import React from "react";

// Icon Components
const HamburgerIcon = React.memo(() => (
  <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2">
    <rect x="3" y="5" width="18" height="2" rx="1" fill="gray" />
    <rect x="3" y="11" width="18" height="2" rx="1" fill="gray" />
    <rect x="3" y="17" width="18" height="2" rx="1" fill="gray" />
  </svg>
));

const SearchIcon = React.memo(() => (
  <svg width={24} height={24} viewBox="0 0 24 24" stroke="gray" fill="none" strokeWidth={2}>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
));

const NewChatIcon = React.memo(() => (
  <svg width={24} height={24} viewBox="0 0 24 24" stroke="gray" fill="none" strokeWidth={2}>
    <path d="M16 3a2.828 2.828 0 1 1 4 4L7 20.5 2 22l1.5-5L16 3z" />
  </svg>
));

// TopBar Component
export default function TopBar({ onSidebarClick }: { onSidebarClick?: () => void }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between px-3 py-2 bg-white border-b border-gray-100">
      {/* Sidebar (Hamburger) */}
      <button
        className="p-2 rounded hover:bg-slate-100 active:bg-slate-200 transition md:hidden"
        onClick={onSidebarClick || (() => console.log("Sidebar button clicked"))}
        aria-label="Open Sidebar Menu"
      >
        <HamburgerIcon />
      </button>
      {/* Logo & Title */}
      <Link href="/" className="flex items-center gap-2 select-none">
        <img
          src="/chatgpt-logo.png"
          alt="ChatGPT"
          className={`w-8 h-8 rounded-full border ${imageError ? "hidden" : ""}`}
          onError={() => setImageError(true)}
        />
        <span className="font-semibold text-lg text-gray-900">ChemGPT</span>
      </Link>
      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded hover:bg-slate-100 active:bg-slate-200 transition" aria-label="Search">
          <SearchIcon />
        </button>
        <button className="p-2 rounded hover:bg-slate-100 active:bg-slate-200 transition" aria-label="Start a New Chat">
          <NewChatIcon />
        </button>
      </div>
    </div>
  );
}
