import "./global.css";
import Nav from "../components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/Footer";
import { metadata as rootMetadata, viewport as rootViewport } from "./metadata";
import InitialLoadTransition from "@/components/InitialLoadTransition";

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body>
          <InitialLoadTransition>
            <Nav />
            {children}
            <Analytics />
            <Footer />
          </InitialLoadTransition>
        </body>
      </html>
    </ViewTransitions>
  );
}
