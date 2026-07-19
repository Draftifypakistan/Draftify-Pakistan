/**
 * Types definition file for Draftify Pakistan
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string; // Lucide icon name
  priceEstimate: string;
}

export interface PortfolioItem {
  id: string;
  category: "drafting" | "it" | "bim";
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  metrics?: string; // e.g. "Completed in 4 days" or "Speed increased by 150%"
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "general" | "docs" | "it" | "process";
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface EstimateResult {
  basePriceMin: number;
  basePriceMax: number;
  durationWeeks: number;
  breakdown: string[];
}
