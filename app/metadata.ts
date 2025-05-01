import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "BUHR.DESIGN",
  description:
    "Exploring the overlap of product design and front-end development. Buhr Duong's portfolio blends systems thinking, motion, and real code.",
  keywords: [
    "product design",
    "interaction design",
    "front-end development",
    "prototyping",
    "motion design",
    "design systems",
    "portfolio",
    "Buhr Duong",
  ],
  authors: [{ name: "Buhr Duong" }],
  creator: "Buhr Duong",
  publisher: "Buhr Duong",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "BUHR.DESIGN",
    description:
      "Exploring the overlap of product design and front-end development. Buhr Duong's portfolio blends systems thinking, motion, and real code.",
    url: "https://buhr.design",
    siteName: "BUHR.DESIGN",
    images: [
      {
        url: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1746114120/open-graph-image_fqc6wk.png?v=2",
        width: 1200,
        height: 630,
        alt: "BUHR.DESIGN Portfolio Preview",
      },
    ],
    locale: "en_US",
  },
  alternates: {
    canonical: "https://buhr.design",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};
