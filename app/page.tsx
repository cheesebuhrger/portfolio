"use client";

import type { NextPage } from "next";
import IndexHero3 from "@/components/IndexHero3";
import SectionLabel from "../components/ProjectSection";
import IndexCraft from "../components/IndexPlayground";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import IndexProjects from "@/components/IndexProjects";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";

const Home: NextPage = () => {
  useLenisScroll(); // Initialize smooth scrolling

  return (
    <div className="min-h-screen">
      <section className="border-t border-border-primary p-4 md:p-8 min-h-screen">
        <div className="text-11xl font-serif-italic text-center"></div>
      </section>

      <section className="border-t border-black py-4 md:py-8">
        <h2 className="text-xs font-mono uppercase px-4 md:px-8 mb-48">
          Projects
        </h2>
        <IndexProjects />
      </section>

      <section id="craft" className="relative border-t border-black p-4 md:p-8">
        <h2 className="text-xs font-mono uppercase mb-64">Playground</h2>

        <IndexCraft />
      </section>
      <footer className="p-4 pt-24 md:p-8 md:pt-48 text-xs font-mono uppercase grid grid-cols-12 gap-8 items-end">
        {/* <div className="col-span-3">
          <p>...</p>
        </div> */}

        <div className="col-start-7 col-span-3">
          <p>LinkedIn</p>
          <p>Are.na</p>
          <p>Dribbble</p>
        </div>

        <div className="col-start-10 col-span-3 text-right justify-self-end">
          <p>&copy;{new Date().getFullYear()}</p>
          <p>Made w/love by Buhr</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
