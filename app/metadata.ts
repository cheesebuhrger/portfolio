import type { Metadata, Viewport } from "next";
import { SITE } from "@/lib/seo";

// Site-wide defaults. Pages set their own title, description, canonical and
// share image; nothing page-specific (like a canonical URL) belongs here, or
// every page would inherit it.
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    template: "Buhr | %s",
    default: SITE.title,
  },
  description: SITE.description,
  keywords: [
    "product design",
    "interaction design",
    "front-end development",
    "prototyping",
    "motion design",
    "design systems",
    "portfolio",
    SITE.name,
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.business.name,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#f2f2f2",
  width: "device-width",
  initialScale: 1,
};
