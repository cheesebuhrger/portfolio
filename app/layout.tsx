import "./global.css";
import { Analytics } from "@vercel/analytics/react";
import { ViewTransitions } from "next-view-transitions";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { metadata as rootMetadata, viewport as rootViewport } from "./metadata";

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
          <SmoothScroll>
            {/* Fades in once on first load; the layout persists across navigations. */}
            <div className="initial-load">
              <Nav />
              <Cursor />
              {children}
              <Analytics />
              <Footer />
            </div>
          </SmoothScroll>
        </body>
      </html>
    </ViewTransitions>
  );
}
