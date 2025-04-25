"use client";

import ProjectSection from "@/components/ProjectSection";
import ProjectSectionMedia from "@/components/ProjectSectionMedia";
import React from "react";

import { ReactLenis } from "@studio-freight/react-lenis";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { usePeelMediaAnimation } from "@/hooks/usePeelMediaAnimation";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import Image from "next/image";
import SplitType from "split-type";
import Button from "@/components/Button";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const processTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".panel-1-container",
    start: "top 90%",
    toggleActions: "play none none reverse",
  },
});

const Playground: React.FC = () => {
  // Initialize the animation hooks
  useImageScaleAnimation();
  usePeelMediaAnimation();
  useStackAnimation();

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
    gsap.to(".nitty-gritty-text", {
      opacity: 0.1,
      scrollTrigger: {
        trigger: ".panel-2-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
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
    <ReactLenis root>
      <div>
        <section className="relative h-screen flex items-center justify-center gap-8 bg-surface-primary"></section>
        {/* Spacing */}
        <section className="relative h-screen flex items-center justify-center gap-8 bg-surface-primary">
          <h1 className="text-8xl font-serif">Playground</h1>
          <svg width="320" height="130" xmlns="http://www.w3.org/2000/svg">
            <rect
              width="300"
              height="100"
              x="10"
              y="10"
              style={{ fill: "rgb(0,0,255)", strokeWidth: 3, stroke: "red" }}
            />
          </svg>
        </section>

        {/* divider */}

        {/* divider */}
        {/* <section className="relative p-8 gap-8 bg-surface-primary border-t border-border-primary h-screen flex items-end justify-center">
          This is the end
        </section> */}
        {/* divider */}

        {/* <section className="relative flex flex-row items-end justify-end p-8 gap-8 bg-surface-primary-negative border-t border-border-primary h-screen">
          <div className="w-1/2">
            <h1 className="~text-6xl/12xl text-balance text-text-primary-negative">
              The
              <br />
              Nitty Gritty
            </h1>
          </div>

          <div className="flex flex-col w-1/2 ~text-xl/5xl-p text-text-primary-negative font-serif-p gap-4">
            <div className="border border-border-primary-negative bg-surface-primary-negative rounded-md p-8 ">
              <p>How & Why did we move start using the Shape Up process?</p>
            </div>

            <div className="border border-border-primary-negative bg-surface-primary-negative rounded-md p-8 ">
              <p>
                What were our principles and how did we stay on the
                worker&rsquo;s side?
              </p>
            </div>

            <div className="border border-border-primary-negative bg-surface-primary-negative rounded-md p-8 ">
              <p>What challenges arose throughout the project?</p>
            </div>

            <div className="border border-border-primary-negative bg-surface-primary-negative rounded-md p-8 ">
              <p>
                What were our principles and how did we stay on the
                worker&rsquo;s side?
              </p>
            </div>

            <div className="border border-border-primary-negative bg-surface-primary-negative rounded-md p-8 ">
              <p>How did we tackle product education, comms and support?</p>
            </div>

            <div className="border border-border-primary-negative bg-surface-primary-negative rounded-md p-8 ">
              <p>
                How did we introduce a brand refresh alongside product work?
              </p>
            </div>
          </div>
        </section>

        <section className="relative flex flex-row p-8 pt-40 gap-8 bg-surface-primary-negative">
          <div className="flex items-center justify-center w-screen font-serif bg-surface-primary text-text-primary rounded-lg p-16 text-8xl">
            <p>Get in touch to learn more</p>
          </div>
        </section>

        <ProjectSection sectionLabel="Playground">
          <div>full - mockup-mobile - VIDEO</div>
          <div
            className="
            peel-media-animation-right
            w-full
            rounded-md
            overflow-hidden
            lg:h-[calc(100vh-4rem)]
            bg-[url('https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-06-bg_y7lytz.webp')]
            bg-cover
            bg-center
            bg-no-repeat
          "
          >
            <div
              className="
            relative
            flex
            w-full
            h-full
            items-center
            justify-center
            p-4 py-20
            sm:p-8 sm:py-24
            md:p-12 md:py-24
          "
            >
              <video
                src="/images/wheel/TRH-6.1.mp4"
                controls={false}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="
                w-fit
                h-full
                object-contain
                image-scale-animation-subtle
              "
                aria-label="Full width media item"
              />
            </div>
          </div>
          <div className="peel-media-animation-left">
            <ProjectSectionMedia
              layout={{
                type: "mockup",
                background: {
                  image:
                    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-06-bg_y7lytz.webp",
                },
              }}
              media={[
                {
                  type: "video",
                  src: "/images/wheel/TRH-6.1.mp4",
                  alt: "Full width media item",
                },
              ]}
            />
          </div>
        </ProjectSection> */}
      </div>
    </ReactLenis>
  );
};

export default Playground;
