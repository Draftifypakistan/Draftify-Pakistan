import React, { useState } from "react";
import { ArrowRight, CheckCircle2, MessageSquareCode, ShieldCheck, Zap, Award, Check } from "lucide-react";

interface HeroProps {
  onEstimateClick: () => void;
  onChatClick: () => void;
}

export default function Hero({ onEstimateClick, onChatClick }: HeroProps) {
  const [formData, setFormData] = useState({
    name: "",
    serviceType: "MS Word Formatting",
    phone: "",
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 900);
  };

  const handleWhatsAppRedirect = () => {
    const message = `Hello Draftify Pakistan! I would like to consult regarding a ${formData.serviceType} project. My name is ${formData.name}.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923083396157?text=${encoded}`, "_blank");
  };

  const handleDirectWhatsApp = () => {
    const message = `Hello Draftify Pakistan! I would like to discuss a project with you directly.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923083396157?text=${encoded}`, "_blank");
  };

  return (
    <section className="relative min-h-screen pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex items-center bg-slate-50 animate-fade-in-up">
      
      {/* Background Mesh Gradient Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[130px] rounded-full animate-pulse duration-[8000ms]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[130px] rounded-full animate-pulse duration-[10000ms]"></div>
        <div className="absolute top-[40%] left-[30%] w-[350px] h-[350px] bg-sky-500/5 blur-[110px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Text & Key Value Propositions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-800 text-xs font-bold uppercase tracking-wider animate-float">
              <Award className="w-4.5 h-4.5 text-blue-600" />
              <span>Draftify Pakistan — Precision Document Formatting & Corporate IT Solutions</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6.5xl font-extrabold leading-[1.1] tracking-tight font-display text-slate-950">
              Precision Document <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500">Formatting & Corporate</span> IT Solutions.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-sans">
              We provide fast, accurate, and professional 
              <strong> MS Word formatting, Excel sheets, Urdu typing, PowerPoint slides, custom reports,</strong> and reliable <strong>IT troubleshooting</strong> for computers, printers, and software. 
              Get your documents designed and software fixed with absolute precision.
            </p>

            {/* Key stats and features */}
            <div className="grid grid-cols-2 gap-4 pt-4 max-w-lg">
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <CheckCircle2 className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold">Professional Urdu & English</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <ShieldCheck className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold">100% Confidential Data</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <Zap className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold">Urgent 1-Hour Turnarounds</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-700">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <MessageSquareCode className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <span className="text-sm font-semibold">Online & Local Assistance</span>
              </div>
            </div>

            {/* Core Action triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={onEstimateClick}
                className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider hover:scale-[1.02] shadow-lg shadow-blue-500/15 transition-all cursor-pointer flex items-center space-x-2"
              >
                <span>Launch Cost Estimator</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={handleDirectWhatsApp}
                className="px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider hover:scale-[1.02] shadow-lg shadow-indigo-500/15 transition-all cursor-pointer flex items-center space-x-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.11-2.861-6.961C16.628 1.976 14.155.961 11.53.96c-5.437 0-9.862 4.422-9.866 9.86-.001 1.765.485 3.489 1.408 5.014l-.995 3.633 3.725-.976zm13.136-7.37c-.3-.15-1.772-.875-2.046-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-1.21-1.08-1.55-1.51-1.73-1.83-.175-.3-.02-.462.13-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.589-.48-.508-.66-.517-.17-.008-.365-.01-.56-.01-.195 0-.51.073-.778.36-.268.288-1.025 1.001-1.025 2.441 0 1.439 1.047 2.829 1.192 3.03.145.2 2.062 3.149 4.995 4.417.698.301 1.242.482 1.668.617.701.223 1.34.191 1.845.115.561-.085 1.77-.724 2.02-1.417.25-.693.25-1.289.175-1.417-.075-.125-.275-.2-.575-.35z"/>
                </svg>
                <span>Direct WhatsApp</span>
              </button>
              <button
                onClick={onChatClick}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/60 text-xs font-bold transition-all cursor-pointer flex items-center space-x-2 shadow-xs"
              >
                <span>Consult Live AI Specialist</span>
              </button>
            </div>


          </div>

          {/* Hero Right: High Converting Frosted Glass Lead capture Form */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-blue-700 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                      Free Evaluation
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold mt-2 text-slate-950">Start Your Project</h3>
                    <p className="text-xs text-slate-600 mt-1">Get custom quotes and turnarounds in under 1 hour.</p>
                  </div>

                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 ml-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hammad Chaudhry"
                        className="w-full glass-input rounded-xl px-4 py-3 text-sm focus:outline-none placeholder:text-slate-400 text-slate-950"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 ml-1">Inquiry Category</label>
                      <select
                        value={formData.serviceType}
                        onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 text-slate-800"
                      >
                        <option value="Drafting & Document Writing">Drafting & Professional Writing</option>
                        <option value="MS Word Formatting">MS Word Formatting & Design</option>
                        <option value="MS Excel Sheets & Reports">MS Excel Sheets & Formulas</option>
                        <option value="PowerPoint Presentation Design">PowerPoint Slide Design</option>
                        <option value="Urdu Typing & Formatting">Urdu Typing & Formatting</option>
                        <option value="IT Support & Troubleshooting">IT Support & Troubleshooting</option>
                        <option value="IT Equipment Supply & Provision">IT Equipment Supply & Provision</option>
                        <option value="Online Form Data Submission">Govt / Private Online Form Submission</option>
                        <option value="Urgent Document Work">Urgent File & Document Edits</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 ml-1">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +92 300 1234567"
                        className="w-full glass-input rounded-xl px-4 py-3 text-sm focus:outline-none placeholder:text-slate-400 text-slate-950"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1 ml-1">Project details (Optional)</label>
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="e.g. 50-page thesis formatting, or custom billing system sheet..."
                        className="w-full glass-input rounded-xl px-4 py-2.5 text-sm focus:outline-none placeholder:text-slate-400 text-slate-950 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/15 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Registering Inquiry..." : "Submit Inquiry"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/30 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-950">Inquiry Received!</h3>
                    <p className="text-xs text-slate-600 mt-2">
                      Thank you, <span className="text-blue-600 font-bold">{formData.name}</span>. One of our support specialists will contact you shortly.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs text-slate-600 space-y-1">
                    <p><strong className="text-slate-900">Selected Service:</strong> {formData.serviceType}</p>
                    <p><strong className="text-slate-900">Phone:</strong> {formData.phone}</p>
                  </div>
                  <div className="space-y-3 pt-2">
                    <button
                      onClick={handleWhatsAppRedirect}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md shadow-blue-600/10"
                    >
                      <span>Launch WhatsApp Chat</span>
                    </button>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-slate-500 hover:text-slate-900 underline transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
