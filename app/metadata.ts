import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Buhr Duong: [Portfolio]",
  description:
    "Exploring product design and front-end development. My portfolio blends systems thinking, interaction design, motion, and real code.",
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
    title: "Buhr Duong: [Portfolio]",
    description:
      "Exploring product design and front-end development. My portfolio blends systems thinking, interaction design, motion, and real code.",
    url: "https://buhr.design",
    siteName: "Buhr Duong: [Portfolio]",
    images: [
      {
        url: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1746114120/open-graph-image_fqc6wk.png?v=2",
        width: 1200,
        height: 630,
        alt: "Buhr Duong Portfolio Showcase",
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
