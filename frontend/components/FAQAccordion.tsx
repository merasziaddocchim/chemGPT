import { useState } from "react";

const faqs = [
  {
    question: "What is ChemGPT?",
    answer: "ChemGPT is an AI-powered platform for chemistry students, researchers, and professionals, offering advanced chat, retrosynthesis, molecular visualization, and spectroscopy tools.",
  },
  {
    question: "When will ChemGPT be available?",
    answer: "We plan to launch a public beta in Q3 2025. Join the waitlist for early access!",
  },
  {
    question: "Will ChemGPT be free to use?",
    answer: "There will be a generous free tier. Advanced or premium features may require a subscription.",
  },
  {
    question: "What technologies does ChemGPT use?",
    answer: "ChemGPT combines AI/LLMs, 3Dmol.js, cheminformatics libraries, OpenAI, and custom data science pipelines.",
  },
  {
    question: "Can I contribute to the development of ChemGPT?",
    answer: "Absolutely! Community feedback, beta testers, and open-source contributions are welcome.",
  },
  {
    question: "Will ChemGPT be available in languages other than English?",
    answer: "Yes, multi-language support is in the roadmap. Your feedback will help prioritize new languages.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div key={faq.question} className="bg-white rounded-lg shadow border">
          <button
            className="w-full text-left px-6 py-4 font-semibold flex items-center justify-between focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            <span>{faq.question}</span>
            <span className="ml-4 text-lg">{openIndex === idx ? "−" : "+"}</span>
          </button>
          {openIndex === idx && (
            <div className="px-6 pb-4 text-gray-600 text-base animate-fadeIn">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FAQAccordion;
