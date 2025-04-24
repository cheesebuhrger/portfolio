"use client";

import type { NextPage } from "next";
import IndexHero3 from "@/components/IndexHero3";
import SectionLabel from "../components/ProjectSection";
import IndexPlayground from "../components/IndexPlayground";
import IndexProjects2 from "@/components/IndexProjects2";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { ReactLenis } from "@studio-freight/react-lenis";
import Button from "@/components/Button";
import MediaImage from "@/components/MediaImage";
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";
import TransitionLink from "@/components/TransitionLink";
import CursorDot from "@/components/CursorDot";
import IndexProjects from "@/components/IndexProjects";

const Home: NextPage = () => {
  useSplitTypeAnimation();
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-surface-background">
        <CursorDot />
        <IndexProjects />

        <section id="prototypes" className="border-t border-black py-4 md:py-8">
          <h2 className="text-xs font-mono uppercase px-4 md:px-8 mb-48">
            Prototypes
          </h2>
          {/* <IndexProjects2 /> */}
          <Button href="/projects/playground" label="Playground" />
        </section>

        <section
          id="playground"
          className="relative border-t border-black p-4 md:p-8"
        >
          <h2 className="text-xs font-mono uppercase mb-64">Playground</h2>

          <IndexPlayground />
        </section>
      </div>
    </ReactLenis>
  );
};

export default Home;
