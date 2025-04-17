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
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const tl = gsap.timeline();

const Playground: React.FC = () => {
  // Initialize the animation hooks
  useImageScaleAnimation();
  usePeelMediaAnimation();
  useSplitTypeAnimation();
  useStackAnimation();

  useGSAP(() => {
    // gsap.set(".panel", {
    //   zIndex: (i, target, targets) => targets.length - i,
    // });
    gsap.set(".panel-2", {
      yPercent: -100,
    });
    gsap.set(".panel-3", {
      yPercent: -100,
    });
    gsap.to(".panel-2", {
      scrollTrigger: {
        trigger: ".panel-2-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
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
        // markers: true,
      },
    });
    gsap.to(".panel-3", {
      scrollTrigger: {
        trigger: ".panel-3-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        pin: true,
        pinSpacing: false,
      },
    });
    // gsap.fromTo(
    //   ".explore-container, .panel-1, .panel-2, .pin-dis",
    //   {
    //     backgroundColor: "#1A1A1A",
    //   },
    //   {
    //     backgroundColor: "#F2F2F2",
    //     duration: 0.5,
    //     ease: "power2.inOut",
    //     scrollTrigger: {
    //       trigger: ".turn-white",
    //       // start: "top bottom",
    //       // end: "center bottom",
    //       markers: true,
    //       // scrub: 1,
    //       toggleActions: "play none none reverse",
    //     },
    //   }
    // );
    // tl.fromTo(
    //   ".explore-text",
    //   {
    //     color: "#F2F2F2",
    //   },
    //   {
    //     color: "#1A1A1A",
    //     duration: 0.5,
    //     ease: "power1.inOut",
    //     scrollTrigger: {
    //       trigger: ".turn-white",
    //       // start: "top bottom",
    //       // end: "center bottom",
    //       // scrub: 1,
    //       toggleActions: "play none none reverse",
    //     },
    //   },
    //   "<"
    // );
    // tl.to(
    //   "panel-2-container",
    //   {
    //     backgroundColor: "#f2f2f2",
    //     scrollTrigger: {
    //       trigger: ".turn-white",
    //       start: "top bottom",
    //       end: "bottom bottom",
    //       markers: true,
    //       scrub: true,
    //     },
    //   },
    //   "<"
    // );
  });

  return (
    <ReactLenis root>
      <div>
        {/* Spacing */}
        <section className="h-screen flex items-center justify-center gap-8">
          <h1 className="split-type-animation text-8xl font-serif">
            Playground
          </h1>
          <p className="split-type-animation text-4xl font-serif w-1/2">
            A collection of experiments and ideas. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Quisquam, quos.
          </p>
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

        <div className="pin-dis relative w-screen overflow-hidden flex flex-col items-end pb-32 md:pb-40 lg:pb-48 bg-surface-primary-negative">
          <div className="z-30 panel-1 relative flex flex-row gap-8 w-full h-screen items-end justify-center bg-surface-primary-negative">
            <h1 className="explore-text nitty-gritty-text ~text-6xl/12xl p-8 text-text-primary-negative w-full text-center">
              The Nitty Gritty
            </h1>
          </div>

          <div className="panel-2-container z-20 relative w-full">
            <div className="panel-2 relative flex items-end justify-center gap-8 w-full bg-surface-primary-negative">
              <h1 className="explore-text ~text-6xl/12xl text-text-primary-negative h-fit w-full p-8 font-serif-italic text-center">
                Want the Details?
              </h1>
            </div>
          </div>

          <div className="panel-3-container z-10 relative w-full">
            <div className="panel-3 relative flex items-end justify-center p-8 gap-8 w-full h-full">
              <div className="flex items-center justify-center border border-border-primary w-full font-serif bg-surface-primary text-text-primary rounded-lg p-16 h-fit text-8xl">
                <p>Message me</p>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="explore-container relative bg-surface-primary-negative border-t border-border-primary-negative grid grid-flow-row gap-32 p-4 md:gap-48 md:p-6 lg:p-8 text-text-primary-negative">
          <div className="explore-text flex gap-4 md:gap-6 lg:gap-8">
            <div className="flex flex-row md:justify-between gap-4 md:w-1/2 opacity-80">
              <p className="text-xs font-mono uppercase">EXPLORE MORE</p>
            </div>
          </div>

          <div className="turn-white grid grid-cols-2 gap-8">
            <div className="w-full h-fit">
              <div className="aspect-4/3 bg-[grey] rounded-md overflow-hidden">
                <Image
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744093117/buildforce-cover-01_1_jzzqeo.webp"
                  alt="Project Name"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-5xl mt-4">Project Name </h2>
            </div>

            <div className="w-full h-fit">
              <div className="aspect-4/3 bg-[grey] rounded-md overflow-hidden" />
              <h2 className="text-5xl mt-4">Prototype Name </h2>
            </div>
          </div>
        </div>
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
