import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Digital Asset Links for Trusted Web Activities (TWA) - Crucial for Play Protect compliance and native experience
app.get("/.well-known/assetlinks.json", (req, res) => {
  const packageId = process.env.ANDROID_PACKAGE_NAME || "com.draftifypakistan.app";
  // Fallback to developer placeholder or production fingerprint
  const sha256Fingerprint = process.env.ANDROID_SHA256_FINGERPRINT || "00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00";
  
  res.setHeader("Content-Type", "application/json");
  res.json([
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: packageId,
        sha256_cert_fingerprints: [sha256Fingerprint]
      }
    }
  ]);
});

// 2. High-converting AI Consultant Partner endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array provided" });
    }

    const ai = getAiClient();

    // Map message history into contents for Gemini
    const contents = messages.map((m: { role: string; content: string }) => {
      return {
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      };
    });

    const systemInstruction = `You are 'Draftify AI Specialist', an elite customer support expert and project consultant for Draftify Pakistan.
Draftify Pakistan is a premier document, IT support, and technology outsourcing agency based in Pakistan (serving clients locally and globally).

Our main service lines are:
1. Professional Document & Typing Services:
   - Formatting and document design in MS Word & PDF templates.
   - Excel office sheets, custom formulas, analytical dashboards, and structured data entry.
   - PowerPoint corporate presentation slide design.
   - Urgent Urdu typing and Urdu document formatting (Unicode and InPage Nastaliq).
   - Drafting formal business letters, official applications, professional CVs, and official reports.
   - Online file editing, proofreading, and urgent document editing.
2. IT Support, CCTV & Network Services:
   - CCTV Installation, Configuration, Provision & Services (offered in premier collaboration with Hidden Global).
   - IT Equipment Supply & Provisioning (sourcing computers, RAM upgrades, parts, printers).
   - Govt & Private Online Form Data Submission (college admissions, job applications, portal registries).
   - On-site and remote IT troubleshooting (computer setup, software installation, printer/wifi configuration, malware cleanup, and structured network configuration).
3. Modern Web & Software Solutions:
   - Custom web applications using React, Node.js, and TypeScript.
   - High-converting landing pages, e-commerce stores, and custom business portals.

Your role is to act as a supportive, highly knowledgeable customer advisor:
- Answer client queries regarding document layouts, IT troubleshooting protocols, equipment provision, CCTV & network setup configuration, and execution timelines.
- Guide potential clients on how standard workflows run (e.g., file formatting turnaround, online application safety, hardware delivery, or custom web portals).
- Highlight Draftify Pakistan's key value propositions: up to 60% cost savings, 24/7 support, expert local professionals, and ultra-fast turnarounds (including 1-hour express).
- Be extremely professional, concise, encouraging, and consultative. Use clean Markdown bullet points.
- ALWAYS try to naturally guide the client to fill out the Project Estimator, book a consultation call via the form, or launch direct WhatsApp discussion.
- If they ask about cost, explain that we offer highly competitive pricing, with express options, and invite them to use the interactive Quote Estimator tool right above!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text || "I am here to help you design and build your next physical or digital project." });
  } catch (error: any) {
    console.error("Gemini API error in /api/chat:", error);
    // Graceful error response so the frontend doesn't crash
    res.status(500).json({
      error: error.message || "Failed to communicate with AI model",
      fallback: "Our AI Consultant is temporarily setting up blueprints. Please reach out via our contact form or WhatsApp direct link above!"
    });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static assets...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Draftify Pakistan server running on http://localhost:${PORT}`);
  });
}

startServer();
