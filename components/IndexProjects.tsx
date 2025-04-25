import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";
import { useLenis } from "@studio-freight/react-lenis";
import { designProjects, romanNumerals } from "@/data/designProjects";

import Button from "./Button";
import MediaImage from "./MediaImage";
import TransitionLink from "./TransitionLink";

const IndexProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitTypeRef = useSplitTypeAnimation();
  const lenis = useLenis();

  const [mobileValues, setMobileValues] = React.useState({
    scale: 0.5,
    bottom: "2rem",
    right: "1rem",
    radius: "2rem",
  });

  useEffect(() => {
    const updateMobileValues = () => {
      const isMobile = window.innerWidth < 768;
      setMobileValues({
        scale: isMobile ? 0 : 0.5,
        bottom: isMobile ? "0" : "2rem",
        right: isMobile ? "0" : "1rem",
        radius: isMobile ? "0" : "2rem",
      });
    };

    updateMobileValues();
    window.addEventListener("resize", updateMobileValues);

    return () => {
      window.removeEventListener("resize", updateMobileValues);
    };
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
  }, []);

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
        trigger: ".index-project-1 .project-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to(".index-intro-out", {
      opacity: 0.1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".index-intro",
        start: "bottom 75%",
        end: "bottom top",
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
        trigger: ".index-project-1 .project-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    const pinSecondProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".index-project-2 .project-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    const pinThirdProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".index-project-3 .project-container",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    pinFirstProject
      .set(".index-project-1 .project-container", { yPercent: -100 })
      .fromTo(
        ".index-project-1 .project-image-left",
        {
          scale: mobileValues.scale,
          bottom: mobileValues.bottom,
          right: mobileValues.right,
          borderRadius: mobileValues.radius,
        },
        {
          scale: 1,
          bottom: 0,
          right: 0,
          borderRadius: 0,
          ease: "power1.inOut",
        }
      )
      .fromTo(
        ".index-project-1 .project-image-right",
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

    pinSecondProject
      .set(".index-project-2 .project-container", {
        yPercent: -100,
      })
      .fromTo(
        ".index-project-2 .project-image-left",
        {
          scale: 0,
        },
        {
          scale: 1,
        }
      )
      .fromTo(
        ".index-project-2 .project-image-right",
        {
          scale: 0,
        },
        {
          scale: 1,
        },
        "<"
      );

    pinThirdProject
      .set(".index-project-3 .project-container", {
        yPercent: -100,
      })
      .fromTo(
        ".index-project-3 .project-image-left",
        {
          scale: 0,
        },
        {
          scale: 1,
        }
      )
      .fromTo(
        ".index-project-3 .project-image-right",
        {
          scale: 0,
        },
        {
          scale: 1,
        },
        "<"
      );

    const textFirstProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".index-project-1",
        start: "25% center",
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

    const textSecondProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".index-project-2",
        start: "25% center",
        toggleActions: "play none none reverse",
      },
    });

    textSecondProject
      .fromTo(
        ".index-project-2 .index-project-title .line > span",
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
        ".index-project-2 .index-project-title .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          ease: "power2.out",
          duration: 1,
        },
        "<"
      )
      .fromTo(
        ".index-project-2 .index-project-meta",
        { opacity: 0.1 },
        {
          opacity: 1,
          ease: "power2.out",
          duration: 0.5,
        },
        "<"
      );

    const textThirdProject = gsap.timeline({
      scrollTrigger: {
        trigger: ".index-project-3",
        start: "25% center",
        toggleActions: "play none none reverse",
      },
    });

    textThirdProject
      .fromTo(
        ".index-project-3 .index-project-title .line > span",
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
        ".index-project-3 .index-project-title .line",
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          ease: "power2.out",
          duration: 1,
        },
        "<"
      )
      .fromTo(
        ".index-project-3 .index-project-meta",
        { opacity: 0.1 },
        {
          opacity: 1,
          ease: "power2.out",
          duration: 0.5,
        },
        "<"
      );

    gsap.to(".index-project-1 .project-container", {
      filter: "grayscale(100%)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".index-project-1",
        start: "bottom 75%",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".index-project-2 .project-container", {
      filter: "grayscale(100%)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".index-project-2",
        start: "bottom 75%",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".index-project-3 .project-container", {
      opacity: 0.1,
      filter: "grayscale(100%)",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".index-project-3",
        start: "bottom 75%",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="overall-container relative w-screen overflow-hidden">
      <div className="project-image-fix-container w-1/2 z-[10] fixed bottom-0 hidden">
        <div
          onClick={() => {
            lenis?.scrollTo("#projects", { duration: 2 });
          }}
          className="project-image-fix index-intro-in absolute w-1/2 aspect-4/3 overflow-hidden bottom-8 right-0 md:right-4 rounded-md cursor-pointer hidden md:block"
        >
          <MediaImage
            src={designProjects[0].image1.src}
            alt={designProjects[0].image1.alt}
            type="image"
            width={864.5}
            height={741}
          />
        </div>
      </div>
      <div className="index-intro relative z-[5] w-screen h-screen flex flex-col pt-16 md:pt-20 lg:pt-24 pb-32 md:pb-8 items-end bg-surface-primary border-b border-border-tertiary">
        <div className="index-intro-out relative p-4 md:p-6 lg:p-8 w-full h-full flex md:grid flex-col md:grid-cols-2 gap-8 md:gap-6 lg:gap-8 justify-center md:items-center">
          <h1 className="relative text-4xl split-type-animation-hero col-span-1 md:col-start-2 text-pretty">
            A builder at heart, I&rsquo;m always finding new ways to bring ideas
            to life. Through a decade of designing products, I&rsquo;ve honed
            skills in interaction design, motion, & prototyping. My current
            obsession is writing code to bridge design & dev.
          </h1>
          <div className="md:hidden flex flex-row gap-2">
            <Button
              onClick={() => {
                lenis?.scrollTo("#projects", { offset: -60, immediate: true });
              }}
              label="Go to Projects"
            />
            <Button
              onClick={() => {
                lenis?.scrollTo("#prototypes", {
                  offset: -60,
                  immediate: true,
                });
              }}
              label="Go to Prototypes"
            />
          </div>
        </div>
        <div className="index-intro-out w-full h-fit md:flex-row justify-end items-center hidden md:flex">
          {/* LEFT */}
          <div className="w-full h-full flex flex-col justify-end items-end">
            <div className="index-intro-in relative w-1/2 h-fit flex flex-col gap-2 right-0 md:right-4">
              <p className="text-xs font-mono uppercase">Featured Project</p>
              <div className="relative w-full aspect-4/3 rounded-md overflow-hidden"></div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full h-full flex flex-col justify-end">
            <div className="index-intro-in relative w-1/2 h-fit flex flex-col gap-2 left-2 md:left-3 lg:left-4">
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
                  width={864.5}
                  height={741}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="projects" className="index-projects relative w-screen">
        {/* PROJECT 1 */}
        <div className="index-project-1 z-[4] bg-surface-primary relative w-full">
          <div className="project-container h-fit lg:h-screen flex flex-col justify-between relative">
            <h2 className="text-xs font-mono uppercase p-4 md:p-6 lg:p-8 mb-32 lg:mb-0">
              Projects
            </h2>
            <div className="group w-full h-fit relative flex flex-col gap-4 md:gap-6 lg:gap-8">
              <div className="project-content px-4 md:px-6 lg:px-8 w-full flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 lg:gap-8 relative">
                <div className="index-project-meta text-sm md:col-span-1 font-serif pt-1 lg:pt-2 uppercase group-hover:text-text-action">
                  {romanNumerals[0]}
                </div>
                <TransitionLink
                  href={designProjects[0].url}
                  className="index-project-title cursor-animation ~text-4xl/6xl font-serif md:col-span-8 group-hover:text-text-action group-hover:underline text-pretty"
                  data-cursor-text="VIEW PROJECT"
                >
                  {designProjects[0].title}
                </TransitionLink>
                <div className="index-project-meta text-lg md:col-start-10 md:col-span-3 pt-1 font-serif group-hover:text-text-action">
                  <p>{designProjects[0].company}</p>
                  <p>{designProjects[0].year}</p>
                </div>
              </div>

              <TransitionLink
                href={designProjects[0].url}
                className="cursor-animation relative flex w-full"
                data-cursor-text="VIEW PROJECT"
              >
                <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                  <MediaImage
                    src={designProjects[0].image1.src}
                    alt={designProjects[0].image1.alt}
                    type="image"
                    width={864.5}
                    height={741}
                  />
                </div>
                <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-surface-secondary hidden md:block">
                  <MediaImage
                    src={designProjects[0].image2.src}
                    alt={designProjects[0].image2.alt}
                    type="image"
                    width={864.5}
                    height={741}
                  />
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* PROJECT 2 */}

        <div className="index-project-2 z-[3] bg-surface-primary relative w-full">
          <div className="project-container h-fit lg:h-screen flex flex-col justify-end items-end relative">
            <div className="group w-full h-fit relative flex flex-col gap-4 md:gap-6 lg:gap-8">
              <div className="project-content px-4 md:px-6 lg:px-8 mt-20 md:mt-24 w-full flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 lg:gap-8 relative">
                <div className="index-project-meta text-sm md:col-span-1 font-serif pt-1 lg:pt-2 uppercase group-hover:text-text-action">
                  {romanNumerals[1]}
                </div>
                <TransitionLink
                  href={designProjects[1].url}
                  className="index-project-title cursor-animation ~text-4xl/6xl font-serif md:col-span-8 group-hover:text-text-action group-hover:underline text-pretty"
                  data-cursor-text="VIEW PROJECT"
                >
                  {designProjects[1].title}
                </TransitionLink>
                <div className="index-project-meta text-lg md:col-start-10 md:col-span-3 pt-1 font-serif group-hover:text-text-action">
                  <p>{designProjects[1].company}</p>
                  <p>{designProjects[1].year}</p>
                </div>
              </div>

              <TransitionLink
                href={designProjects[1].url}
                className="cursor-animation relative flex w-full"
                data-cursor-text="VIEW PROJECT"
              >
                <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                  <MediaImage
                    src={designProjects[1].image1.src}
                    alt={designProjects[1].image1.alt}
                    type="image"
                    width={864.5}
                    height={741}
                  />
                </div>
                <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-surface-secondary hidden md:block">
                  <MediaImage
                    src={designProjects[1].image2.src}
                    alt={designProjects[1].image2.alt}
                    type="image"
                    width={864.5}
                    height={741}
                  />
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>

        {/* PROJECT 3 */}

        <div className="index-project-3 z-[2] bg-surface-primary relative w-full">
          <div className="project-container h-fit lg:h-screen flex flex-col justify-end items-end relative">
            <div className="group w-full h-fit relative flex flex-col gap-4 md:gap-6 lg:gap-8">
              <div className="project-content px-4 md:px-6 lg:px-8 mt-20 md:mt-24 w-full flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 lg:gap-8 relative">
                <div className="index-project-meta text-sm md:col-span-1 font-serif pt-1 lg:pt-2 uppercase group-hover:text-text-action">
                  {romanNumerals[2]}
                </div>
                <TransitionLink
                  href={designProjects[2].url}
                  className="index-project-title cursor-animation ~text-4xl/6xl font-serif md:col-span-8 group-hover:text-text-action group-hover:underline text-pretty"
                  data-cursor-text="VIEW PROJECT"
                >
                  {designProjects[2].title}
                </TransitionLink>
                <div className="index-project-meta text-lg md:col-start-10 md:col-span-3 pt-1 font-serif group-hover:text-text-action">
                  <p>{designProjects[2].company}</p>
                  <p>{designProjects[2].year}</p>
                </div>
              </div>

              <TransitionLink
                href={designProjects[2].url}
                className="cursor-animation relative flex w-full"
                data-cursor-text="VIEW PROJECT"
              >
                <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                  <MediaImage
                    src={designProjects[2].image1.src}
                    alt={designProjects[2].image1.alt}
                    type="image"
                    width={864.5}
                    height={741}
                  />
                </div>
                <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-surface-secondary hidden md:block">
                  <MediaImage
                    src={designProjects[2].image2.src}
                    alt={designProjects[2].image2.alt}
                    type="image"
                    width={864.5}
                    height={741}
                  />
                </div>
              </TransitionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexProjects;
