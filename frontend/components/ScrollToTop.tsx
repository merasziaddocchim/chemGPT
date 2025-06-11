// frontend/components/ScrollToTop.tsx
"use client";
import React, { useEffect, useState } from "react";

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200); // Show after 200px scroll
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 bg-violet-600 text-white p-3 rounded-full shadow-lg hover:bg-violet-700 transition flex items-center justify-center"
    >
      {/* Up arrow icon */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  ) : null;
};

export default ScrollToTop;
