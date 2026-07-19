import React, { useState } from "react";
import { FileText, FileSpreadsheet, Presentation, Type, Laptop, Clock, Check, Cpu, Globe, Video, Network, Printer } from "lucide-react";

export default function Services() {
  const [activeTab, setActiveTab] = useState<"all" | "docs" | "it">("all");

  const services = [
    {
      id: "word-formatting",
      category: "docs",
      title: "MS Word Formatting & Design",
      description: "Transforming unstructured raw text into beautifully styled, formatted Word documents ready for professional print, academic submittal, or official government use.",
      icon: FileText,
      features: [
        "Thesis & dissertation formatting",
        "Dynamic Table of Contents & indices",
        "Custom margins, headers, and footers",
        "APA, Harvard, & IEEE citation styling",
      ],
      price: "From Rs. 250 / page"
    },
    {
      id: "excel-formulas",
      category: "docs",
      title: "MS Excel Sheets, Formulas & Reports",
      description: "Custom spreadsheets, automated formulas, data entry, interactive pivot tables, and comprehensive monthly or weekly financial performance reports.",
      icon: FileSpreadsheet,
      features: [
        "Advanced VLOOKUP, INDEX-MATCH & IFS",
        "Interactive Pivot Tables & custom charts",
        "Auto-calculating billing & invoices",
        "Bulk data entry and sheet cleanups",
      ],
      price: "From Rs. 1,500 / sheet"
    },
    {
      id: "drafting-docs",
      category: "docs",
      title: "Drafting & Document Writing",
      description: "Expert writing, polishing, and proofreading of official letters, government petitions, applications, essays, CVs, and professional summaries.",
      icon: FileText,
      features: [
        "Professional CV & cover letter designs",
        "Official business letters & applications",
        "Academic essay & report writing help",
        "Bilingual legal affidavit drafting",
      ],
      price: "From Rs. 500 / page"
    },
    {
      id: "urdu-typing",
      category: "docs",
      title: "Urdu Unicode & InPage Typing",
      description: "Fast Urdu keyboard typing, beautiful Noori Nastaliq formatting, Urdu poetry layout, bimonthly newsletters, and English-Urdu translation support.",
      icon: Type,
      features: [
        "Fast Unicode & InPage Urdu typing",
        "Urdu official applications & legal drafts",
        "Bilingual side-by-side formatting",
        "Urdu novels, poetry, and book layout",
      ],
      price: "From Rs. 350 / page"
    },
    {
      id: "ppt-design",
      category: "docs",
      title: "PowerPoint Presentation Design",
      description: "Eye-catching, highly communicative slides tailored for university students, school teachers, business pitch decks, and freelancer client portfolios.",
      icon: Presentation,
      features: [
        "Custom high-contrast typography",
        "Academic thesis slides & pitch decks",
        "Clean slide transition coordination",
        "Visual charts, tables, & infographics",
      ],
      price: "From Rs. 300 / slide"
    },
    {
      id: "doc-printing",
      category: "docs",
      title: "Documents Printing Services",
      description: "High-quality black & white and colored laser printing, document binding, and delivery to your home or office. Launching very soon!",
      icon: Printer,
      features: [
        "A4 & Legal paper options",
        "Spiral & comb binding options",
        "Clear high-contrast laser prints",
        "Doorstep courier delivery",
      ],
      price: "Available Soon",
      isAvailableSoon: true
    },
    {
      id: "it-troubleshooting",
      category: "it",
      title: "IT Support & Desktop Troubleshooting",
      description: "Local computer support, laser printer setups, scanner adjustments, wireless internet debugging, and basic office automation consulting.",
      icon: Laptop,
      features: [
        "PC/Laptop diagnostics & virus cleanups",
        "Wi-Fi router & office network config",
        "Printer, scanner, & copier driver setups",
        "MS Office & operating system assistance",
      ],
      price: "From Rs. 1,000 / setup"
    },
    {
      id: "cctv-services",
      category: "it",
      title: "CCTV Installation & System Provisioning",
      description: "Comprehensive security camera supply, professional installation, network configuration, mobile app integration, and hardware provision. Deployed in collaboration with Hidden Global. Launching very soon!",
      icon: Video,
      features: [
        "Hidden Global CCTV Collaboration",
        "IP & analog camera wiring layouts",
        "NVR/DVR system configuration",
        "Mobile live-view & cloud recording setups",
      ],
      price: "Available Soon",
      isAvailableSoon: true
    },
    {
      id: "network-config",
      category: "it",
      title: "Network Configuration & Maintenance",
      description: "Professional residential and enterprise networking. Custom setups for high-speed Wi-Fi routers, local switches, load balancers, firewalls, and clean CAT6 terminations.",
      icon: Network,
      features: [
        "Router, switch & AP configuration",
        "Bandwidth optimization & QoS setups",
        "Secure guest Wi-Fi & VLAN routing",
        "CAT6/CAT7 structured data cabling",
      ],
      price: "From Rs. 1,500 / setup"
    },
    {
      id: "it-equipment",
      category: "it",
      title: "IT Equipment Supply & Provisioning",
      description: "Sourcing and supplying reliable computer hardware, laser printers, networking routers, SSD storage upgrades, and customized work rigs for offices and homes.",
      icon: Cpu,
      features: [
        "Printers, scanners & office copiers",
        "High-speed SSDs & RAM upgrades",
        "Wireless Wi-Fi routers & LAN hardware",
        "Custom desktop PCs for office work",
      ],
      price: "Market Rates (Custom Quote)"
    },
    {
      id: "online-forms",
      category: "docs",
      title: "Govt & Private Online Form Submission",
      description: "Accurate, prompt, and secure entry and online submission of university applications, job applications, government portals (FBR, SECP, Passport, etc.), and immigration registration forms.",
      icon: Globe,
      features: [
        "University admission portal entry",
        "Government online application forms",
        "Corporate registration & SECP uploads",
        "Visa / Passport online form fill-ups",
      ],
      price: "From Rs. 500 / submission"
    },
    {
      id: "urgent-docs",
      category: "docs",
      title: "Urgent Online Document Edits",
      description: "Emergency document adjustments, rapid PDF conversions, scan cleans, and urgent file formatting completed online in under 1 hour.",
      icon: Clock,
      features: [
        "High-fidelity PDF to MS Word extraction",
        "Urgent same-day document hotfixes",
        "Scanned image text cleanups",
        "Online cloud file setup (Google Drive)",
      ],
      price: "From Rs. 800 / task"
    },
  ];

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(s => s.category === activeTab);

  return (
    <section id="services-section" className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative Blur elements */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse duration-[8000ms]"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] bg-sky-500/5 blur-[120px] rounded-full animate-pulse duration-[10000ms]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full animate-fade-in-up">
            Our Expertise & Services
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-950 tracking-tight">
            Professional Document Design <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
              & Local IT Support
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Fast, accurate, and completely confidential document typing, design, and computer assistance. Order online or request local on-site IT support.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 mt-6 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer duration-300 ${
                activeTab === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-102"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer duration-300 ${
                activeTab === "docs"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-102"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Documents & Typing
            </button>
            <button
              onClick={() => setActiveTab("it")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer duration-300 ${
                activeTab === "it"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20 scale-102"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              IT & Desktop Support
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const IconComponent = service.icon;
            const isSoon = 'isAvailableSoon' in service && service.isAvailableSoon;
            return (
              <div
                key={service.id}
                className="group relative bg-white border border-slate-200 hover:border-blue-500/40 rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-md hover:shadow-2xl hover:shadow-blue-500/5 animate-fade-in-up"
              >
                {/* Glowing light effect inside card */}
                <div className="absolute -top-10 -left-10 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                
                <div className="space-y-5">
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Title and Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-950 group-hover:text-blue-700 transition-colors flex items-center justify-between gap-2">
                      <span>{service.title}</span>
                      {isSoon && (
                        <span className="text-[9px] uppercase font-extrabold tracking-widest text-indigo-700 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded shrink-0">
                          Soon
                        </span>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Features Bullet List */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing Tag footer */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Estimated Cost</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-lg border ${
                    isSoon
                      ? "text-indigo-700 bg-indigo-500/10 border-indigo-500/20"
                      : "text-blue-700 bg-blue-500/10 border-blue-500/20"
                  }`}>
                    {service.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Bottom Conversion Banner */}
        <div className="mt-16 bg-slate-100 border border-slate-200 rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-slate-950">Need an urgent project done today?</h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              We specialize in fast turnaround document formatting and emergency Excel/Urdu typing starting from just <strong className="text-blue-700">Rs. 300 / page</strong> for fast delivery.
            </p>
          </div>
          <a
            href="#contact-section"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all hover:scale-102 shrink-0 cursor-pointer shadow-lg shadow-blue-500/20"
          >
            Contact Live Support
          </a>
        </div>

      </div>
    </section>
  );
}
