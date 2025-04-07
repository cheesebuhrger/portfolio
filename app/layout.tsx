import type { Metadata, Viewport } from "next";
import "./global.css";
import Nav from "../components/Nav"; // Adjust the path as necessary
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import Head from "next/head";

export const metadata: Metadata = {
  title: "BUHR.DESIGN",
  description:
    "Product designer obsessed with motion design, hands-on crafting, and bringing ideas to life with code-driven prototypes.",
  openGraph: {
    type: "website",
    title: "BUHR.DESIGN",
    description:
      "Product designer obsessed with motion design, hands-on crafting, and bringing ideas to life with code-driven prototypes.",
    url: "https://buhr.design",
    siteName: "BUHR.DESIGN",
    // images: [
    //   {
    //     url: "/images/og-image.jpg", // You'll need to add this image
    //     width: 1200,
    //     height: 630,
    //     alt: "BUHR.DESIGN",
    //   },
    // ],
  },
  // icons: {
  //   icon: "/favicon.ico",
  // },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <meta name="theme-color" content="rgb(242, 242, 242)" />
        </head>
        <body>
          <Nav />
          {children}
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  );
}
