"use client";

import "./global.css";
import Nav from "../components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <meta name="theme-color" content="rgb(242, 242, 242)" />
        </head>
        <body className={isLoaded ? "" : "initial-load"}>
          <Nav />
          {children}
          <Analytics />
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
