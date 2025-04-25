"use client";

import type { NextPage } from "next";

import IndexProjects from "@/components/IndexProjects";
import IndexCodeProjects from "@/components/IndexCodeProjects";
import IndexPlayground from "../components/IndexPlayground";

import CursorDot from "@/components/CursorDot";

import { ReactLenis } from "@studio-freight/react-lenis";

import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";

const Home: NextPage = () => {
  useSplitTypeAnimation();
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-surface-background">
        <CursorDot />
        <IndexProjects />

        <IndexCodeProjects />

        <section
          id="playground"
          className="relative border-t border-border-primary p-4 md:p-6 lg:p-8"
        >
          <h2 className="text-xs font-mono uppercase mb-64">Playground</h2>

          <IndexPlayground />
        </section>
      </div>
    </ReactLenis>
  );
};

export default Home;
