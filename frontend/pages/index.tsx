"use client";
import Link from "next/link";
import { useState } from "react";
import FeatureCard from "@/components/FeatureCard";
import PersonaCard from "@/components/PersonaCard";
import RoadmapStep from "@/components/RoadmapStep";
import FAQAccordion from "@/components/FAQAccordion";
import CommunityCard from "@/components/CommunityCard";
import MobileNav from "@/components/MobileNav";

export default function HomePage() {
  // For hero chatbar
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => setQuery(e.target.value);
  const handleInputKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };
  const handleSearch = () => {
    if (query.trim() !== "") {
      // You can change this to your routing logic:
      alert(`You searched for: ${query}`);
    }
  };

  // For waitlist email input (bottom CTA)
  const [email, setEmail] = useState("");

  // Suggestions for the chatbar (optional, not displayed here)
  const suggestions = [
    "What is the structure of aspirin?",
    "Show me the IR spectrum of benzene",
    "Retrosynthesis of paracetamol",
    "Visualize caffeine molecule",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white text-gray-900 flex flex-col">
      {/* 1. Header/Navbar */}
      <header className="w-full py-4 px-4 sm:px-6 flex justify-between items-center border-b border-gray-100 bg-white z-20">
        <Link href="/" className="font-extrabold text-xl sm:text-2xl text-violet-700 tracking-tight">
          <span className="mr-1">🧪</span> ChemGPT
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-base font-medium">
          <Link href="#features" className="hover:text-violet-700 transition">Features</Link>
          <Link href="#who" className="hover:text-violet-700 transition">For Who</Link>
          <Link href="#roadmap" className="hover:text-violet-700 transition">Roadmap</Link>
          <Link href="#faq" className="hover:text-violet-700 transition">FAQ</Link>
          <Link
            href="/register"
            className="ml-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-bold shadow transition"
          >
            Get Early Access
          </Link>
        </nav>
        {/* Mobile Hamburger */}
        <MobileNav />
      </header>

      {/* 2. Hero Section */}
      <section className="flex flex-col items-center justify-center pt-10 pb-8 px-2 sm:px-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center mb-4 leading-tight">
          The <span className="text-violet-700">AI-Powered Platform</span> for <span className="text-cyan-500">Chemistry</span>
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl mb-6 text-gray-600">
          Combining AI models, molecular visualization, and educational tools for students, researchers, and professionals in chemistry.
        </p>
        {/* Ask Bar */}
        <div className="w-full max-w-xl flex flex-col sm:flex-row gap-2 mb-6 px-2">
          <input
            type="text"
            placeholder="Ask ChemGPT about reactions, molecules, spectra..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            className="flex-grow p-3 rounded-lg text-black focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto px-4 py-2 bg-cyan-500 rounded-lg text-white hover:bg-cyan-600"
          >
            Ask
          </button>
        </div>
        {/* Hashtags */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold text-xs">#ChemistryAI</span>
          <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-semibold text-xs">#MoleculeViz</span>
          <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full font-semibold text-xs">#Retrosynthesis</span>
        </div>
        {/* Demo Image */}
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 mb-6 flex flex-col items-center">
          <img
            src="/demo-molecule.png"
            alt="ChemGPT Visualization Demo"
            className="mx-auto mb-3 w-full max-w-xs sm:max-w-md rounded-xl shadow"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x180?text=Molecule+Demo'; }}
          />
          <div className="flex justify-end w-full">
            <button className="text-xs text-gray-400 hover:underline flex items-center gap-1">
              <span>Export as JPEG</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Powerful AI-Driven Features */}
      <section id="features" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
          Powerful <span className="text-violet-700">AI-Driven</span> Features
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
          ChemGPT combines cutting-edge AI with chemistry expertise to deliver tools that streamline research and learning.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
          <FeatureCard icon="💬" title="AI Chat Assistant" desc="Get answers to chemistry questions with intelligent formatting and LaTeX support for chemical equations." />
          <FeatureCard icon="🧬" title="Molecule Visualization" desc="Interactive 3D rendering of molecules using advanced visualization libraries." />
          <FeatureCard icon="🔄" title="Retrosynthesis Tool" desc="AI-powered analysis to discover synthetic routes for target molecules." />
          <FeatureCard icon="🧪" title="Spectroscopy Module" desc="Predict and interpret NMR, IR, and MS spectra with visual overlays." />
          <FeatureCard icon="📚" title="Chemistry Database" desc="Access comprehensive chemical data and information for your research." />
          <FeatureCard icon="📝" title="AI Lab Notebook" desc="Automated record-keeping & documentation with experiment insight and suggestions." soon />
          <FeatureCard icon="🤝" title="Collaboration Tools" desc="Team-based workspaces with role control and chemistry-aware project management." soon />
          <FeatureCard icon="🔐" title="Secure API Access" desc="Integrate ChemGPT functionalities directly into your lab systems or workflows." soon />
        </div>
      </section>

      {/* 4. Who ChemGPT Is For */}
      <section id="who" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-slate-50">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
          Who <span className="text-cyan-600">ChemGPT</span> Is For
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
          Our platform is designed to support everyone in the chemistry ecosystem, from students to professional researchers.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          <PersonaCard icon="🧑‍🎓" title="Students" desc="Access clear explanations of complex chemistry concepts with visual aids and interactive examples." />
          <PersonaCard icon="🔬" title="Researchers" desc="Accelerate your discovery process with AI-driven retrosynthesis planning and molecular analysis." />
          <PersonaCard icon="🏫" title="Educators" desc="Enhance your teaching with interactive visualizations and ready-to-use chemistry examples." />
          <PersonaCard icon="👨‍🔬" title="Professionals" desc="Streamline workflows with powerful tools for spectroscopy analysis and chemical data research." />
          <PersonaCard icon="🧑‍🔧" title="Hobbyists" desc="Unlock the world of chemistry for personal projects, experiments, and learning at your own pace." />
          <PersonaCard icon="🚀" title="Startups" desc="Apply R&D AI-enhanced chemistry tools for innovation and product development." />
        </div>
      </section>

      {/* 5. Development Roadmap */}
      <section id="roadmap" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
          Development <span className="text-violet-700">Roadmap</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
          Follow our journey as we build and enhance ChemGPT with new features and capabilities.
        </p>
        <div className="max-w-2xl w-full flex flex-col gap-0 relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-8 bottom-8 w-1 bg-violet-100 rounded-full z-0" aria-hidden="true"></div>
          {/* Phases */}
          <RoadmapStep date="April–May 2025" phase="Phase 1 (Complete)" title="Foundation & Chat Interface" desc="Basic platform structure, AI chat with chemistry knowledge, and frontend/backend integration." complete />
          <RoadmapStep date="May–June 2025" phase="Phase 2 (Current)" title="Molecule Visualization & Retrosynthesis" desc="3D molecular visualization tool and AI-powered retrosynthesis planning capabilities." />
          <RoadmapStep date="June–July 2025" phase="Phase 3 (Upcoming)" title="Spectroscopy & User Profiles" desc="Spectroscopy analysis tools (NMR, IR, MS) and user authentication with saved history." />
          <RoadmapStep date="August 2025" phase="Phase 4 (Planned)" title="Advanced Features & Mobile Support" desc="Multi-language support, mobile-friendly interface, and premium features for subscribers." />
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section id="faq" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-slate-50">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
          Frequently Asked <span className="text-cyan-600">Questions</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
          Got questions about ChemGPT? Find answers to the most common questions below.
        </p>
        <div className="max-w-2xl w-full">
          <FAQAccordion />
        </div>
      </section>

      {/* 7. Join Our Community */}
      <section className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
          Join Our <span className="text-violet-700">Community</span>
        </h2>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
          Join ChemGPT’s Discord server for beta access, support, and early access to features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <CommunityCard icon="💬" title="Discord Community" desc="Join our Discord to discuss features, get beta access, and early access to features." link="https://discord.gg/your-link" linkText="Join Discord" />
          <CommunityCard icon="📖" title="Documentation" desc="Explore example code, API references, and tutorials in our documentation." link="https://docs.chemgpt.app/" linkText="Read Docs" />
          <CommunityCard icon="👥" title="User Forum" desc="Ask questions, share your ideas, and connect with other ChemGPT users." link="https://forum.chemgpt.app/" linkText="Visit Forum" />
        </div>
      </section>

      {/* 8. Final Call to Action */}
      <section className="w-full flex flex-col items-center py-16 px-4 bg-gradient-to-br from-violet-50 to-cyan-50">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
          Ready to Transform Your <span className="text-cyan-600">Chemistry Work</span>?
        </h2>
        <p className="text-lg text-gray-700 text-center mb-6 max-w-2xl">
          Join the waiting list to get early access when we launch. Be among the first to experience the future of chemistry tools.
        </p>
        <form
          action="https://your-waitlist-provider.com"
          method="POST"
          className="flex flex-col md:flex-row gap-4 w-full max-w-md"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg border border-gray-300 shadow bg-white text-gray-900 focus:outline-none"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-bold shadow transition"
          >
            Get Early Access
          </button>
        </form>
      </section>

      <footer className="py-8 mt-16 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ChemGPT. All rights reserved. <span className="ml-2">for the chemistry community</span>
      </footer>
    </div>
  );
}
