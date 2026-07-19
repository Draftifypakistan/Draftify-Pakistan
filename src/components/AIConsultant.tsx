import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw, AlertCircle, Bot } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIConsultant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Assalam-o-Alaikum! I am your Draftify Pakistan technical assistant. Ask me anything about our professional document writing, MS Word formatting, custom Excel formula sheets, Urdu typing, or computer and network troubleshooting. How can I assist you with your document or IT needs today?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "How much do you charge for Word document formatting?",
    "Can you design a customized professional CV/Resume?",
    "Do you offer urgent same-day Urdu typing work?",
    "Can you configure a remote office network or fix a virus?"
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg: ChatMessage = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setErrorText("");

    try {
      // Map history to server schema
      const historyToSend = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: historyToSend }),
      });

      if (!res.ok) {
        throw new Error("API call returned an error response");
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || data.fallback || "I'm processing your technical request. Please reach out to our team directly or fill out the Consultation form above!",
          timestamp: new Date(),
        }
      ]);
    } catch (err: any) {
      console.error("AI chat assistant error:", err);
      setErrorText("Our AI Specialist is compiling your request. Click below to retry or connect on WhatsApp directly.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize for the signal interruption. Our systems are preparing fresh templates. You can text us directly at draftifypakistan@gmail.com, or try submitting your message again!",
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPromptClick = (prompt: string) => {
    if (isLoading) return;
    handleSendMessage(prompt);
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat history refreshed! I am ready for your document design, professional formatting, and IT support questions. How can we optimize your workflow today?",
        timestamp: new Date(),
      }
    ]);
    setErrorText("");
  };

  return (
    <section id="ai-chat-section" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      
      {/* Decorative Glow Blobs */}
      <div className="absolute top-[30%] left-[-15%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[20%] right-[-15%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-800 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>24/7 AI Sales Advisor</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight">
            Consult our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 font-display">Technical AI Expert</span>
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Have questions about document design layouts, MS Word templates, custom Excel formulations, Urdu typing, or computer virus cleanups? Discuss your parameters with our real-time smart advisor.
          </p>
        </div>

        {/* Chat Window Frame */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[550px]">
          
          {/* Chat Window Header */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white">
                  <Bot className="w-5.5 h-5.5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-blue-400 ring-2 ring-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                  <span>Draftify AI Specialist</span>
                  <span className="text-[9px] bg-blue-500/10 text-blue-800 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase tracking-wide">Live</span>
                </h4>
                <p className="text-[10px] text-slate-500">Consulting from Quetta HQ • 24/7 Response</p>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              title="Reset Chat History"
              className="p-2 rounded-lg text-slate-500 hover:text-slate-950 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Bubbles Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === "assistant";
              return (
                <div
                  key={index}
                  className={`flex items-start gap-3.5 ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  {isAssistant && (
                    <div className="w-8.5 h-8.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? "bg-slate-100 border border-slate-200/50 text-slate-800"
                        : "bg-blue-600 text-white font-medium"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span
                      className={`text-[9px] block mt-1.5 text-right ${
                        isAssistant ? "text-slate-400" : "text-blue-100"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {!isAssistant && (
                    <div className="w-8.5 h-8.5 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User className="w-4.5 h-4.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator bubble */}
            {isLoading && (
              <div className="flex items-start gap-3.5 justify-start">
                <div className="w-8.5 h-8.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shrink-0">
                  <Bot className="w-4.5 h-4.5" />
                </div>
                <div className="bg-slate-100 border border-slate-200/50 rounded-2xl px-4.5 py-3.5 text-slate-500 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-200" />
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}

            {/* Error notice */}
            {errorText && (
              <div className="p-3.5 bg-red-500/10 border border-red-200 rounded-xl flex items-center space-x-2 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggetions Area */}
          <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-200 overflow-x-auto whitespace-nowrap flex items-center gap-2 scrollbar-none">
            <span className="text-[10px] text-slate-500 uppercase font-bold shrink-0">Suggested:</span>
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                disabled={isLoading}
                onClick={() => handleQuickPromptClick(prompt)}
                className="inline-block px-3 py-1 bg-white hover:bg-blue-500/10 hover:text-blue-800 border border-slate-200 hover:border-blue-400 rounded-lg text-[11px] text-slate-600 transition-all cursor-pointer whitespace-nowrap"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Form Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about document formatting, pricing, or IT support setup..."
              className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3.5 text-xs sm:text-sm focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 text-slate-900 placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:bg-slate-100 text-white disabled:text-slate-400 transition-all duration-200 flex items-center justify-center shrink-0 cursor-pointer animate-float"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>

        </div>

        {/* Section Conversion footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 flex items-center justify-center gap-1">
            <span>Prefer immediate person-to-person document or IT consultation?</span>
            <a href="#contact-section" className="text-blue-700 hover:text-blue-800 hover:underline font-semibold cursor-pointer">
              View Office details below
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
