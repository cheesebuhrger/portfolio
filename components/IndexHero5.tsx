"use client";

import React, { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";
import MediaImage from "./MediaImage";
import { projects, romanNumerals } from "@/data/indexProjectCovers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

const IndexHero5 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Split type animation setup
    const projectContent = document.querySelectorAll<HTMLElement>(
      ".index-project-title"
    );
    projectContent.forEach((item) => {
      const text = new SplitType(item, {
        types: "lines",
        tagName: "div",
        lineClass: "line",
      });

      // Wrap each line's content in a span
      text.lines?.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      // Get all spans within the lines
      const spans = item.querySelectorAll<HTMLElement>(":scope > .line > span");

      // Initial state for spans
      gsap.set(spans, {
        y: "100%",
        display: "block",
      });
    });

    const tl = gsap
      .timeline
      //   {
      //   scrollTrigger: {
      //     trigger: "",
      //     start: "top 90%",
      //     // markers: true,
      //     toggleActions: "play none none reverse",
      //   },
      // }
      ();
    gsap.set(".project-image-left", {
      transformOrigin: "bottom right",
    });
    gsap.set(".project-image-right", {
      transformOrigin: "bottom left",
    });

    tl.fromTo(
      ".project-container",
      {
        yPercent: -100,
      },
      {
        yPercent: 0,
        duration: 1,
        stagger: 2,
      }
    )
      .fromTo(
        ".project-image-left",
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 1,
          stagger: 2,
        },
        "<+1"
      )
      .fromTo(
        ".project-image-right",
        {
          scale: 0,
        },
        {
          scale: 1,
          duration: 1,
          stagger: 2,
        },
        "<"
      )
      .fromTo(
        ".index-project-title .line > span",
        {
          y: "100%",
          x: 75,
          skewX: 30,
        },
        {
          y: 0,
          x: 0,
          skewX: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.inOut",
          stagger: 0.15,
        },
        "<"
      )
      .fromTo(
        ".index-project-title .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  return (
    <section className="relative">
      <div className="relative opacity-10 z-[5] w-screen h-screen grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 pt-16 md:pt-20 lg:pt-24 items-end bg-[yellow]">
        <div className="col-span-1 lg:col-span-6 lg:col-start-7 text-5xl relative">
          <h1 className="relative split-type-animation-hero">
            Through a decade of designing products, I&rsquo;ve honed skills in
            interaction design, motion, design systems, & prototyping. I&rsquo;m
            a builder at heart and I&rsquo;m always finding new ways to bring
            ideas to life. Now I&rsquo;m focusing on blending my design skills
            with code.
          </h1>
        </div>

        <div className="col-span-1 lg:col-start-5 lg:col-span-4 flex flex-row gap-2 items-end">
          <div className="relative w-full h-fit flex flex-col gap-2">
            <p className="text-xs font-mono uppercase">Featured Project</p>
            <TransitionLink href="/projects/buildforce">
              <div className="relative w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744093117/buildforce-cover-01_1_jzzqeo.webp"
                  alt="Buildforce Time Tracking App"
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>

          <div className="relative w-full h-fit flex flex-col gap-2">
            <p className="text-xs font-mono uppercase">Featured Prototype</p>
            <TransitionLink href="/projects/strava-growth">
              <div className="relative w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-1_dwsdpv.webp"
                  alt="Buildforce Time Tracking App"
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>
        </div>
      </div>

      <div className="projects relative">
        <div className="project-container z-[4] relative w-screen h-screen bg-[red] flex items-end justify-center">
          <div className="group w-full relative">
            <div className="project-content-container px-4 md:px-8 mb-8 grid grid-cols-12 gap-8">
              <TransitionLink
                href={projects[0].url}
                className="text-sm col-span-1 font-serif pt-2 uppercase group-hover:text-text-action transition-all duration-300"
              >
                {romanNumerals[0]}
              </TransitionLink>
              <TransitionLink
                href={projects[0].url}
                className="index-project-title cursor-animation ~text-2xl/6xl font-serif col-span-6 group-hover:text-text-action group-hover:underline transition-all duration-300"
                data-cursor-text="VIEW PROJECT"
              >
                {projects[0].title}
              </TransitionLink>
              <TransitionLink
                href={projects[0].url}
                className="text-lg col-start-10 col-span-3 pt-1 font-serif group-hover:text-text-action transition-all duration-300"
              >
                <p>{projects[0].company}</p>
                <p>{projects[0].year}</p>
              </TransitionLink>
            </div>

            <TransitionLink
              href={projects[0].url}
              className="cursor-animation relative flex bg-[pink] w-full"
              data-cursor-text="VIEW PROJECT"
            >
              <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-[green]">
                <MediaImage
                  src={projects[0].image1.src}
                  alt={projects[0].image1.alt}
                  type="image"
                />
              </div>
              <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-[purple]">
                <MediaImage
                  src={projects[0].image2.src}
                  alt={projects[0].image2.alt}
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>
        </div>

        <div className="project-container z-[3] relative w-screen h-screen bg-[blue] flex items-end justify-center">
          <div className="group w-full relative">
            <div className="project-content-container px-4 md:px-8 mb-8 grid grid-cols-12 gap-8">
              <TransitionLink
                href={projects[1].url}
                className="text-sm col-span-1 font-serif pt-2 uppercase group-hover:text-text-action transition-all duration-300"
              >
                {romanNumerals[1]}
              </TransitionLink>
              <TransitionLink
                href={projects[1].url}
                className="index-project-title cursor-animation ~text-2xl/6xl font-serif col-span-6 group-hover:text-text-action group-hover:underline transition-all duration-300"
                data-cursor-text="VIEW PROJECT"
              >
                {projects[1].title}
              </TransitionLink>
              <TransitionLink
                href={projects[1].url}
                className="text-lg col-start-10 col-span-3 pt-1 font-serif group-hover:text-text-action transition-all duration-300"
              >
                <p>{projects[1].company}</p>
                <p>{projects[1].year}</p>
              </TransitionLink>
            </div>

            <TransitionLink
              href={projects[1].url}
              className="cursor-animation relative flex bg-[pink] w-full"
              data-cursor-text="VIEW PROJECT"
            >
              <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-[green]">
                <MediaImage
                  src={projects[1].image1.src}
                  alt={projects[1].image1.alt}
                  type="image"
                />
              </div>
              <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-[purple]">
                <MediaImage
                  src={projects[1].image2.src}
                  alt={projects[1].image2.alt}
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>
        </div>
        <div className="project-container z-[2] relative w-screen h-screen bg-[orange] flex items-end justify-center">
          <div className="group w-full relative">
            <div className="project-content-container px-4 md:px-8 mb-8 grid grid-cols-12 gap-8">
              <TransitionLink
                href={projects[2].url}
                className=" text-sm col-span-1 font-serif pt-2 uppercase group-hover:text-text-action transition-all duration-300"
              >
                {romanNumerals[2]}
              </TransitionLink>
              <TransitionLink
                href={projects[2].url}
                className="index-project-title cursor-animation ~text-2xl/6xl font-serif col-span-6 group-hover:text-text-action group-hover:underline transition-all duration-300"
                data-cursor-text="VIEW PROJECT"
              >
                {projects[2].title}
              </TransitionLink>
              <TransitionLink
                href={projects[2].url}
                className="text-lg col-start-10 col-span-3 pt-1 font-serif group-hover:text-text-action transition-all duration-300"
              >
                <p>{projects[2].company}</p>
                <p>{projects[2].year}</p>
              </TransitionLink>
            </div>

            <TransitionLink
              href={projects[2].url}
              className="cursor-animation relative flex bg-[pink] w-full"
              data-cursor-text="VIEW PROJECT"
            >
              <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-[green]">
                <MediaImage
                  src={projects[2].image1.src}
                  alt={projects[2].image1.alt}
                  type="image"
                />
              </div>
              <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-[purple]">
                <MediaImage
                  src={projects[2].image2.src}
                  alt={projects[2].image2.alt}
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexHero5;
