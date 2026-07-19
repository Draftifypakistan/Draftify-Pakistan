import React, { useState, useEffect } from "react";
import { Calculator, Download, CheckSquare, MessageSquare, ChevronRight, FileText, Send, HelpCircle } from "lucide-react";

export default function Estimator() {
  const [projectType, setProjectType] = useState<"docs" | "it">("docs");

  // Document Formatting States
  const [docType, setDocType] = useState<"word" | "excel" | "ppt" | "urdu" | "writing" | "online-forms" | "printing">("word");
  const [unitsCount, setUnitsCount] = useState<number>(10);
  const [docUrgency, setDocUrgency] = useState<"standard" | "urgent" | "express">("standard");

  // IT Support States
  const [itServiceType, setItServiceType] = useState<"troubleshooting" | "networking" | "peripheral" | "software" | "equipment" | "cctv">("troubleshooting");
  const [deviceCount, setDeviceCount] = useState<number>(1);
  const [supportLocation, setSupportLocation] = useState<"remote" | "onsite">("remote");

  // Output States
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [deliveryTime, setDeliveryTime] = useState<string>("24 Hours");
  const [breakdown, setBreakdown] = useState<string[]>([]);

  // Calculate whenever parameters change
  useEffect(() => {
    if (projectType === "docs") {
      let baseRate = 250; // MS Word
      let unitLabel = "Pages";
      let typeLabel = "MS Word Formatting & Design";

      if (docType === "excel") {
        baseRate = 1500;
        unitLabel = "Sheets/Tabs";
        typeLabel = "MS Excel Formula & Sheets";
      } else if (docType === "ppt") {
        baseRate = 300;
        unitLabel = "Slides";
        typeLabel = "PowerPoint Presentation Slide";
      } else if (docType === "urdu") {
        baseRate = 350;
        unitLabel = "Pages";
        typeLabel = "Urdu Unicode / InPage Typing";
      } else if (docType === "writing") {
        baseRate = 500;
        unitLabel = "Pages/Documents";
        typeLabel = "Drafting & Professional Writing";
      } else if (docType === "online-forms") {
        baseRate = 500;
        unitLabel = "Submissions";
        typeLabel = "Govt / Private Online Form Submission";
      } else if (docType === "printing") {
        baseRate = 15;
        unitLabel = "Printed Pages";
        typeLabel = "Documents Printing Service (Available Soon)";
      }

      let subtotal = unitsCount * baseRate;
      let urgencyMultiplier = 1.0;
      let urgencyLabel = "Standard Turnaround";

      if (docUrgency === "urgent") {
        urgencyMultiplier = 1.3;
        urgencyLabel = "Urgent Delivery (30% premium)";
      } else if (docUrgency === "express") {
        urgencyMultiplier = 1.6;
        urgencyLabel = "Super Express 1-Hour Hotfix (60% premium)";
      }

      const calculatedMin = Math.round(subtotal * urgencyMultiplier * 0.95);
      const calculatedMax = Math.round(subtotal * urgencyMultiplier * 1.05);

      let delivery = "24-48 Hours";
      if (docUrgency === "express") {
        delivery = "1-2 Hours Urgent";
      } else if (docUrgency === "urgent") {
        delivery = "Same Day (6-12 Hours)";
      } else if (unitsCount > 50) {
        delivery = "3-5 Days Standard";
      }

      setPriceRange({ min: calculatedMin, max: calculatedMax });
      setDeliveryTime(delivery);
      setBreakdown([
        `Service category: ${typeLabel}`,
        `Quantity configured: ${unitsCount} ${unitLabel}`,
        `SLA urgency priority: ${urgencyLabel}`,
        `Tools used: Licensed MS Office Suite, Unicode Urdu Editors, PDF compilers, Portal Gateways`,
      ]);
    } else {
      // IT Calculation
      let basePrice = 1000; // Troubleshooting
      let serviceLabel = "Computer speed-up & virus cleaning";

      if (itServiceType === "networking") {
        basePrice = 1500;
        serviceLabel = "Wi-Fi, router, and local office network config";
      } else if (itServiceType === "peripheral") {
        basePrice = 1200;
        serviceLabel = "Laser printer, scanner, & copier setup";
      } else if (itServiceType === "software") {
        basePrice = 1800;
        serviceLabel = "OS installation & full MS Office suite diagnostics";
      } else if (itServiceType === "equipment") {
        basePrice = 5000;
        serviceLabel = "IT Equipment Supply & Office Hardware Sourcing";
      } else if (itServiceType === "cctv") {
        basePrice = 2500;
        serviceLabel = "CCTV Security Camera Setup (In Collaboration with Hidden Global)";
      }

      let subtotal = basePrice * deviceCount;
      let locationLabel = "Remote screen-sharing support";
      let locationFee = 0;

      if (supportLocation === "onsite") {
        locationFee = 1000; // Flat Travel charge
        locationLabel = "On-site home/office visit";
      }

      const totalMin = Math.round((subtotal + locationFee) * 0.9);
      const totalMax = Math.round((subtotal + locationFee) * 1.1);

      let delivery = "Within 2 Hours (Remote)";
      if (supportLocation === "onsite") {
        delivery = "Within 4 Hours (Same Day Visit)";
      } else if (itServiceType === "equipment") {
        delivery = "Same Day Delivery (Hardware)";
      } else if (itServiceType === "cctv") {
        delivery = "Scheduled On-site installation (1-2 days)";
      }

      setPriceRange({ min: totalMin, max: totalMax });
      setDeliveryTime(delivery);
      setBreakdown([
        `IT task category: ${serviceLabel}`,
        `Device count/Scope: ${deviceCount} ${itServiceType === "cctv" ? (deviceCount === 1 ? "Camera/Point" : "Cameras/Points") : (deviceCount === 1 ? "Computer/Device" : "Computers/Devices")}`,
        `Support protocol: ${locationLabel}`,
        `Travel & dispatch fee: ${supportLocation === "onsite" ? "Rs. 1,000 (Included)" : "Rs. 0 (Remote)"}`,
      ]);
    }
  }, [projectType, docType, unitsCount, docUrgency, itServiceType, deviceCount, supportLocation]);

  const handleLaunchInquiry = () => {
    const detailString = projectType === "docs"
      ? `Document: ${unitsCount} units of ${docType}, urgency: ${docUrgency}. Est quote: Rs. ${priceRange.min}-Rs. ${priceRange.max}`
      : `IT Support: ${itServiceType}, Devices: ${deviceCount}, Location: ${supportLocation}. Est quote: Rs. ${priceRange.min}-Rs. ${priceRange.max}`;
    
    const message = `Hello Draftify Pakistan! I calculated an instant quote for my project: ${detailString}. I would like to get started.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923083396157?text=${encoded}`, "_blank");
  };

  return (
    <section id="estimator-section" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      
      {/* Decorative Radial glow background */}
      <div className="absolute top-[40%] right-[-15%] w-[450px] h-[450px] bg-blue-500/5 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-[20%] left-[-15%] w-[450px] h-[450px] bg-sky-500/5 blur-[130px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full animate-fade-in-up">
            Cost & SLA Estimator
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-slate-950 tracking-tight">
            Transparent Project <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">
              Pricing Calculator
            </span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Configure your technical requirements, pages count, support type, and urgency levels to receive an instant, simulated cost estimate.
          </p>

          {/* Toggle Type buttons */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 mt-6">
            <button
              onClick={() => setProjectType("docs")}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer duration-300 ${
                projectType === "docs"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Document Work & Writing
            </button>
            <button
              onClick={() => setProjectType("it")}
              className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer duration-300 ${
                projectType === "it"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/15"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              IT Support & Troubleshoot
            </button>
          </div>
        </div>

        {/* Content Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls Panel (Left side) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-md">
            
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-950">Adjust Specifications</h3>
            </div>

            {projectType === "docs" ? (
              /* Document Specifications controls */
              <div className="space-y-6">
                
                {/* Document Type select */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">Document Service Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setDocType("word")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        docType === "word"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950 scale-[1.01]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">MS Word</span>
                      <span className={`text-[10px] mt-1 ${docType === "word" ? "text-slate-800" : "text-slate-500"}`}>Formatting & styling templates</span>
                    </button>
                    
                    <button
                      onClick={() => setDocType("excel")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        docType === "excel"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950 scale-[1.01]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">MS Excel</span>
                      <span className={`text-[10px] mt-1 ${docType === "excel" ? "text-slate-800" : "text-slate-500"}`}>Sheets, formulas & dashboards</span>
                    </button>

                    <button
                      onClick={() => setDocType("ppt")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        docType === "ppt"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950 scale-[1.01]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">PowerPoint</span>
                      <span className={`text-[10px] mt-1 ${docType === "ppt" ? "text-slate-800" : "text-slate-500"}`}>Presentation slide designs</span>
                    </button>

                    <button
                      onClick={() => setDocType("urdu")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        docType === "urdu"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950 scale-[1.01]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">Urdu Typing</span>
                      <span className={`text-[10px] mt-1 ${docType === "urdu" ? "text-slate-800" : "text-slate-500"}`}>Unicode or InPage Nastaliq</span>
                    </button>

                    <button
                      onClick={() => setDocType("writing")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        docType === "writing"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950 scale-[1.01]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">Drafting/CV</span>
                      <span className={`text-[10px] mt-1 ${docType === "writing" ? "text-slate-800" : "text-slate-500"}`}>Applications, CVs & writing</span>
                    </button>

                    <button
                      onClick={() => setDocType("online-forms")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        docType === "online-forms"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950 scale-[1.01]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">Online Forms</span>
                      <span className={`text-[10px] mt-1 ${docType === "online-forms" ? "text-slate-800" : "text-slate-500"}`}>Govt/Private form submissions</span>
                    </button>

                    <button
                      onClick={() => setDocType("printing")}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        docType === "printing"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950 scale-[1.01]"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide flex items-center justify-between">
                        <span>Printing</span>
                        <span className="text-[8px] bg-blue-500/20 text-blue-700 px-1 py-0.2 rounded font-black shrink-0 animate-pulse">Soon</span>
                      </span>
                      <span className={`text-[10px] mt-1 ${docType === "printing" ? "text-slate-800" : "text-slate-500"}`}>Laser prints & door delivery</span>
                    </button>
                  </div>
                </div>

                 {/* Units/Pages slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-bold text-slate-700">
                      {docType === "excel" ? "Total Sheets / Tabs" : docType === "ppt" ? "Total Slides" : docType === "online-forms" ? "Total Form Submissions" : docType === "printing" ? "Total Printed Pages" : "Total Pages"}
                    </label>
                    <span className="text-blue-700 font-extrabold font-mono text-base bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                      {unitsCount} {docType === "excel" ? "Sheets" : docType === "ppt" ? "Slides" : docType === "online-forms" ? "Submissions" : docType === "printing" ? "Printed Pages" : "Pages"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={unitsCount}
                    onChange={(e) => setUnitsCount(Number(e.target.value))}
                    className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>1 Unit</span>
                    <span>100 Units</span>
                  </div>
                </div>

                {/* Timeline Urgency */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">Urgency Level</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setDocUrgency("standard")}
                      className={`py-3 px-4 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                        docUrgency === "standard"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      Standard (1-2 Days)
                    </button>
                    <button
                      onClick={() => setDocUrgency("urgent")}
                      className={`py-3 px-4 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                        docUrgency === "urgent"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      Urgent (Same Day +30%)
                    </button>
                    <button
                      onClick={() => setDocUrgency("express")}
                      className={`py-3 px-4 rounded-xl text-center text-xs font-bold transition-all cursor-pointer border ${
                        docUrgency === "express"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      1-Hour Express (+60%)
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              /* IT Specifications controls */
              <div className="space-y-6">
                
                {/* IT Support Service Type selection */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">Troubleshooting Task / Service</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setItServiceType("troubleshooting")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        itServiceType === "troubleshooting"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">Computer Clean-up</span>
                      <span className={`text-[11px] mt-1 ${itServiceType === "troubleshooting" ? "text-slate-800" : "text-slate-500"}`}>Virus diagnostics, cleaning, and optimization speed boost.</span>
                    </button>
                    
                    <button
                      onClick={() => setItServiceType("networking")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        itServiceType === "networking"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">Networking & Wi-Fi</span>
                      <span className={`text-[11px] mt-1 ${itServiceType === "networking" ? "text-slate-800" : "text-slate-500"}`}>Router config, local files sharing setup, signal improvement.</span>
                    </button>

                    <button
                      onClick={() => setItServiceType("peripheral")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        itServiceType === "peripheral"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">Printer & Scanner</span>
                      <span className={`text-[11px] mt-1 ${itServiceType === "peripheral" ? "text-slate-800" : "text-slate-500"}`}>Laser printer installation, network scanner integration.</span>
                    </button>

                    <button
                      onClick={() => setItServiceType("software")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        itServiceType === "software"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">OS & MS Office Setup</span>
                      <span className={`text-[11px] mt-1 ${itServiceType === "software" ? "text-slate-800" : "text-slate-500"}`}>Clean Windows setup, activation, email config.</span>
                    </button>

                    <button
                      onClick={() => setItServiceType("equipment")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        itServiceType === "equipment"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide">IT Equipment Supply</span>
                      <span className={`text-[11px] mt-1 ${itServiceType === "equipment" ? "text-slate-800" : "text-slate-500"}`}>Hardware sourcing, computer upgrades, parts provision.</span>
                    </button>

                    <button
                      onClick={() => setItServiceType("cctv")}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        itServiceType === "cctv"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide flex items-center justify-between">
                        <span>CCTV Camera Setup</span>
                        <span className="text-[8px] bg-blue-500/20 text-blue-700 px-1 py-0.2 rounded font-black shrink-0 animate-pulse">Soon</span>
                      </span>
                      <span className={`text-[11px] mt-1 ${itServiceType === "cctv" ? "text-slate-800" : "text-slate-500"}`}>NVR/DVR config, wiring layouts, live streaming setup. Hidden Global Partner.</span>
                    </button>
                  </div>
                </div>

                {/* Device Count Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="font-bold text-slate-700">
                      {itServiceType === "cctv" ? "Number of Cameras / Points" : "Number of Computers / Devices"}
                    </label>
                    <span className="text-blue-700 font-extrabold font-mono text-base bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20">
                      {deviceCount} {itServiceType === "cctv" ? (deviceCount === 1 ? "Camera" : "Cameras") : (deviceCount === 1 ? "Device" : "Devices")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    step={1}
                    value={deviceCount}
                    onChange={(e) => setDeviceCount(Number(e.target.value))}
                    className="w-full accent-blue-600 bg-slate-200 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Support Method (Remote vs On-site) */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-slate-700">Support Protocol</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSupportLocation("remote")}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        supportLocation === "remote"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide block">Remote Screen Share</span>
                      <span className="text-[10px] text-slate-500 mt-1 block">AnyDesk / TeamViewer support</span>
                    </button>
                    
                    <button
                      onClick={() => setSupportLocation("onsite")}
                      className={`p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                        supportLocation === "onsite"
                          ? "bg-blue-500/10 border-blue-500 text-slate-950"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="text-xs font-extrabold uppercase tracking-wide block">On-Site Visit</span>
                      <span className="text-[10px] text-slate-500 mt-1 block">Quetta Region On-Site</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* QA section in controls */}
            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 flex items-start space-x-3 animate-fade-in-up">
              <CheckSquare className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-slate-900">What's always included free?</h5>
                <p className="text-[11px] text-slate-600 leading-normal mt-0.5">
                  Every document formatting order includes: up to 3 revision cycles, standard template layout design, spellchecking, and a secured digital backup.
                </p>
              </div>
            </div>

          </div>

          {/* Simulated Invoice Display (Right side) */}
          <div className="lg:col-span-5 animate-float">
            <div className="relative bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-xl"></div>
              
              {/* simulated watermark */}
              <div className="absolute -bottom-10 -left-10 text-[90px] font-black text-slate-100 select-none pointer-events-none font-display">
                PKR
              </div>

              {/* Invoice Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <div>
                  <h4 className="text-base font-extrabold text-slate-950 font-display">Draftify Cost Plan</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wider font-semibold">Simulated Proposal Invoice</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] bg-blue-500/10 text-blue-700 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border border-blue-500/20">
                    Fast Setup
                  </span>
                </div>
              </div>

              {/* Range Big Display */}
              {projectType === "docs" && docType === "printing" && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center animate-pulse">
                  <p className="text-xs text-blue-800 font-bold">
                    ⚠️ Documents Printing Service is launching soon!
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Pre-book today by contacting us via WhatsApp. Standard rates shown for estimation only.
                  </p>
                </div>
              )}

              {projectType === "it" && itServiceType === "cctv" && (
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-center animate-pulse">
                  <p className="text-xs text-blue-800 font-bold">
                    ⚠️ CCTV Security & Installation is launching soon!
                  </p>
                  <p className="text-[10px] text-slate-600 mt-1">
                    Partnering with Hidden Global. Pre-book today or discuss setups via WhatsApp. Standard rates shown for estimation only.
                  </p>
                </div>
              )}

              <div className="py-8 text-center space-y-2">
                <span className="text-xs uppercase font-extrabold text-slate-500 tracking-widest block font-sans">Estimated Cost Range</span>
                <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 font-display">
                  Rs. {priceRange.min.toLocaleString()} - Rs. {priceRange.max.toLocaleString()}
                </p>
                <div className="inline-flex items-center space-x-1 text-xs text-slate-500 font-sans">
                  <span>Estimated fulfillment:</span>
                  <strong className="text-blue-700 font-bold">{deliveryTime}</strong>
                </div>
              </div>

              {/* Bill Items Breakdown */}
              <div className="space-y-3.5 pb-6 border-b border-slate-100">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-500 block mb-2 font-sans">Detailed Line-items</span>
                
                {breakdown.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-600 font-sans">
                    <ChevronRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Guarantees list */}
              <div className="py-5 space-y-2.5">
                <div className="flex items-center space-x-2 text-xs text-slate-600 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>100% Confidentiality & Data Security</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Immediate revision turnarounds</span>
                </div>
              </div>

              {/* Submission CTAs */}
              <div className="space-y-3 pt-3">
                <button
                  onClick={handleLaunchInquiry}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/15 transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>Send Estimate to WhatsApp</span>
                </button>
                <button
                  onClick={() => {
                    const elem = document.getElementById("contact-section");
                    if (elem) elem.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>Send Lead Inquiry Form</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-500 mt-4 leading-normal font-sans">
                This pricing calculation acts as a guide. Let's talk or chat on WhatsApp to finalize actual formatting specifications and start.
              </p>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
