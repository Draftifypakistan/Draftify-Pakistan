import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, MessageSquareCode, Globe } from "lucide-react";
import logoImg from "../assets/images/draftify_logo_1783493966311.jpg";

interface NavbarProps {
  onEstimateClick: () => void;
  onChatClick: () => void;
}

export default function Navbar({ onEstimateClick, onChatClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      id="app_navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200 py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-blue-500/10 transition-transform group-hover:scale-105">
              <img
                src={logoImg}
                alt="Draftify Pakistan"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-bold text-xl tracking-tight text-slate-950">
                  Draftify
                </span>
                <span className="bg-blue-500/15 text-blue-600 border border-blue-500/30 font-sans text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  Pakistan
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-sans tracking-wide">
                Documents & Custom IT
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("services-section")}
              className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isScrolled ? "text-slate-800 hover:text-blue-600" : "text-slate-900 hover:text-blue-700"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("estimator-section")}
              className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isScrolled ? "text-slate-800 hover:text-blue-600" : "text-slate-900 hover:text-blue-700"
              }`}
            >
              Cost Estimator
            </button>
            <button
              onClick={() => scrollToSection("networking-section")}
              className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isScrolled ? "text-slate-800 hover:text-blue-600" : "text-slate-900 hover:text-blue-700"
              }`}
            >
              Network Planner
            </button>
            <button
              onClick={() => scrollToSection("faq-section")}
              className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isScrolled ? "text-slate-800 hover:text-blue-600" : "text-slate-900 hover:text-blue-700"
              }`}
            >
              FAQs
            </button>
            <button
              onClick={() => scrollToSection("contact-section")}
              className={`text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                isScrolled ? "text-slate-800 hover:text-blue-600" : "text-slate-900 hover:text-blue-700"
              }`}
            >
              Get in Touch
            </button>
          </div>

          {/* Call to Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onChatClick}
              className={`flex items-center space-x-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200 border cursor-pointer ${
                isScrolled
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"
                  : "bg-white/40 hover:bg-white/60 text-slate-900 border-slate-300/50"
              }`}
            >
              <MessageSquareCode className="w-4.5 h-4.5 text-blue-600" />
              <span>Ask AI Agent</span>
            </button>
            <button
              onClick={onEstimateClick}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/15 cursor-pointer group"
            >
              <span>Instant Quote</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={onChatClick}
              className={`flex items-center justify-center p-2 rounded-lg transition-colors border ${
                isScrolled
                  ? "text-blue-600 bg-slate-100 border-slate-200"
                  : "text-blue-700 bg-white/40 border-slate-300/50"
              }`}
            >
              <MessageSquareCode className="w-5 h-5 text-blue-600" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg focus:outline-none border transition-colors ${
                isScrolled
                  ? "text-slate-800 bg-slate-100 border-slate-200 hover:bg-slate-200"
                  : "text-slate-900 bg-white/40 border-slate-300/50 hover:bg-white/60"
              }`}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-2xl px-4 pt-4 pb-6 space-y-3 animate-fade-in-up">
          <button
            onClick={() => scrollToSection("services-section")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Services & Expertise
          </button>
          <button
            onClick={() => scrollToSection("estimator-section")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Interactive Estimator
          </button>
          <button
            onClick={() => scrollToSection("networking-section")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Networking Toolkit
          </button>
          <button
            onClick={() => scrollToSection("faq-section")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Help & FAQs
          </button>
          <button
            onClick={() => scrollToSection("contact-section")}
            className="block w-full text-left px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-blue-600"
          >
            Contact Offices
          </button>

          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onChatClick();
              }}
              className="flex items-center justify-center space-x-2 w-full text-center px-4 py-2.5 rounded-xl text-base font-semibold text-slate-800 bg-slate-50 border border-slate-200 hover:bg-slate-100"
            >
              <MessageSquareCode className="w-5 h-5 text-blue-600" />
              <span>Consult AI Specialist</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onEstimateClick();
              }}
              className="w-full text-center px-4 py-2.5 rounded-xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
            >
              Calculate Quote Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
