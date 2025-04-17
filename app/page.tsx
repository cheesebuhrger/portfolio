"use client";

import type { NextPage } from "next";
import IndexHero3 from "@/components/IndexHero3";
import SectionLabel from "../components/ProjectSection";
import IndexCraft from "../components/IndexPlayground";
import IndexProjects from "@/components/IndexProjects";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { ReactLenis } from "@studio-freight/react-lenis";
import Button from "@/components/Button";
const Home: NextPage = () => {
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-surface-background">
        <section className="border-t border-border-primary p-4 md:p-8 min-h-screen flex justify-center items-center">
          <Button href="/projects/playground" label="Playground" />
        </section>

        <section id="projects" className="border-t border-black py-4 md:py-8">
          <h2 className="text-xs font-mono uppercase px-4 md:px-8 mb-48">
            Projects
          </h2>
          <IndexProjects />
        </section>

        <section
          id="craft"
          className="relative border-t border-black p-4 md:p-8"
        >
          <h2 className="text-xs font-mono uppercase mb-64">Playground</h2>

          <IndexCraft />
        </section>
      </div>
    </ReactLenis>
  );
};

export default Home;
