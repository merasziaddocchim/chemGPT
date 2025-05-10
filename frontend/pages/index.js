import { useState } from "react";
import AskChemGPT from "../components/AskChemGPT";
import RetrosynthesisTool from "../components/RetrosynthesisTool";
import SpectroscopyTool from "../components/SpectroscopyTool";

const TABS = {
  ask: "Ask ChemGPT",
  retro: "Retrosynthesis",
  spec: "Spectroscopy",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("ask");

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          🧪 ChemGPT Platform
        </h1>

        <div className="flex justify-center gap-4 mb-6">
          {Object.entries(TABS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                activeTab === key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === "ask" && <AskChemGPT />}
        {activeTab === "retro" && <RetrosynthesisTool />}
        {activeTab === "spec" && <SpectroscopyTool />}
      </div>
    </main>
  );
}
