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

    gsap.set(".project-image-left, .project-image-left-fix", {
      transformOrigin: "bottom right",
    });
    gsap.set(".project-image-right", {
      transformOrigin: "bottom left",
    });

    // gsap.set(".project-container-1", {
    //   yPercent: -100,
    // });
    // gsap.set(".project-container-2", {
    //   yPercent: -100,
    // });
    // gsap.set(".project-container-3", {
    //   yPercent: -100,
    // });
    gsap.to(".project-image-left-fix", {
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
        },
        {
          scale: 1,
          borderRadius: "0",
          ease: "power1.inOut",
        },
        "<"
      );
    gsap.fromTo(
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
        scrollTrigger: {
          trigger: ".index-project-1",
          start: "25% center",
          markers: true,
          toggleActions: "play reverse play reverse",
        },
      }
    );
    // pinFirstProject.add(() => {
    //   //maybe you need to go to different values if it's going backwards...
    //   if (pinFirstProject.scrollTrigger?.direction === -1) {
    //     gsap.fromTo(
    //       ".index-project-title .line > span",
    //       {
    //         y: "100%",
    //         x: 75,
    //         skewX: 30,
    //       },
    //       {
    //         y: 0,
    //         x: 0,
    //         skewX: 0,
    //       }
    //     ); // forwards
    //   } else {
    //     gsap.fromTo(
    //       ".index-project-title .line > span",
    //       {
    //         y: 0,
    //         x: 0,
    //         skewX: 0,
    //       },
    //       {
    //         y: "100%",
    //         x: 75,
    //         skewX: 30,
    //       }
    //     ); // backwards
    //   }
    // });

    // .fromTo(
    //   ".index-project-title .line > span",
    //   {
    //     y: "100%",
    //     x: 75,
    //     skewX: 30,
    //   },
    //   {
    //     y: 0,
    //     x: 0,
    //     skewX: 0,
    //   },
    //   "<+=0.5"
    // );
    // .fromTo(
    //   ".index-project-title .line",
    //   { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
    //   {
    //     clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
    //     delay: 0.75,
    //     ease: "power2.inOut",
    //   },
    //   "<"
    // );
    pinSecondProject.set(".project-container-2", { yPercent: -100 });
    pinThirdProject.set(".project-container-3", { yPercent: -100 });

    // tl.fromTo(
    //   ".project-image-left",
    //   {
    //     scale: 0,
    //   },
    //   {
    //     scale: 1,
    //     duration: 1,
    //     stagger: 2,
    //   },
    //   "<+1"
    // )
    //   .fromTo(
    //     ".project-image-right",
    //     {
    //       scale: 0,
    //     },
    //     {
    //       scale: 1,
    //       duration: 1,
    //       stagger: 2,
    //     },
    //     "<"
    //   )
    //   .fromTo(
    //     ".index-project-title .line > span",
    //     {
    //       y: "100%",
    //       x: 75,
    //       skewX: 30,
    //     },
    //     {
    //       y: 0,
    //       x: 0,
    //       skewX: 0,
    //       duration: 1,
    //       delay: 0.5,
    //       ease: "power2.inOut",
    //       stagger: 0.15,
    //     },
    //     "<"
    //   )
    //   .fromTo(
    //     ".index-project-title .line",
    //     { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
    //     {
    //       clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
    //       duration: 1,
    //       ease: "power2.inOut",
    //     },
    //     "<"
    //   );
  }, []);

  return (
    <section className="overall-container relative">
      <div className="w-1/2 z-[11] fixed bottom-0 bg-[red]">
        <div className="project-image-left-fix absolute w-1/2 aspect-4/3 overflow-hidden bottom-8 right-4 rounded-md">
          <MediaImage
            src={projects[0].image1.src}
            alt={projects[0].image1.alt}
            type="image"
          />
        </div>
      </div>
      <div className="relative z-[5] w-screen h-screen flex flex-row pt-16 md:pt-20 lg:pt-24 pb-4 md:pb-6 lg:pb-8 items-end bg-surface-primary">
        {/* left */}
        <div className="w-full h-full flex justify-end items-end">
          {/* <div className="relative w-full h-fit flex flex-col gap-2">
            <p className="text-xs font-mono uppercase">Featured Project</p>
            <TransitionLink
              href="/projects/buildforce"
              className="move-this opacity-50"
            >
              <div className="relative w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744093117/buildforce-cover-01_1_jzzqeo.webp"
                  alt="Buildforce Time Tracking App"
                  type="image"
                />
              </div>
            </TransitionLink>
          </div> */}
        </div>

        {/* right */}
        <div className="w-full h-full bg-surface-primary flex flex-col">
          <div className="text-5xl relative pl-4 pr-8 h-full flex items-center">
            <h1 className="relative split-type-animation-hero">
              Through a decade of designing products, I&rsquo;ve honed skills in
              interaction design, motion, design systems, & prototyping.
              I&rsquo;m a builder at heart and I&rsquo;m always finding new ways
              to bring ideas to life. Now I&rsquo;m focusing on blending my
              design skills with code.
            </h1>
          </div>
          <div className="relative w-1/2 h-fit flex flex-col gap-2">
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
        {/* 

        <div className="col-span-1 lg:col-start-5 lg:col-span-4 flex flex-row gap-2 items-end">
          <div className="relative w-full h-fit flex flex-col gap-2">
            <p className="text-xs font-mono uppercase">Featured Project</p>
            <TransitionLink href="/projects/buildforce" className="move-this">
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
        </div> */}
      </div>

      <div className="index-projects relative w-screen">
        <div className="index-project-1 z-[4] bg-surface-primary relative w-full">
          <div className="project-container-1 group w-full h-screen relative flex flex-col justify-end items-center">
            <div className="project-content-1 px-4 md:px-8 mb-8 w-full grid grid-cols-12 gap-8 relative">
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
              className="cursor-animation relative flex w-full z-[10]"
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

        <div className="project-mask-2 z-[3] relative w-screen h-screen bg-[blue] flex items-end justify-center">
          <div className="project-container-2 group w-full h-full relative flex flex-col items-end justify-end">
            <div className="project-content-2 px-4 md:px-8 mb-8 w-full grid grid-cols-12 gap-8">
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
