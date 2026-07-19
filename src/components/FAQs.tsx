import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ChevronDown } from "lucide-react";
import { FAQItem } from "../types";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<"all" | "docs" | "it" | "process">("all");

  const faqs: FAQItem[] = [
    {
      category: "process",
      question: "How fast do you deliver document formatting and typing orders?",
      answer: "Standard orders are completed within 24 to 48 hours. We also offer an Urgent service for same-day delivery (6-12 hours) and a Super Express service that delivers minor file edits and urgent hotfixes within 1-2 hours."
    },
    {
      category: "docs",
      question: "What types of online forms do you help submit?",
      answer: "We assist with a variety of portals, including university admission portals, government job portals, FBR/SECP corporate registration systems, visa application forms, and private portal applications, ensuring all data is entered correctly and documents are uploaded without errors."
    },
    {
      category: "it",
      question: "What kind of IT equipment and hardware can you supply?",
      answer: "We source and supply high-quality computer accessories, high-speed SSDs, RAM, network routers, laser printers, scanners, copiers, and pre-built or custom-built desktop PCs optimized for home or office productivity, delivered directly to your doorstep."
    },
    {
      category: "it",
      question: "Can your developers integrate external AI APIs securely?",
      answer: "Absolutely. We specialize in building secure server-side proxy routes (like our Node.js backends) to handle API requests securely, ensuring keys (such as Gemini, Stripe, or Map API credentials) are never exposed to the client-side browser."
    },
    {
      category: "process",
      question: "Do you sign legally binding Non-Disclosure Agreements (NDAs)?",
      answer: "Yes. Protection of intellectual property and client privacy is our primary concern. We sign comprehensive, legally-compliant bilateral NDAs before reviewing any confidential document, proprietary file, or database detail."
    },
    {
      category: "process",
      question: "How can I start a project with Draftify Pakistan?",
      answer: "Simply use our online cost estimator to calculate a price, or submit an inquiry form. You can also launch a WhatsApp chat directly to discuss your requirements with our team and get started immediately."
    }
  ];

  const filteredFaqs = activeCategory === "all"
    ? faqs
    : faqs.filter(f => f.category === activeCategory);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      
      {/* Decorative Blob */}
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-indigo-500/5 blur-[120px] rounded-full"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5 animate-pulse">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Questions & Clarifications</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-display">Questions</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            Everything you need to know about our document standards, online submission guidelines, IT support services, and pricing SLA options.
          </p>

          {/* Quick Categories filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {(["all", "docs", "it", "process"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  activeCategory === cat
                    ? "bg-blue-500/10 text-blue-800 border-blue-500/20"
                    : "bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {cat === "all" ? "All FAQs" : cat === "docs" ? "Documents & Typing" : cat === "it" ? "IT & Hardware" : "Process & SLAs"}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs list accordion */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300 shadow-xs"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-slate-950 font-bold text-sm sm:text-base focus:outline-none cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-lg bg-slate-50 border border-slate-200/50 text-blue-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
                  }`}
                >
                  <div className="p-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Conversion Bottom prompt */}
        <div className="mt-12 text-center p-6 bg-white border border-slate-200 rounded-2xl max-w-2xl mx-auto shadow-xs">
          <p className="text-xs text-slate-600">
            Have an urgent document formatting task or a complex IT requirement not listed here?
          </p>
          <a
            href="#ai-chat-section"
            className="text-blue-700 hover:text-blue-800 text-xs font-bold inline-block mt-1.5 underline cursor-pointer"
          >
            Ask our 24/7 AI Sales Engineer directly →
          </a>
        </div>

      </div>
    </section>
  );
}
