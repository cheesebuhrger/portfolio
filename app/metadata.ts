import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    template: "Buhr | %s",
    default: "Buhr | Portfolio",
  },
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
  alternates: {
    canonical: "https://buhr.dev",
  },
  metadataBase: new URL("https://buhr.dev"),
  openGraph: {
    url: "https://buhr.dev",
    type: "website",
    title: "Buhr | Portfolio",
    description:
      "Exploring product design and front-end development. My portfolio blends systems thinking, interaction design, motion, and real code.",
    images: [
      {
        url: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1746114120/open-graph-image_fqc6wk.png?v=2",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buhr | Portfolio",
    description:
      "Exploring product design and front-end development. My portfolio blends systems thinking, interaction design, motion, and real code.",
    images: [
      "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1746114120/open-graph-image_fqc6wk.png?v=2",
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};
