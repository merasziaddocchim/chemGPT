"use client";
import React from "react";
import Image from "next/image";

const TopBar: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-white/95 border-b border-gray-100 shadow-sm sticky top-0 z-40">
      {/* On mobile, add left margin so ChemGPT text isn't behind menu button */}
      <div className="flex items-center gap-2 select-none ml-12 md:ml-0">
        {/* Optional: show logo on mobile */}
        {/* <Image
          src="/chemgtplogo.png"
          alt="ChemGPT Logo"
          width={28}
          height={28}
          className="inline-block"
        /> */}
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
