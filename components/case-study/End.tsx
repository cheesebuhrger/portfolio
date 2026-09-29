"use client";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Media from "@/components/ui/Media";
import TransitionLink from "@/components/layout/TransitionLink";
import type { ProjectSummary } from "@/lib/content";

interface EndProps {
  /** Full-bleed image above "The Nitty Gritty". */
  image: string;
  /** Five process questions, laid out alternating right/left bottom-up. */
  process: string[];
  /** "Explore more" cards. */
  related: ProjectSummary[];
}

const End = ({ process, image, related }: EndProps) => {
  useGSAP(() => {
    const processTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".panel-1-container",
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

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
      // .line-mask (clip-path reveal) > .line (slides up, un-skews)
      const split = SplitText.create(item, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
      // The animated clip-path masks instead of SplitText's overflow: clip.
      gsap.set(split.masks, { overflow: "visible" });

      // Initial state for lines
      gsap.set(split.lines, {
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
        ".process-item-1 .line-mask > .line",
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
        ".process-item-1 .line-mask",
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
        ".process-item-2 .line-mask > .line",
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
        ".process-item-2 .line-mask",
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
        ".process-item-3 .line-mask > .line",
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
        ".process-item-3 .line-mask",
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
        ".process-item-4 .line-mask > .line",
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
        ".process-item-4 .line-mask",
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
        ".process-item-5 .line-mask > .line",
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
        ".process-item-5 .line-mask",
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
        className="z-10 relative w-screen h-screen overflow-hidden bg-surface-secondary bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="pointer-events-none relative w-screen overflow-hidden flex flex-col items-end pb-32 md:pb-40 lg:pb-48 bg-surface-primary-negative">
        <div className="panel-1-container z-[3] relative w-full">
          <div className="panel-1 relative flex flex-col gap-4 md:gap-6 lg:gap-8 w-full h-screen items-end justify-center bg-surface-primary-negative">
            <div className="process-fade flex flex-row w-full h-full gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 text-text-primary-negative font-serif ~text-xl/2xl">
              <div className="overflow-hidden grid grid-rows-5 pb-8 pt-24 w-full border-r border-border-tertiary-negative justify-items-end">
                <div className="process-item-1 process-item pl-4 md:pl-0 pr-4 md:pr-6 lg:pr-8 w-full md:w-1/2 row-start-5 text-right flex items-center text-balance">
                  {process[0]}
                </div>
                <div className="process-item-3 process-item pl-4 md:pl-0 pr-4 md:pr-6 lg:pr-8 w-full md:w-1/2 row-start-3 text-right flex items-center text-balance">
                  {process[2]}
                </div>
                <div className="process-item-5 process-item pl-4 md:pl-0 pr-4 md:pr-6 lg:pr-8 w-full md:w-1/2 row-start-1 text-right flex items-center text-balance">
                  {process[4]}
                </div>
              </div>

              <div className="overflow-hidden grid grid-rows-5 pb-8 pt-24 w-full border-l border-border-tertiary-negative">
                <div className="process-item-2 process-item pr-4 md:pr-0 pl-4 md:pl-6 lg:pl-8 w-full md:w-1/2 row-start-4 flex items-center text-balance">
                  {process[1]}
                </div>
                <div className="process-item-4 process-item pr-4 md:pr-0 pl-4 md:pl-6 lg:pl-8 w-full md:w-1/2 row-start-2 flex items-center text-balance">
                  {process[3]}
                </div>
              </div>
            </div>
            <h1 className="process-fade ~text-6xl/13xl p-4 md:p-6 lg:p-8 text-text-primary-negative w-full text-center">
              The Nitty Gritty
            </h1>
          </div>
        </div>

        <div className="panel-2-container z-[2] relative w-full">
          <div className="panel-2 relative flex items-end justify-center gap-8 w-full bg-surface-primary-negative">
            <h1 className="~text-6xl/13xl text-text-primary-negative h-fit w-full p-4 md:p-6 lg:p-8 font-serif-italic text-center">
              Want the Details?
            </h1>
          </div>
        </div>

        <div className="pointer-events-none panel-3-container z-[1] relative w-full">
          <div className="panel-3 relative flex items-end justify-center p-4 md:p-6 lg:p-8 w-full h-full">
            <a
              href="https://linkedin.com/in/buhrduong"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-animation pointer-events-auto hover:text-text-action flex items-center justify-center w-full font-serif bg-surface-primary hover:bg-surface-secondary text-text-primary rounded-lg p-8 md:p-12 lg:p-16 h-fit ~text-6xl/8xl"
              data-cursor-text="View LinkedIn"
            >
              Let&rsquo;s Connect
            </a>
          </div>
        </div>
      </div>

      <div className="explore-container relative bg-surface-primary-negative border-t border-border-primary-negative flex flex-col gap-32 p-4 md:gap-48 md:p-6 lg:p-8 text-text-primary-negative">
        <div className="flex gap-4 md:gap-6 lg:gap-8">
          <div className="flex flex-row md:justify-between gap-4 md:w-1/2 opacity-80">
            <p className="text-xs font-mono uppercase">EXPLORE MORE</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-6 lg:gap-8 relative">
          {related.map((project) => (
            <div key={project.slug} className="group relative w-full md:w-1/2 h-fit">
              <TransitionLink
                href={project.href}
                className="cursor-animation transition-all duration-300"
                data-cursor-text="VIEW PROJECT"
              >
                <div className="relative aspect-21/9-half bg-surface-secondary rounded-md overflow-hidden">
                  <Media
                    type="image"
                    src={project.cover.primary.src}
                    alt={project.cover.primary.alt}
                  />
                </div>
                <h2 className="~text-4xl/5xl mt-6 group-hover:text-text-action group-hover:underline text-pretty">
                  {project.title}
                </h2>
              </TransitionLink>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default End;
