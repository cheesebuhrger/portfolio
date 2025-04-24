"use client";

import React, { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";
import MediaImage from "./MediaImage";
import { projects, romanNumerals } from "@/data/indexProjectCovers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { useLenis } from "@studio-freight/react-lenis";

const IndexHero5 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  gsap.registerPlugin(ScrollTrigger);

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
        display: "block",
        y: "100%",
        x: 75,
        skewX: 30,
      });
    });

    gsap.set(".index-intro-in", {
      opacity: 0,
    });

    gsap.fromTo(
      ".index-intro-in",
      {
        yPercent: 5,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        delay: 1,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      ".project-image-fix-container",
      {
        display: "block",
      },
      {
        display: "none",
        duration: 0.01,
        scrollTrigger: {
          trigger: ".index-project-1",
          start: "center bottom",
          // markers: true,
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.to(".project-image-fix", {
      scale: 2,
      bottom: "0",
      right: "0",
      borderRadius: "0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".project-container-1",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        scrub: true,
      },
    });

    gsap.to(".index-intro-out", {
      opacity: 0.1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".index-project-1",
        start: "25% bottom",
        end: "center bottom",
        scrub: true,
      },
    });

    gsap.set(".project-image-left, .project-image-fix", {
      transformOrigin: "bottom right",
    });
    gsap.set(".project-image-right", {
      transformOrigin: "bottom left",
    });

    gsap.set(".project-image-fix-container", {
      display: "block",
    });

    const pinFirstProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-container-1",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    const pinSecondProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-container-2",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    const pinThirdProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".project-container-3",
        start: "top bottom",
        end: "bottom bottom",
        // markers: true,
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    pinFirstProject
      .set(".project-container-1", { yPercent: -100 })
      .fromTo(
        ".project-image-left",
        {
          scale: 0.5,
          bottom: "2rem",
          right: "1rem",
          borderRadius: "2rem",
        },
        {
          scale: 1,
          bottom: "0",
          right: "0",
          borderRadius: "0",
          ease: "power1.inOut",
        }
      )
      .fromTo(
        ".project-image-right",
        {
          scale: 0,
          borderRadius: "2rem",
          left: "1rem",
        },
        {
          scale: 1,
          borderRadius: "0",
          ease: "power1.inOut",
          left: 0,
        },
        "<"
      );

    pinSecondProject.set(".project-container-2", { yPercent: -100 });
    pinThirdProject.set(".project-container-3", { yPercent: -100 });

    const textFirstProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".index-project-1",
        start: "25% center",
        markers: true,
        toggleActions: "play none none reverse",
      },
    });

    textFirstProject
      .fromTo(
        ".index-project-1 .index-project-title .line > span",
        {
          y: "100%",
          x: 75,
          skewX: 30,
        },
        {
          y: 0,
          x: 0,
          skewX: 0,
          ease: "power2.out",
          duration: 1,
        }
      )
      .fromTo(
        ".index-project-1 .index-project-title .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          ease: "power2.out",
          duration: 1,
        },
        "<"
      )
      .fromTo(
        ".index-project-1 .index-project-meta",
        { opacity: 0.1 },
        {
          opacity: 1,
          ease: "power2.out",
          duration: 0.5,
        },
        "<"
      );
  }, []);

  return (
    <section className="overall-container relative">
      <div className="project-image-fix-container w-1/2 z-[10] fixed bottom-0">
        <div
          onClick={() => {
            lenis?.scrollTo("#projects", { duration: 2 });
          }}
          className="project-image-fix index-intro-in absolute w-1/2 aspect-4/3 overflow-hidden bottom-8 right-4 rounded-md cursor-pointer"
        >
          <MediaImage
            src={projects[0].image1.src}
            alt={projects[0].image1.alt}
            type="image"
          />
        </div>
      </div>
      <div className="index-intro relative z-[5] w-screen h-screen flex flex-col pt-16 md:pt-20 lg:pt-24 pb-4 md:pb-6 lg:pb-8 items-end bg-surface-primary border-b border-border-tertiary">
        <div className="index-intro-out relative pl-4 pr-8 w-full h-full grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 pt-16 md:p-6 lg:p-8 items-center">
          <h1 className="relative text-4xl split-type-animation-hero col-span-6 col-start-7">
            A builder at heart, I&rsquo;m always finding new ways to bring ideas
            to life. Through a decade of designing products, I&rsquo;ve honed
            skills in interaction design, motion, & prototyping. My current
            obsession is writing code to bridge design & dev.
          </h1>
        </div>
        <div className="index-intro-out w-full h-fit flex flex-row justify-end items-center">
          {/* LEFT */}
          <div className="w-full h-full flex flex-col justify-end items-end">
            <div className="index-intro-in relative w-1/2 h-fit flex flex-col gap-2 right-2 md:right-3 lg:right-4">
              <p className="text-xs font-mono uppercase">Featured Project</p>
              <div className="relative w-full aspect-4/3 rounded-md overflow-hidden"></div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full h-full flex flex-col justify-end">
            <div className="index-intro-in relative w-1/2 h-fit flex flex-col gap-2 left-4">
              <p className="text-xs font-mono uppercase">Featured Prototype</p>
              <div
                onClick={() => {
                  lenis?.scrollTo("#prototypes", { duration: 2 });
                }}
                className="relative w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden cursor-pointer"
              >
                <MediaImage
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-1_dwsdpv.webp"
                  alt="Buildforce Time Tracking App"
                  type="image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="projects" className="index-projects relative w-screen">
        {/* PROJECT 1 */}
        <div className="index-project-1 z-[4] bg-surface-primary relative w-full">
          <div className="project-container-1 h-screen flex flex-col justify-between relative">
            <h2 className="text-xs font-mono uppercase p-4 md:p-6 lg:p-8">
              Projects
            </h2>
            <div className="group w-full h-fit relative flex-col">
              <div className="project-content-1 px-4 md:px-8 mb-8 w-full grid grid-cols-12 gap-8 relative">
                <div className="index-project-meta text-sm col-span-1 font-serif pt-2 uppercase group-hover:text-text-action">
                  {romanNumerals[0]}
                </div>
                <TransitionLink
                  href={projects[0].url}
                  className="index-project-title cursor-animation ~text-2xl/6xl font-serif col-span-6 group-hover:text-text-action group-hover:underline"
                  data-cursor-text="VIEW PROJECT"
                >
                  {projects[0].title}
                </TransitionLink>
                <div className="index-project-meta text-lg col-start-10 col-span-3 pt-1 font-serif group-hover:text-text-action">
                  <p>{projects[0].company}</p>
                  <p>{projects[0].year}</p>
                </div>
              </div>

              <TransitionLink
                href={projects[0].url}
                className="cursor-animation relative flex w-full"
                data-cursor-text="VIEW PROJECT"
              >
                <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                  <MediaImage
                    src={projects[0].image1.src}
                    alt={projects[0].image1.alt}
                    type="image"
                  />
                </div>
                <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                  <MediaImage
                    src={projects[0].image2.src}
                    alt={projects[0].image2.alt}
                    type="image"
                  />
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* PROJECT 2 */}

        <div className="index-project-1 z-[3] bg-surface-primary relative w-full">
          <div className="project-container-2 h-screen flex flex-col justify-end items-end relative">
            <div className="group w-full h-fit relative flex-col">
              <div className="project-content-2 px-4 md:px-8 mb-8 w-full grid grid-cols-12 gap-8 relative">
                <div className="index-project-meta text-sm col-span-1 font-serif pt-2 uppercase group-hover:text-text-action">
                  {romanNumerals[1]}
                </div>
                <TransitionLink
                  href={projects[1].url}
                  className="index-project-title cursor-animation ~text-2xl/6xl font-serif col-span-6 group-hover:text-text-action group-hover:underline"
                  data-cursor-text="VIEW PROJECT"
                >
                  {projects[1].title}
                </TransitionLink>
                <div className="index-project-meta text-lg col-start-10 col-span-3 pt-1 font-serif group-hover:text-text-action">
                  <p>{projects[1].company}</p>
                  <p>{projects[1].year}</p>
                </div>
              </div>

              <TransitionLink
                href={projects[1].url}
                className="cursor-animation relative flex w-full"
                data-cursor-text="VIEW PROJECT"
              >
                <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                  <MediaImage
                    src={projects[1].image1.src}
                    alt={projects[1].image1.alt}
                    type="image"
                  />
                </div>
                <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                  <MediaImage
                    src={projects[1].image2.src}
                    alt={projects[1].image2.alt}
                    type="image"
                  />
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* PROJECT 3 */}
        <div className="project-mask-3 z-[2] relative w-screen h-screen bg-[orange] flex items-end justify-center">
          <div className="project-container-3 group w-full h-full relative flex flex-col items-end justify-end">
            <div className="project-content-3 px-4 md:px-8 mb-8 w-full grid grid-cols-12 gap-8">
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
