"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Media from "@/components/ui/Media";
import TransitionLink from "@/components/layout/TransitionLink";
import type { ProjectSummary } from "@/lib/content";
import type { Project } from "@/lib/types";
import { SITE } from "@/lib/seo";

interface EndProps {
  /** Full-bleed image above "The Nitty Gritty". */
  image: string;
  /** Five process questions, laid out alternating right/left bottom-up. */
  process: Project["end"]["process"];
  /** "Explore more" cards. */
  related: ProjectSummary[];
}

const PANELS = [1, 2, 3];
const CLIP_HIDDEN = "polygon(0 0, 100% 0, 100% 0, 0 0)";
const CLIP_SHOWN = "polygon(0 0, 100% 0, 100% 112%, 0 112%)";

const End = ({ process, image, related }: EndProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const processTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".panel-1-container",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      // Large text animations
      for (const n of PANELS) {
        gsap.set(`.panel-${n}`, { yPercent: -100 });
        gsap.to(`.panel-${n}`, {
          scrollTrigger: {
            trigger: `.panel-${n}-container`,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            pin: true,
          },
        });
      }

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
      gsap.utils.toArray<HTMLElement>(".process-item").forEach((item) => {
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

      const duration = 1;
      const ease = "power2.out";
      const skewDelay = 0.25;
      const tighten = ">-0.9";

      // Each item slides in from its side while its lines rise, un-skew and
      // unmask. Odd items (1, 3, 5) enter from the right, even ones from the left.
      for (let i = 0; i < process.length; i++) {
        const from = i % 2 === 0 ? 1 : -1;
        const item = `.process-item-${i + 1}`;
        processTimeline
          .fromTo(
            item,
            { xPercent: 100 * from },
            { xPercent: 0, ease, duration },
            i === 0 ? undefined : tighten,
          )
          .fromTo(
            `${item} .line-mask > .line`,
            { y: "100%", skewX: 30 * from },
            { y: 0, skewX: 0, duration, ease, delay: skewDelay },
            "<",
          )
          .fromTo(
            `${item} .line-mask`,
            { clipPath: CLIP_HIDDEN },
            { clipPath: CLIP_SHOWN, duration, ease },
            "<",
          );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef}>
      {/* Fixed background. clip-path (unlike overflow) also clips
          a fixed child, so the image shows only through this box: the look of
          background-attachment: fixed, which iOS Safari ignores. lvh, so the
          image doesn't re-crop as iOS toolbars collapse. */}
      <div className="z-10 relative w-full h-screen bg-surface-secondary [clip-path:inset(0)]">
        <div className="fixed inset-x-0 top-0 h-lvh">
          <Media
            type="image"
            src={image}
            alt=""
            unoptimized
            imageScaleAnimation="none"
          />
        </div>
      </div>

      <div className="pointer-events-none relative w-full overflow-hidden flex flex-col items-end pb-32 md:pb-40 lg:pb-48 bg-surface-primary-negative">
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
            <h2 className="process-fade ~text-6xl/13xl p-4 md:p-6 lg:p-8 text-text-primary-negative w-full text-center">
              The Nitty Gritty
            </h2>
          </div>
        </div>

        <div className="panel-2-container z-[2] relative w-full">
          <div className="panel-2 relative flex items-end justify-center gap-8 w-full bg-surface-primary-negative">
            <h2 className="~text-6xl/13xl text-text-primary-negative h-fit w-full p-4 md:p-6 lg:p-8 font-serif-italic text-center">
              Want the Details?
            </h2>
          </div>
        </div>

        <div className="pointer-events-none panel-3-container z-[1] relative w-full">
          <div className="panel-3 relative flex items-end justify-center p-4 md:p-6 lg:p-8 w-full h-full">
            <a
              href={SITE.profiles.linkedin}
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
