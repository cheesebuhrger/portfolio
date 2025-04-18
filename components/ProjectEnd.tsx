"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import MediaImage from "@/components/MediaImage";
import TransitionLink from "./TransitionLink";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProjectEndProps {
  process: {
    item1: string;
    item2: string;
    item3: string;
    item4: string;
    item5: string;
  };
  image: string;
  project: {
    type: "image" | "video";
    src: string;
    alt: string;
    name: string;
    url: string;
  };
  prototype: {
    type: "image" | "video";
    src: string;
    alt: string;
    name: string;
    url: string;
  };
}

const processTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".panel-1-container",
    start: "top 90%",
    // markers: true,
    toggleActions: "play none none reverse",
  },
});

const ProjectEnd = ({
  process,
  image,
  project,
  prototype,
}: ProjectEndProps) => {
  useGSAP(() => {
    // Large text animations
    gsap.set(".panel-1", {
      yPercent: -100,
    });
    gsap.set(".panel-2", {
      yPercent: -100,
    });
    gsap.set(".panel-3", {
      yPercent: -100,
    });
    gsap.to(".panel-1", {
      scrollTrigger: {
        trigger: ".panel-1-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        pin: true,
      },
    });
    gsap.to(".panel-2", {
      scrollTrigger: {
        trigger: ".panel-2-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        pin: true,
      },
    });
    gsap.to(".panel-3", {
      scrollTrigger: {
        trigger: ".panel-3-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        pin: true,
      },
    });

    gsap.to(".process-z-2", {
      zIndex: 2,
    });

    gsap.to(".process-fade", {
      opacity: 0.1,
      scrollTrigger: {
        trigger: ".panel-2-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Split type animation setup
    const processItems =
      document.querySelectorAll<HTMLElement>(".process-item");
    processItems.forEach((item) => {
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

    const processItemsDuration = 1;
    const processEase = "power2.out";
    const processSkewDelay = 0.25;
    const processItemsTighten = ">-0.9";

    // Process timeline with split type animations
    processTimeline
      .fromTo(
        ".process-item-1",
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          ease: processEase,
          duration: processItemsDuration,
        }
      )
      .fromTo(
        ".process-item-1 .line > span",
        {
          y: "100%",
          skewX: 30,
        },
        {
          y: 0,
          skewX: 0,
          duration: processItemsDuration,
          ease: processEase,
          delay: processSkewDelay,
        },
        "<"
      )
      .fromTo(
        ".process-item-1 .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          duration: processItemsDuration,
          ease: processEase,
        },
        "<"
      )
      .fromTo(
        ".process-item-2",
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          ease: processEase,
          duration: processItemsDuration,
        },
        processItemsTighten
      )
      .fromTo(
        ".process-item-2 .line > span",
        {
          y: "100%",
          skewX: -30,
        },
        {
          y: 0,
          skewX: 0,
          duration: processItemsDuration,
          ease: processEase,
          delay: processSkewDelay,
        },
        "<"
      )
      .fromTo(
        ".process-item-2 .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          duration: processItemsDuration,
          ease: processEase,
        },
        "<"
      )
      .fromTo(
        ".process-item-3",
        {
          xPercent: 100,
        },
        { xPercent: 0, ease: processEase, duration: processItemsDuration },
        processItemsTighten
      )
      .fromTo(
        ".process-item-3 .line > span",
        {
          y: "100%",
          skewX: 30,
        },
        {
          y: 0,
          skewX: 0,
          duration: processItemsDuration,
          ease: processEase,
          delay: processSkewDelay,
        },
        "<"
      )
      .fromTo(
        ".process-item-3 .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          duration: processItemsDuration,
          ease: processEase,
        },
        "<"
      )
      .fromTo(
        ".process-item-4",
        {
          xPercent: -100,
        },
        {
          xPercent: 0,
          ease: processEase,
          duration: processItemsDuration,
        },
        processItemsTighten
      )
      .fromTo(
        ".process-item-4 .line > span",
        {
          y: "100%",
          skewX: -30,
        },
        {
          y: 0,
          skewX: 0,
          duration: processItemsDuration,
          ease: processEase,
          delay: processSkewDelay,
        },
        "<"
      )
      .fromTo(
        ".process-item-4 .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          duration: processItemsDuration,
          ease: processEase,
        },
        "<"
      )
      .fromTo(
        ".process-item-5",
        {
          xPercent: 100,
        },
        {
          xPercent: 0,
          ease: processEase,
          duration: processItemsDuration,
        },
        processItemsTighten
      )
      .fromTo(
        ".process-item-5 .line > span",
        {
          y: "100%",
          skewX: 30,
        },
        {
          y: 0,
          skewX: 0,
          duration: processItemsDuration,
          ease: processEase,
          delay: processSkewDelay,
        },
        "<"
      )
      .fromTo(
        ".process-item-5 .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          duration: processItemsDuration,
          ease: processEase,
        },
        "<"
      );
  });

  return (
    <section>
      <div
        className="z-10 relative w-screen h-screen overflow-hidden bg-surface-secondary bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="pointer-events-none relative w-screen overflow-hidden flex flex-col items-end pb-32 md:pb-40 lg:pb-48 bg-surface-primary-negative">
        <div className="panel-1-container z-[3] relative w-full">
          <div className="panel-1 relative flex flex-col gap-4 md:gap-6 lg:gap-8 w-full h-screen items-end justify-center bg-surface-primary-negative">
            <div className="process-fade flex flex-row w-full h-full gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 text-text-primary-negative font-serif text-2xl">
              <div className="overflow-hidden grid grid-rows-5 pb-8 pt-24 w-full border-r border-border-tertiary-negative justify-items-end">
                <div className="process-item-1 process-item pr-8 w-1/2 row-start-5 text-right flex items-center">
                  {process.item1}
                </div>
                <div className="process-item-3 process-item pr-8 w-1/2 row-start-3 text-right flex items-center">
                  {process.item3}
                </div>
                <div className="process-item-5 process-item pr-8 w-1/2 row-start-1 text-right flex items-center">
                  {process.item5}
                </div>
              </div>

              <div className="overflow-hidden grid grid-rows-5 pb-8 pt-24 w-full border-l border-border-tertiary-negative">
                <div className="process-item-2 process-item pl-8 w-1/2 row-start-4 flex items-center">
                  {process.item2}
                </div>
                <div className="process-item-4 process-item pl-8 w-1/2 row-start-2 flex items-center">
                  {process.item4}
                </div>
              </div>
            </div>
            <h1 className="process-fade ~text-6xl/13xl p-8 text-text-primary-negative w-full text-center">
              The Nitty Gritty
            </h1>
          </div>
        </div>

        <div className="panel-2-container z-[2] relative w-full">
          <div className="panel-2 relative flex items-end justify-center gap-8 w-full bg-surface-primary-negative">
            <h1 className="~text-6xl/13xl text-text-primary-negative h-fit w-full p-8 font-serif-italic text-center">
              Want the Details?
            </h1>
          </div>
        </div>

        <div className="pointer-events-none panel-3-container z-[1] relative w-full">
          <div className="panel-3 relative flex items-end justify-center p-8 gap-8 w-full h-full">
            <a
              href="https://linkedin.com/in/buhrduong"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto hover:text-text-action flex items-center justify-center w-full font-serif bg-surface-primary hover:bg-surface-secondary text-text-primary rounded-lg p-16 h-fit text-8xl"
            >
              Let&rsquo;s Connect
            </a>
          </div>
        </div>
      </div>

      <div className="explore-container relative bg-surface-primary-negative border-t border-border-primary-negative grid grid-flow-row gap-32 p-4 md:gap-48 md:p-6 lg:p-8 text-text-primary-negative">
        <div className="flex gap-4 md:gap-6 lg:gap-8">
          <div className="flex flex-row md:justify-between gap-4 md:w-1/2 opacity-80">
            <p className="text-xs font-mono uppercase">EXPLORE MORE</p>
          </div>
        </div>

        <div className="flex gap-8 relative">
          <div className="group relative w-full h-fit">
            <TransitionLink
              href={project.url}
              className="transition-all duration-300"
            >
              <div className="relative aspect-21/9-half bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  type={project.type}
                  src={project.src}
                  alt={project.alt}
                />
              </div>

              <p className="text-xs font-mono uppercase text-text-secondary-negative mt-6 mb-2 group-hover:text-text-action transition-all duration-300">
                Project
              </p>

              <h2 className="text-5xl group-hover:text-text-action group-hover:underline transition-all duration-300">
                {project.name}
              </h2>
            </TransitionLink>
          </div>

          <div className="group relative w-full h-fit">
            <TransitionLink
              href={prototype.url}
              className="transition-all duration-300"
            >
              <div className="relative aspect-21/9-half bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  type={prototype.type}
                  src={prototype.src}
                  alt={prototype.alt}
                />
              </div>
              <p className="text-xs font-mono uppercase text-text-secondary-negative mt-6 mb-2 group-hover:text-text-action transition-all duration-300">
                Prototype
              </p>
              <h2 className="text-5xl group-hover:text-text-action group-hover:underline transition-all duration-300">
                {prototype.name}
              </h2>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectEnd;
