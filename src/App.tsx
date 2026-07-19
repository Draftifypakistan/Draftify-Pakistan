import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Estimator from "./components/Estimator";
import NetworkPlanner from "./components/NetworkPlanner";
import AIConsultant from "./components/AIConsultant";
import FAQs from "./components/FAQs";
import Footer from "./components/Footer";
import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";

export default function App() {
  const triggerScroll = (elementId: string) => {
    const element = document.getElementById(elementId);
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

  const handleOpenAIConsultant = () => {
    triggerScroll("ai-chat-section");
  };

  const handleOpenEstimator = () => {
    triggerScroll("estimator-section");
  };

  return (
    <div id="root_layout" className="relative bg-slate-50 text-slate-900 min-h-screen">
      
      {/* Background Mesh Gradient Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[40%] bg-blue-500/5 blur-[140px] rounded-full"></div>
        <div className="absolute top-[35%] right-[-10%] w-[55%] h-[45%] bg-indigo-500/5 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[50%] h-[40%] bg-sky-500/5 blur-[130px] rounded-full"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navigation Bar */}
        <Navbar 
          onEstimateClick={handleOpenEstimator} 
          onChatClick={handleOpenAIConsultant} 
        />

        {/* Hero Section (Contains lead capture form directly) */}
        <Hero 
          onEstimateClick={handleOpenEstimator} 
          onChatClick={handleOpenAIConsultant} 
        />

        {/* High Conversion Quick Stats Bar */}
        <section className="relative z-20 bg-white border-y border-slate-200 px-6 py-10 shadow-xs">
          <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-display">60%</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Average Cost Savings</p>
            </div>
            <div className="space-y-1 border-l border-slate-100">
              <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 font-display">100%</p>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Bilateral NDA Security</p>
            </div>
          </div>
        </section>

        {/* Services Showcase Section */}
        <Services />

        {/* Interactive Cost Calculator & Estimation Section */}
        <Estimator />

        {/* Interactive Networking Planner Tool Suite */}
        <NetworkPlanner />

        {/* Interactive Server-Side AI Consultant Chat */}
        <AIConsultant />

        {/* FAQs Accordion Section */}
        <FAQs />

        {/* Footer with offices & direct channels */}
        <Footer />

      </div>

      {/* Floating high-converting sticky chat indicator button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpenAIConsultant}
          title="Consult with our AI Specialist"
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-4 py-3.5 rounded-full shadow-2xl shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="text-xs font-black uppercase tracking-wider">Ask AI Agent</span>
        </button>
      </div>

    </div>
  );
}
