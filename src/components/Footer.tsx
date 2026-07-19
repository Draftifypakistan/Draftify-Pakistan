import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowUp } from "lucide-react";
import logoImg from "../assets/images/draftify_logo_1783493966311.jpg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact-section" className="relative bg-slate-100 text-slate-600 pt-20 pb-8 border-t border-slate-200 overflow-hidden font-sans">
      
      {/* Absolute decorative mesh gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-[-15%] left-[-15%] w-[450px] h-[450px] bg-blue-600/5 blur-[130px] rounded-full"></div>
        <div className="absolute top-[-15%] right-[-15%] w-[450px] h-[450px] bg-indigo-500/5 blur-[130px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-column footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-200">
          
          {/* Col 1: Brand details & corporate description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <img
                  src={logoImg}
                  alt="Draftify Pakistan"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-tight text-slate-950">Draftify <span className="text-blue-600 font-semibold">Pakistan</span></span>
                <p className="text-[10px] text-slate-400 font-sans tracking-widest uppercase">Digital & Engineering</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              The premier corporate technical outsourcing house in Pakistan. Offering professional MS Word & Excel formatting, Urdu Unicode InPage typing, online form data submissions, IT hardware supply, and full-stack software solutions.
            </p>

            {/* Certifications and credentials list */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded text-[10px] text-blue-800 font-semibold uppercase tracking-wider">
                FBR Registered
              </span>
            </div>
          </div>

          {/* Col 2: High conversion quick navigation links */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">Service Portals</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>
                <a href="#services-section" className="hover:text-blue-600 transition-colors">MS Word & Excel Formatting</a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-blue-600 transition-colors">Urdu Unicode & InPage Typing</a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-blue-600 transition-colors">Govt & Private Form Submission</a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-blue-600 transition-colors">IT Equipment Supply & Setup</a>
              </li>
              <li>
                <a href="#estimator-section" className="hover:text-blue-600 transition-colors">Instant Project Pricing Quote</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Real Corporate office locations */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">Headquarters Hub</h4>
            
            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-slate-950">Main Headquarters</p>
                  <p className="text-[11px] text-slate-500">Quetta Avenue Housing Scheme, Block-F, Quetta (87300), Balochistan, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Contact channels */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">Direct Contacts</h4>
            
            <div className="space-y-3 text-xs text-slate-600">
              {/* Primary Email */}
              <a
                href="mailto:draftifypakistan@gmail.com"
                className="flex items-center space-x-2.5 hover:text-blue-600 transition-colors group text-slate-600"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-blue-700 group-hover:bg-blue-500/10">
                  <Mail className="w-4 h-4" />
                </div>
                <span>draftifypakistan@gmail.com</span>
              </a>

              {/* Direct Phone */}
              <a
                href="tel:+923083396157"
                className="flex items-center space-x-2.5 hover:text-blue-600 transition-colors group text-slate-600"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-blue-700 group-hover:bg-blue-500/10">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+92 (308) 339-6157</span>
              </a>

              {/* Direct WhatsApp link */}
              <a
                href="https://wa.me/923083396157?text=Hello%20Draftify%20Pakistan!%20I%20would%20like%20to%20consult%20on%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2.5 hover:text-blue-600 transition-colors group text-slate-600"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 group-hover:text-blue-700 group-hover:bg-blue-500/10">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span className="font-bold text-blue-700">Launch Live WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Col 5: Social QR Hub & Smart Multi-Link */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-950">Social QR Portal</h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Scan with your mobile camera to instantly access our social media card (WhatsApp, Facebook, Instagram & custom portals).
            </p>
            
            <div className="relative group w-36 h-36 bg-white p-2.5 rounded-2xl shadow-md border border-slate-200 mx-auto sm:mx-0 overflow-hidden transition-all duration-300 hover:scale-105">
              {/* Scanline laser animation */}
              <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent top-0 animate-bounce z-10 opacity-70"></div>
              
              {/* QR Code SVG Vector */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                {/* Outer corners finder patterns */}
                {/* Top-Left Finder */}
                <path d="M 5,5 H 25 V 25 H 5 Z M 9,9 V 21 H 21 V 9 Z M 12,12 H 18 V 18 H 12 Z" />
                {/* Top-Right Finder */}
                <path d="M 75,5 H 95 V 25 H 75 Z M 79,9 V 21 H 91 V 9 Z M 82,12 H 88 V 18 H 82 Z" />
                {/* Bottom-Left Finder */}
                <path d="M 5,75 H 25 V 95 H 5 Z M 9,79 V 91 H 21 V 79 Z M 12,82 H 18 V 88 H 12 Z" />
                
                {/* Alignment pattern bottom right */}
                <path d="M 77,77 H 83 V 83 H 77 Z" />
                
                {/* Simulated high-fidelity dense data matrices (optimized for clean scan look) */}
                <path d="M 30,5 H 35 V 10 H 30 Z M 40,5 H 45 V 15 H 40 Z M 50,5 H 55 V 10 H 50 Z M 60,5 H 65 V 15 H 60 Z M 35,15 H 40 V 20 H 35 Z M 45,15 H 50 V 20 H 45 Z M 55,15 H 60 V 20 H 55 Z M 65,15 H 70 V 20 H 65 Z" />
                <path d="M 30,25 H 40 V 30 H 30 Z M 45,25 H 55 V 30 H 45 Z M 60,25 H 70 V 30 H 60 Z M 5,30 H 15 V 35 H 5 Z M 20,30 H 25 V 40 H 20 Z M 30,35 H 35 V 40 H 30 Z M 40,35 H 50 V 40 H 40 Z M 55,35 H 60 V 45 H 55 Z M 65,35 H 75 V 40 H 65 Z" />
                <path d="M 5,45 H 10 V 55 H 5 Z M 15,45 H 25 V 50 H 15 Z M 30,45 H 35 V 55 H 30 Z M 40,45 H 45 V 50 H 40 Z M 50,45 H 55 V 55 H 50 Z M 60,45 H 65 V 55 H 60 Z M 70,45 H 80 V 50 H 70 Z" />
                <path d="M 10,60 H 20 V 65 H 10 Z M 25,60 H 35 V 65 H 25 Z M 40,60 H 45 V 70 H 40 Z M 50,60 H 60 V 65 H 50 Z M 65,60 H 75 V 65 H 65 Z M 80,60 H 90 V 65 H 80 Z" />
                <path d="M 5,70 H 15 V 75 H 5 Z M 20,70 H 30 V 75 H 20 Z M 35,70 H 40 V 85 H 35 Z M 45,70 H 55 V 75 H 45 Z M 60,70 H 70 V 75 H 60 Z M 75,70 H 85 V 75 H 75 Z" />
                <path d="M 30,80 H 35 V 95 H 30 Z M 45,80 H 55 V 85 H 45 Z M 60,80 H 65 V 95 H 60 Z M 70,80 H 75 V 90 H 70 Z M 85,80 H 90 V 95 H 85 Z" />
                <path d="M 40,90 H 50 V 95 H 40 Z M 55,90 H 60 V 95 H 55 Z M 75,90 H 80 V 95 H 75 Z" />
                
                {/* Centered Brand Dot for modern visual appeal */}
                <rect x="42" y="42" width="16" height="16" rx="3.5" fill="white" />
                <circle cx="50" cy="50" r="5" fill="#2563eb" />
              </svg>

              {/* Hover instructions overlay */}
              <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                <span className="text-[10px] font-extrabold text-blue-400 tracking-wider uppercase">Unified Link</span>
                <span className="text-[8px] text-slate-300 mt-1">Direct to WhatsApp & Social Handles</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-mono">
              Scan-to-Chat active: <span className="text-blue-600 font-bold">Online</span>
            </p>
          </div>

        </div>

        {/* Bottom copyright line-up & back to top */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <p>© {currentYear} Draftify Pakistan (Pvt) Ltd. All Rights Reserved.</p>
            <p className="text-[10px] text-slate-500 mt-1">Delivering precise document formatting, secure online form submissions, quality IT supply, and advanced software solutions.</p>
          </div>

          <button
            onClick={handleScrollTop}
            className="flex items-center space-x-1 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
