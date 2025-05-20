"use client";
import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
        className="text-violet-700 p-2 focus:outline-none"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-100 flex flex-col items-center z-50 py-6 space-y-4 shadow-lg">
          <Link href="#features" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700 hover:text-violet-700">Features</Link>
          <Link href="#who" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700 hover:text-violet-700">For Who</Link>
          <Link href="#roadmap" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700 hover:text-violet-700">Roadmap</Link>
          <Link href="#faq" onClick={() => setOpen(false)} className="text-lg font-medium text-gray-700 hover:text-violet-700">FAQ</Link>
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg font-bold shadow transition"
          >
            Get Early Access
          </Link>
        </div>
      )}
    </div>
  );
}
export default MobileNav;
