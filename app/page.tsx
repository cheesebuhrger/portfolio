"use client";

import type { NextPage } from "next";
import IndexHero3 from "@/components/IndexHero3";
import SectionLabel from "../components/ProjectSection";
import IndexPlayground from "../components/IndexPlayground";
import IndexProjects from "@/components/IndexProjects";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { ReactLenis } from "@studio-freight/react-lenis";
import Button from "@/components/Button";
import MediaImage from "@/components/MediaImage";
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";
import TransitionLink from "@/components/TransitionLink";
import CursorDot from "@/components/CursorDot";
import IndexHero4 from "@/components/IndexHero4";

const Home: NextPage = () => {
  useSplitTypeAnimation();
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-surface-background">
        <CursorDot />
        {/* <IndexHero4 /> */}
        <section className="w-screen h-screen">
          <div className="w-full h-full grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 pt-16 md:pt-20 lg:pt-24 items-end">
            <h1 className="col-span-6 col-start-7 text-4xl split-type-animation-hero">
              Through a decade of designing, I&rsquo;ve honed skills in
              interaction design, motion, design systems, & prototyping.
              I&rsquo;m a builder at heart and I&rsquo;m always finding new ways
              to bring ideas to life. Now I&rsquo;m blending my design skills
              with code.
            </h1>
          </div>
        </section>

        <section id="projects" className="border-t border-black py-4 md:py-8">
          <h2 className="text-xs font-mono uppercase px-4 md:px-8 mb-48">
            Projects
          </h2>
          <IndexProjects />
        </section>

        <section className="p-4 md:p-8 flex justify-center items-center">
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
