import "./global.css";
import Nav from "../components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import Footer from "@/components/Footer";
import { metadata as rootMetadata } from "./metadata";
import InitialLoadTransition from "@/components/InitialLoadTransition";

export const metadata = rootMetadata;

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
