
import { useRouter } from "next/router";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleAsk = () => {
    if (query.trim()) {
      router.push(`/chat?question=${encodeURIComponent(query)}`);
    }
  };

  const examples = [
    {
      question: "What is the structure of aspirin?",
      answer:
        "Aspirin, also known as acetylsalicylic acid, has the formula C9H8O4. It contains a benzene ring with a carboxylic acid and an ester group attached.",
    },
    {
      question: "Predict the IR spectrum of ethanol",
      answer:
        "Strong O-H stretch around 3300 cm⁻¹, C-H stretch near 2900 cm⁻¹, and C-O stretch near 1050 cm⁻¹.",
    },
    {
      question: "Give retrosynthesis of paracetamol",
      answer:
        "Break down to p-aminophenol and acetic anhydride. One-step acetylation gives paracetamol.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-3xl mx-auto text-center mt-20">
        <h1 className="text-4xl font-bold mb-4">Welcome to ChemGPT ⚗️</h1>
        <p className="text-lg text-gray-700 mb-6">
          Ask anything about chemistry — molecules, reactions, spectra, and more.
        </p>
        <div className="flex justify-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Try: What is the structure of caffeine?"
            className="w-full max-w-xl px-4 py-2 border rounded-lg shadow-sm"
          />
          <button
            onClick={handleAsk}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Ask
          </button>
        </div>
      </div>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">🔍 Example Questions</h2>
        <ul className="space-y-4">
          {examples.map((item, i) => (
            <li
              key={i}
              className="p-4 bg-white rounded-xl shadow hover:bg-blue-50 transition"
            >
              <p
                className="text-blue-600 font-medium cursor-pointer hover:underline"
                onClick={() =>
                  router.push(`/chat?question=${encodeURIComponent(item.question)}`)
                }
              >
                {item.question}
              </p>
              <p className="text-gray-700 mt-2 text-sm">{item.answer}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
