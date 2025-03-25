import type { Metadata } from "next";
import "./global.css";
import NavBar from "../components/NavBar"; // Adjust the path as necessary
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "BUHR.DESIGN",
  description:
    "Product designer obsessed with motion design, hands-on crafting, and bringing ideas to life with code-driven prototypes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
