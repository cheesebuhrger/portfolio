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
        // markers: true,
        pin: true,
      },
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
      },
    });

    // // 1
    // tl.fromTo(
    //   ".card-confetti-container-1",
    //   {
    //     yPercent: 50,
    //   },
    //   {
    //     left: 0,
    //     yPercent: -50,
    //     xPercent: 40,
    //     rotateZ: 30,
    //     duration: 1,
    //     ease: "power2.inOut",
    //   }
    // );
    // // 2
    // tl.fromTo(
    //   ".card-confetti-container-2",
    //   {
    //     yPercent: 50,
    //   },
    //   {
    //     left: 0,
    //     yPercent: -50,
    //     xPercent: -15,
    //     rotateZ: -10,
    //     duration: 1,
    //     ease: "power2.inOut",
    //   }
    // );
    // // 3
    // tl.fromTo(
    //   ".card-confetti-container-3",
    //   {
    //     yPercent: 50,
    //   },
    //   {
    //     left: 0,
    //     yPercent: -40,
    //     xPercent: 20,
    //     rotateZ: 20,
    //     duration: 1,
    //     ease: "power2.inOut",
    //   }
    // );
    // // 4
    // tl.fromTo(
    //   ".card-confetti-container-4",
    //   {
    //     yPercent: 50,
    //   },
    //   {
    //     left: 0,
    //     yPercent: -50,
    //     xPercent: -40,
    //     rotateZ: -30,
    //     duration: 1,
    //     ease: "power2.inOut",
    //   }
    // );
    // // 5
    // tl.fromTo(
    //   ".card-confetti-container-5",
    //   {
    //     yPercent: 50,
    //   },
    //   {
    //     left: 0,
    //     yPercent: -10,
    //     xPercent: -20,
    //     rotateZ: -30,
    //     duration: 1,
    //     ease: "power2.inOut",
    //   }
    // );
    // gsap.set(".process-item-1", {
    //   xPercent: 100,
    //   skewX: 30,
    // });
    tl.fromTo(
      ".process-item-1",
      {
        xPercent: 100,
        skewX: 30,
      },
      {
        xPercent: 0,
        skewX: 0,
        ease: "power3.out",
        duration: 2,
      }
    );
    tl.fromTo(
      ".process-item-2",
      {
        xPercent: -100,
      },
      { xPercent: 0, duration: 2, ease: "power3.out" }
    );
    tl.fromTo(
      ".process-item-3",
      {
        xPercent: 100,
      },
      { xPercent: 0, duration: 2, ease: "power3.out" }
    );
    tl.fromTo(
      ".process-item-4",
      {
        xPercent: -100,
      },
      { xPercent: 0, duration: 2, ease: "power3.out" }
    );
    tl.fromTo(
      ".process-item-5",
      {
        xPercent: 100,
      },
      { xPercent: 0, duration: 2, ease: "power3.out" }
    );
  });

  const ProcessCard = ({
    label,
    className,
  }: {
    label: string;
    className?: string;
  }) => (
    <div className="~text-lg-p/5xl gap-8 w-80 aspect-2/3 border border-border-primary-negative text-text-primary-negative font-serif-p p-8 rounded-md bg-surface-primary-negative">
      {label}
    </div>
  );

  return (
    <ReactLenis root>
      <div>
        {/* Spacing */}
        <section className="relative h-screen flex items-center justify-center gap-8 opacity-90 bg-surface-primary">
          <h1 className="split-type-animation text-8xl font-serif">
            Playground
          </h1>
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

        <div className="relative w-screen -z-[1] overflow-hidden flex flex-col items-end pb-32 md:pb-40 lg:pb-48 bg-surface-primary-negative">
          <div className="panel-1-container relative w-full">
            <div className="panel-1 relative flex flex-col gap-4 md:gap-6 lg:gap-8 w-full h-screen items-end justify-center bg-surface-primary-negative">
              <div className="flex flex-row border w-full h-full gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 border-[blue] text-text-primary-negative font-serif text-2xl">
                <div className="overflow-hidden grid grid-rows-5 py-8 w-full border-r border-border-tertiary-negative justify-items-end">
                  <div className="process-item-1 nitty-gritty-text pr-8 w-1/2 row-start-5 border border-[red] text-right flex items-center">
                    How & why did we start using the Shape Up process?
                  </div>
                  <div className="process-item-3 nitty-gritty-text pr-8 w-1/2 row-start-3 border border-[red] text-right flex items-center">
                    How did we tackle product education, comms and support?
                  </div>
                  <div className="process-item-5 nitty-gritty-text pr-8 w-1/2 row-start-1 border border-[red] text-right flex items-center">
                    How did we introduce a brand refresh alongside this work?
                  </div>
                </div>

                <div className="overflow-hidden grid grid-rows-5 w-full border-l border-border-tertiary-negative">
                  <div className="process-item-2 nitty-gritty-text pl-8 w-1/2 row-start-4 border border-[red] flex items-center">
                    Which decisions kept us on the worker’s side?
                  </div>
                  <div className="process-item-4 nitty-gritty-text pl-8 w-1/2 row-start-2 border border-[red] flex items-center">
                    What challenges arose throughout the project?
                  </div>
                </div>
              </div>
              <h1 className="nitty-gritty-text ~text-6xl/13xl p-8 text-text-primary-negative w-full text-center border border-[red]">
                The Nitty Gritty
              </h1>
            </div>
          </div>

          <div className="panel-2-container -z-[2] relative w-full">
            <div className="panel-2 relative flex items-end justify-center gap-8 w-full bg-surface-primary-negative">
              <h1 className="~text-6xl/13xl text-text-primary-negative h-fit w-full p-8 font-serif-italic text-center">
                Want the Details?
              </h1>
            </div>
          </div>

          <div className="panel-3-container -z-[3] relative w-full">
            <div className="panel-3 relative flex items-end justify-center p-8 gap-8 w-full h-full">
              <div className="flex items-center justify-center w-full font-serif bg-surface-primary text-text-primary rounded-lg p-16 h-fit text-8xl">
                <p>Message me</p>
              </div>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="explore-container relative bg-surface-primary-negative border-t border-border-primary-negative grid grid-flow-row gap-32 p-4 md:gap-48 md:p-6 lg:p-8 text-text-primary-negative">
          <div className="flex gap-4 md:gap-6 lg:gap-8">
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

        {/* <section className="relative w-screen h-screen flex items-center justify-center gap-8 bg-surface-primary-negative">
          <div className="bg-[yellow] w-full h-full absolute flex items-end justify-center">
     
            <div className="card-confetti-container-1 border-2 border-[red] w-full h-full absolute flex items-end justify-center">
              <div className="process-card-1 ~text-lg-p/5xl gap-8 w-80 aspect-2/3 border border-border-primary-negative text-text-primary-negative font-serif-p p-8 rounded-md bg-surface-primary-negative">
                Which decisions kept us on the worker&rsquot;s side?
              </div>
            </div>

            <div className="card-confetti-container-2 border-2 border-[blue] w-full h-full absolute flex items-end justify-center">
              <div className="process-card-1 ~text-lg-p/5xl gap-8 w-80 aspect-2/3 border border-border-primary-negative text-text-primary-negative font-serif-p p-8 rounded-md bg-surface-primary-negative">
                How & why did we start using the Shape Up process?
              </div>
            </div>

            <div className="card-confetti-container-3 border-2 border-[green] w-full h-full absolute flex items-end justify-center">
              <div className="process-card-1 ~text-lg-p/5xl gap-8 w-80 aspect-2/3 border border-border-primary-negative text-text-primary-negative font-serif-p p-8 rounded-md bg-surface-primary-negative">
                How did we tackle product education, comms and support?
              </div>
            </div>

            <div className="card-confetti-container-4 border-2 border-[purple] w-full h-full absolute flex items-end justify-center">
              <div className="process-card-1 ~text-lg-p/5xl gap-8 w-80 aspect-2/3 border border-border-primary-negative text-text-primary-negative font-serif-p p-8 rounded-md bg-surface-primary-negative">
                How did we introduce a brand refresh alongside this work?
              </div>
            </div>

            <div className="card-confetti-container-5 border-2 border-[orange] w-full h-full absolute flex items-end justify-center">
              <div className="process-card-1 ~text-lg-p/5xl gap-8 w-80 aspect-2/3 border border-border-primary-negative text-text-primary-negative font-serif-p p-8 rounded-md bg-surface-primary-negative">
                What challenges arose throughout the project?
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </ReactLenis>
  );
};

export default Playground;
