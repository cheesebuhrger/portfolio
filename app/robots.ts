import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * AI *training* crawlers are blocked; everything else — search engines, AI
 * search (OAI-SearchBot, Claude-SearchBot, PerplexityBot), user-triggered
 * fetchers (ChatGPT-User, Claude-User) and link-preview bots — is allowed,
 * so blocking training doesn't affect search or AI-search visibility.
 */
const AI_TRAINING_CRAWLERS = [
  "GPTBot", // OpenAI
  "ClaudeBot", // Anthropic
  "Google-Extended", // Google (Gemini training; not used by Search)
  "Applebot-Extended", // Apple
  "CCBot", // Common Crawl (dataset used by many model trainers)
  "meta-externalagent", // Meta
  "Bytespider", // ByteDance
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_TRAINING_CRAWLERS, disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
