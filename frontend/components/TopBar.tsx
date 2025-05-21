"use client";
import React from "react";
import Image from "next/image";

const TopBar: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-white/95 border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="flex items-center gap-2 select-none">
        <Image
          src="/chatgpt-logo.png"
          alt="ChemGPT Logo"
          width={32}
          height={32}
          className="w-8 h-8 rounded-full border border-gray-200 bg-white"
        />
        <span className="text-violet-700 font-extrabold text-lg tracking-tight">ChemGPT</span>
      </div>
      <div className="flex items-center gap-2">
        {/* Search */}
        <button aria-label="Search" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-violet-50 transition" type="button">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {/* New Chat */}
        <button aria-label="New chat" className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-violet-50 transition" type="button">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TopBar;
