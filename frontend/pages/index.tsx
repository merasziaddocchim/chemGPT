"use client";
import Head from "next/head";
import Link from "next/link";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

import FeatureCard from "@/components/FeatureCard";
import PersonaCard from "@/components/PersonaCard";
import RoadmapStep from "@/components/RoadmapStep";
import FAQAccordion from "@/components/FAQAccordion";
import CommunityCard from "@/components/CommunityCard";
import MobileNav from "@/components/MobileNav";
import ThreeDMolViewer from "@/components/ThreeDMolViewer";

const suggestions = [
  "Show retrosynthesis for a new cancer drug candidate",
  "How does AI interpret NMR of aspirin?",
  "What’s the greenest route for ibuprofen synthesis?",
  "Visualize a molecule and predict its properties",
];

const DEFAULT_BENZENE_PDB = `
ATOM      1  C1  BEN A   1       0.000   1.396   0.000  1.00  0.00           C  
ATOM      2  C2  BEN A   1      -1.209   0.698   0.000  1.00  0.00           C  
ATOM      3  C3  BEN A   1      -1.209  -0.698   0.000  1.00  0.00           C  
ATOM      4  C4  BEN A   1       0.000  -1.396   0.000  1.00  0.00           C  
ATOM      5  C5  BEN A   1       1.209  -0.698   0.000  1.00  0.00           C  
ATOM      6  C6  BEN A   1       1.209   0.698   0.000  1.00  0.00           C  
ATOM      7  H1  BEN A   1       0.000   2.479   0.000  1.00  0.00           H  
ATOM      8  H2  BEN A   1      -2.147   1.240   0.000  1.00  0.00           H  
ATOM      9  H3  BEN A   1      -2.147  -1.240   0.000  1.00  0.00           H  
ATOM     10  H4  BEN A   1       0.000  -2.479   0.000  1.00  0.00           H  
ATOM     11  H5  BEN A   1       2.147  -1.240   0.000  1.00  0.00           H  
ATOM     12  H6  BEN A   1       2.147   1.240   0.000  1.00  0.00           H  
END
`;

export default function HomePage() {
  const [query, setQuery] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [molInput, setMolInput] = useState<string>("");
  const [molData, setMolData] = useState<string>(DEFAULT_BENZENE_PDB);
  const router = useRouter();

  // This function should call your backend to fetch PDB from name/SMILES; for now, it uses a placeholder
  const handleMolVisualize = async () => {
    if (molInput.trim().toLowerCase() === "benzene" || molInput.trim() === "C1=CC=CC=C1") {
      setMolData(DEFAULT_BENZENE_PDB);
    } else {
      // TODO: connect to backend for real molecule generation
      alert("3D viewer demo: only benzene and its SMILES are supported in this demo.");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };
  const handleSearch = (customQuery?: string) => {
    const q = customQuery !== undefined ? customQuery : query;
    if (q.trim() !== "") {
      router.push(`/chat?query=${encodeURIComponent(q)}`);
    }
  };

  return (
    <>
      {/* SEO + Meta */}
      <Head>
        <title>ChemGPT – The AI Chemistry Platform</title>
        <meta name="description" content="AI-powered chemistry assistant for researchers, students, and industry. Retrosynthesis, spectra, visualization, and more. Try ChemGPT today!" />
        <meta name="keywords" content="AI chemistry, retrosynthesis, spectroscopy, molecule visualization, cheminformatics, drug design" />
        <meta property="og:title" content="ChemGPT – The AI Chemistry Platform" />
        <meta property="og:description" content="AI-powered chemistry assistant for retrosynthesis, spectra, visualization, and more." />
        <meta property="og:image" content="/og-cover.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@chemgpt" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen w-full bg-gradient-to-b from-white via-slate-50 to-white text-gray-900 flex flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full py-4 px-4 sm:px-6 flex justify-between items-center border-b border-gray-100 bg-white/90 backdrop-blur">
        <Link href="/" className="flex items-center gap-2">
          <img src="/chemgptlogo.png" alt="ChemGPT Logo" className="h-8 sm:h-10 w-auto" />
          <span className="font-extrabold text-xl sm:text-2xl text-violet-700 tracking-tight">ChemGPT</span>
        </Link>

          <nav className="hidden md:flex items-center gap-6 text-base font-medium">
            {/* 
              For smooth scroll:
              <ScrollLink to="features" smooth={true} duration={500}>Features</ScrollLink> 
            */}
            <Link href="#features" className="hover:text-violet-700 transition">Features</Link>
            <Link href="#who" className="hover:text-violet-700 transition">For Who</Link>
            <Link href="#roadmap" className="hover:text-violet-700 transition">Roadmap</Link>
            <Link href="#faq" className="hover:text-violet-700 transition">FAQ</Link>
            <Link
              href="/register"
              className="ml-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-xl font-bold shadow transition-transform duration-150 hover:scale-105"
            >
              Get Early Access
            </Link>
          </nav>
          <MobileNav />
        </header>

        {/* --- Hero Section --- */}
        <section className="flex flex-col items-center justify-center pt-16 pb-12 px-2 sm:px-0">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-center mb-4 leading-tight drop-shadow-lg">
            The <span className="text-violet-700">AI Platform</span> Redefining <span className="text-cyan-600">Chemistry</span>
          </h1>
          <p className="text-xl md:text-2xl text-center max-w-2xl mb-8 text-gray-700">
            Chemistry answers, retrosynthesis, and spectra—explained by AI, trusted by scientists.<br />
            For students, researchers, and professionals.
          </p>
          <div className="w-full max-w-xl mb-6 px-2">
            <div className="flex flex-col sm:flex-row gap-2 bg-white rounded-xl border border-gray-300 shadow-lg p-2">
              <input
                type="text"
                placeholder="Ask ChemGPT about reactions, drug synthesis, spectra…"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="flex-grow p-3 rounded-lg text-black border-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={() => handleSearch()}
                className="w-full sm:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-white font-bold shadow transition-transform duration-150 hover:scale-105"
              >
                Ask
              </button>
            </div>
            <div className="w-full flex flex-wrap gap-2 mt-2 justify-center">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSearch(s)}
                  className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 hover:underline px-3 py-1 rounded-full text-xs font-semibold transition"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {/* Hashtags */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full font-semibold text-xs">#DrugDesign</span>
            <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full font-semibold text-xs">#AIforScience</span>
            <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-700 rounded-full font-semibold text-xs">#ExplainableAI</span>
          </div>
          {/* Trust/As Seen In (placeholder) */}
          
        </section>

        <hr className="w-20 mx-auto border-cyan-100 my-8" />

        {/* --- Visualize Molecule Section --- */}
        <section className="w-full bg-gradient-to-tr from-cyan-50 to-violet-50 py-16 px-4 flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-center">
            Visualize Your Molecule
          </h2>
          <p className="text-lg text-gray-600 text-center mb-6 max-w-2xl">
            Enter any molecule name or SMILES to see its 3D structure and explore stereochemistry. (Demo: try <span className="font-mono bg-gray-100 px-2 py-1 rounded">benzene</span> or <span className="font-mono bg-gray-100 px-2 py-1 rounded">C1=CC=CC=C1</span>)
          </p>
          <div className="w-full max-w-2xl mb-6 flex flex-col sm:flex-row items-center gap-4">
            <input
              type="text"
              placeholder="e.g., benzene or C1=CC=CC=C1"
              value={molInput}
              onChange={(e) => setMolInput(e.target.value)}
              className="flex-grow px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="button"
              onClick={handleMolVisualize}
              className="px-8 py-3 bg-violet-700 hover:bg-violet-800 rounded-xl text-white font-bold shadow transition-transform duration-150 hover:scale-105"
            >
              Visualize
            </button>
          </div>
          <div className="w-full flex justify-center">
            <div className="rounded-2xl shadow-lg bg-white p-4 w-full max-w-3xl min-h-[420px] flex items-center justify-center">
              <ThreeDMolViewer moleculeData={molData} />
            </div>
          </div>
        </section>

        <hr className="w-20 mx-auto border-cyan-100 my-8" />

        {/* --- Features Section --- */}
        <section id="features" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
            Not Just Another AI Chat — <span className="text-violet-700">Your Full Chemistry Copilot</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
            ChemGPT tackles the toughest chemistry and drug design problems: explainable AI, green chemistry, synthesis planning, and instant visualization.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
            <FeatureCard icon="💬" title="Explainable AI Chemistry Chat" desc="Get answers and see step-by-step reasoning, with full support for LaTeX, spectra, and more." />
            <FeatureCard icon="🧬" title="3D Molecule Visualization" desc="Explore molecules interactively with advanced 3D rendering tools." />
            <FeatureCard icon="🔄" title="Retrosynthesis & Pathway Finder" desc="AI-driven, transparent retrosynthesis suggestions — with alternative routes, green options, and references." />
            <FeatureCard icon="🧪" title="Spectroscopy Analysis" desc="Predict and interpret NMR, IR, and MS spectra — with overlays, assignments, and more." />
            <FeatureCard icon="📚" title="Chemistry Knowledge Base" desc="Instant access to trusted, up-to-date data — reactions, compounds, literature." />
            <FeatureCard icon="🌱" title="Green Chemistry Advisor" desc="Plan routes with sustainability in mind, minimizing waste and energy. (Coming Soon)" soon />
            <FeatureCard icon="📝" title="AI Lab Notebook" desc="Smart record-keeping, experiment suggestions, and data export. (Beta)" soon />
            <FeatureCard icon="🔐" title="API & Integration" desc="Bring ChemGPT’s power into your own apps, ELN, or pipeline. (Coming Soon)" soon />
          </div>
        </section>

        <hr className="w-20 mx-auto border-cyan-100 my-8" />

        {/* --- Who ChemGPT Is For --- */}
        <section id="who" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-slate-50">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
            Who’s <span className="text-cyan-600">Using ChemGPT?</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
            Students, researchers, startups, and industry professionals — anyone who wants the next generation of chemistry tools, now.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            <PersonaCard icon="🧑‍🎓" title="Students" desc="Understand chemistry, spectra, and synthesis with clear visuals and AI explanations." />
            <PersonaCard icon="🔬" title="Researchers" desc="Plan and document research faster with retrosynthesis, visualization, and smart AI." />
            <PersonaCard icon="🏫" title="Educators" desc="Build interactive teaching resources, demos, and real-world examples." />
            <PersonaCard icon="👨‍🔬" title="Industry & Drug Design" desc="Accelerate development cycles with automated, transparent, and green AI support." />
            <PersonaCard icon="🧑‍🔧" title="Hobbyists" desc="Tinker, learn, and explore chemistry at your own pace." />
            <PersonaCard icon="🚀" title="Startups & Innovators" desc="Prototype new molecules, materials, and ideas with AI acceleration." />
          </div>
        </section>

        <hr className="w-20 mx-auto border-cyan-100 my-8" />

        {/* --- Roadmap --- */}
        <section id="roadmap" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
            Building the <span className="text-violet-700">Future of Chemistry</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
            We’re moving fast! Here’s what’s live, what’s next, and what you can help shape as a founding user.
          </p>
          <div className="max-w-2xl w-full flex flex-col gap-0 relative">
            <div className="absolute left-5 top-8 bottom-8 w-1 bg-violet-100 rounded-full z-0" aria-hidden="true"></div>
            <RoadmapStep date="April–May 2025" phase="Phase 1 (Done)" title="MVP & AI Chat" desc="Chat-based chemistry Q&A, core backend, and first frontend launch." complete />
            <RoadmapStep date="May–June 2025" phase="Phase 2 (Now)" title="Molecule Visualization & Retrosynthesis" desc="3D molecule tools and the first explainable retrosynthesis AI." />
            <RoadmapStep date="June–July 2025" phase="Phase 3 (Coming)" title="Spectroscopy, User Accounts & Data Export" desc="Spectra prediction, profiles, export, and history." />
            <RoadmapStep date="Summer 2025" phase="Phase 4 (Planned)" title="Green Chemistry & API" desc="Green route planner, API integrations, and advanced features." />
          </div>
        </section>

        <hr className="w-20 mx-auto border-cyan-100 my-8" />

        {/* --- FAQ --- */}
        <section id="faq" className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-slate-50">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
            Frequently Asked <span className="text-cyan-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
            Got questions? We’ve got honest, no-BS answers. (And if you have more, join the Discord!)
          </p>
          <div className="max-w-2xl w-full">
            <FAQAccordion />
          </div>
        </section>

        <hr className="w-20 mx-auto border-cyan-100 my-8" />

        {/* --- Community --- */}
        <section className="w-full max-w-screen-xl mx-auto flex flex-col items-center py-16 px-4 bg-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
            Shape ChemGPT With Us
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl">
            Be the first to access, test, and guide our next features. Connect, ask, and build with us.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <CommunityCard icon="💬" title="Discord Community" desc="Join, discuss features, and access beta releases." link="https://discord.gg/your-link" linkText="Join Discord" />
            <CommunityCard icon="📖" title="Documentation" desc="See how to use ChemGPT, API docs, and tutorials." link="https://docs.chemgpt.app/" linkText="Read Docs" />
            <CommunityCard icon="👥" title="User Forum" desc="Ask questions, share feedback, connect with the community." link="https://forum.chemgpt.app/" linkText="Visit Forum" />
          </div>
        </section>

        {/* --- Waitlist & CTA --- */}
        <section className="w-full flex flex-col items-center py-16 px-4 bg-gradient-to-br from-violet-50 to-cyan-50">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center">
            Ready to Build the Future of Chemistry?
          </h2>
          <p className="text-lg text-gray-700 text-center mb-6 max-w-2xl">
            Get on the waitlist to shape ChemGPT and receive early access to the next-gen AI chemistry platform.
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
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl text-white font-bold shadow transition-transform duration-150 hover:scale-105"
            >
              Join Waitlist
            </button>
          </form>
        </section>

        {/* --- Footer --- */}
        <footer className="py-8 mt-16 text-center text-xs text-gray-400 flex flex-col items-center gap-2">
          <div>
            <a href="https://twitter.com/chemgpt" className="hover:text-cyan-700 mx-2">Twitter</a> ·
            <a href="mailto:contact@chemgpt.app" className="hover:text-cyan-700 mx-2">Contact</a>
          </div>
          <div>
            © {new Date().getFullYear()} ChemGPT. All rights reserved.
            <span className="ml-2">Building with the chemistry community.</span>
          </div>
        </footer>
      </div>
    </>
  );
}
