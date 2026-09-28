"use client";

import { useRef } from "react";
import { useLenis } from "lenis/react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import type { ProjectSummary } from "@/lib/content";
import Button from "@/components/ui/Button";
import Media from "@/components/ui/Media";
import SplitReveal from "@/components/motion/SplitReveal";
import TransitionLink from "@/components/layout/TransitionLink";

type FeaturedProjectsProps = { projects: ProjectSummary[] };

const IMAGE_SIZE = { width: 864.5, height: 741 };
const TITLE_HIDDEN = { y: "100%", x: 75, skewX: 30 };
const CLIP_CLOSED = "polygon(0 0, 100% 0, 100% 0, 0 0)";
const CLIP_OPEN = "polygon(0 0, 100% 0, 100% 112%, 0 112%)";

/**
 * Homepage intro + stacked project showcase.
 *
 * The intro and the projects share one timeline: the floating preview in the
 * intro grows into the first project's image as you scroll. Each project
 * container is pinned (without spacing) so the next one slides over it.
 *
 * Animations target elements by class within this component only (scoped
 * with useGSAP). Breakpoints and reduced motion go through gsap.matchMedia,
 * which rebuilds everything when either changes.
 */
export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const ref = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const [first, second] = projects;

  const scrollTo = (target: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo(target, { duration: 2 });
  };

  useGSAP(
    () => {
      // Scoped to this section: matchMedia doesn't inherit useGSAP's scope.
      const mm = gsap.matchMedia(ref);

      mm.add(
        {
          // matchMedia only runs the setup when at least one condition
          // matches, so the two breakpoints cover every viewport.
          isMobile: "(max-width: 767px)",
          isDesktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions as {
            isMobile: boolean;
            reduceMotion: boolean;
          };
          const motion = !reduceMotion;
          const projectEls = gsap.utils.toArray<HTMLElement>("[data-project]");
          const firstEl = projectEls[0];
          const lastIndex = projectEls.length - 1;

          // Project titles: .line-mask (clip-path reveal) > .line (slides up).
          if (motion) {
            gsap.utils.toArray<HTMLElement>(".index-project-title").forEach((title) => {
              const split = SplitText.create(title, {
                type: "lines",
                mask: "lines",
                linesClass: "line",
              });
              // The animated clip-path masks instead of SplitText's overflow: clip.
              gsap.set(split.masks, { overflow: "visible" });
              gsap.set(split.lines, { display: "block", ...TITLE_HIDDEN });
            });

            gsap.set(".index-intro-in", { opacity: 0 });
            gsap.fromTo(
              ".index-intro-in",
              { yPercent: 5, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 1, delay: 1, ease: "power2.out" },
            );
          }

          // Floating preview: hidden once the first project is half on screen.
          if (firstEl) gsap.fromTo(
            ".project-image-fix-container",
            { display: "block" },
            {
              display: "none",
              duration: 0.01,
              scrollTrigger: {
                trigger: firstEl,
                start: "center bottom",
                toggleActions: "play none none reverse",
              },
            },
          );

          if (motion && firstEl) {
            gsap.to(".project-image-fix", {
              scale: 2,
              bottom: "0",
              right: "0",
              borderRadius: "0",
              ease: "power1.inOut",
              scrollTrigger: {
                trigger: firstEl.querySelector(".project-container"),
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
              },
            });
          }

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
          gsap.set(".project-image-right", { transformOrigin: "bottom left" });
          if (firstEl) gsap.set(".project-image-fix-container", { display: "block" });

          // Order matters: ScrollTrigger positions depend on creation order,
          // so create every pin first, then the title reveals, then the fades.

          // 1. Pin each project so the next one slides over it; images grow in.
          projectEls.forEach((el, i) => {
            const container = el.querySelector(".project-container");
            const left = el.querySelector(".project-image-left");
            const right = el.querySelector(".project-image-right");

            const tl = gsap
              .timeline({
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom bottom",
                  scrub: true,
                  pin: true,
                  pinSpacing: false,
                },
              })
              .set(container, { yPercent: -100 });

            if (!motion) return;

            if (i === 0) {
              // Grows out of the floating preview (desktop) or from nothing (mobile).
              tl.fromTo(
                left,
                isMobile
                  ? { scale: 0, bottom: "0", right: "0", borderRadius: "0" }
                  : { scale: 0.5, bottom: "2rem", right: "1rem", borderRadius: "2rem" },
                { scale: 1, bottom: 0, right: 0, borderRadius: 0, ease: "power1.inOut" },
              ).fromTo(
                right,
                { scale: 0, borderRadius: "2rem", left: "1rem" },
                { scale: 1, borderRadius: "0", ease: "power1.inOut", left: 0 },
                "<",
              );
            } else {
              tl.fromTo(left, { scale: 0 }, { scale: 1 }).fromTo(
                right,
                { scale: 0 },
                { scale: 1 },
                "<",
              );
            }
          });

          // 2. Title and meta reveal as each project arrives.
          if (motion) {
            projectEls.forEach((el) => {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: el,
                    start: "25% center",
                    toggleActions: "play none none reverse",
                  },
                })
                .fromTo(
                  el.querySelectorAll(".index-project-title .line-mask > .line"),
                  { ...TITLE_HIDDEN },
                  { y: 0, x: 0, skewX: 0, ease: "power2.out", duration: 1 },
                )
                .fromTo(
                  el.querySelectorAll(".index-project-title .line-mask"),
                  { clipPath: CLIP_CLOSED },
                  { clipPath: CLIP_OPEN, ease: "power2.out", duration: 1 },
                  "<",
                )
                .fromTo(
                  el.querySelectorAll(".index-project-meta"),
                  { opacity: 0.1 },
                  { opacity: 1, ease: "power2.out", duration: 0.5 },
                  "<",
                );
            });
          }

          // 3. Each project fades to greyscale as the next covers it; the last
          //    one also fades out into the Playground.
          projectEls.forEach((el, i) => {
            gsap.to(el.querySelector(".project-container"), {
              ...(i === lastIndex && { opacity: 0.1 }),
              filter: "grayscale(100%)",
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: el,
                start: "bottom 75%",
                end: "bottom top",
                scrub: true,
              },
            });
          });
        },
      );

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="overall-container relative w-screen overflow-hidden"
    >
      {first && (
        <div className="project-image-fix-container w-1/2 z-[10] fixed bottom-0 hidden">
          <a
            href="#projects"
            onClick={scrollTo("#projects")}
            aria-label="Scroll to projects"
            className="project-image-fix index-intro-in absolute w-1/2 aspect-4/3 overflow-hidden bottom-8 right-0 md:right-4 rounded-md cursor-pointer hidden md:block"
          >
            <Media
              src={first.cover.primary.src}
              alt={first.cover.primary.alt}
              type="image"
              imageScaleAnimation="none"
              {...IMAGE_SIZE}
            />
          </a>
        </div>
      )}

      <div className="index-intro relative z-[5] w-screen h-screen flex flex-col pt-16 md:pt-20 lg:pt-24 pb-32 md:pb-8 items-end bg-surface-primary border-b border-border-tertiary">
        <div className="index-intro-out relative p-4 md:p-6 lg:p-8 w-full h-full flex md:grid flex-col md:grid-cols-2 gap-8 md:gap-6 lg:gap-8 justify-center md:items-center">
          <SplitReveal
            as="h1"
            variant="hero"
            className="relative text-4xl col-span-1 md:col-start-2 text-pretty"
          >
            I&apos;m a builder at heart. For the past decade I&apos;ve designed
            products across interaction, motion, and prototyping, and these days
            I build them too, taking work from concept to production front-end.
            I sweat the small details that make something feel well-crafted.
          </SplitReveal>
          <div className="md:hidden flex flex-row gap-2">
            <Button
              onClick={() => {
                lenis?.scrollTo("#projects", { offset: -60, immediate: true });
              }}
              label="Go to Projects"
            />
          </div>
        </div>
        <div className="index-intro-out w-full h-fit md:flex-row justify-end items-center hidden md:flex">
          {/* LEFT: slot the floating preview sits over */}
          <div className="w-full h-full flex flex-col justify-end items-end">
            <div className="index-intro-in relative w-1/2 h-fit flex flex-col gap-2 right-0 md:right-4">
              <p className="text-xs font-mono uppercase">Featured Project</p>
              <div className="relative w-full aspect-4/3 rounded-md overflow-hidden"></div>
            </div>
          </div>

          {/* RIGHT: jumps to the second project */}
          {second && (
            <div className="w-full h-full flex flex-col justify-end">
              <div className="index-intro-in relative w-1/2 h-fit flex flex-col gap-2 left-2 md:left-3 lg:left-4">
                <a
                  href="#project-2"
                  onClick={scrollTo("#project-2")}
                  aria-label={`Scroll to ${second.title}`}
                  className="relative block w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden cursor-pointer"
                >
                  <Media
                    src={second.cover.secondary.src}
                    alt={second.cover.secondary.alt}
                    type="image"
                    imageScaleAnimation="none"
                    {...IMAGE_SIZE}
                  />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <div id="projects" className="index-projects relative w-screen">
        {projects.map((project, i) => {
          const isFirst = i === 0;
          return (
            <div
              key={project.slug}
              id={`project-${i + 1}`}
              data-project
              className="bg-surface-primary relative w-full"
              // Earlier projects stack above later ones while pinned.
              style={{ zIndex: projects.length + 1 - i }}
            >
              <div
                className={
                  isFirst
                    ? "project-container h-fit lg:h-screen flex flex-col justify-between relative"
                    : "project-container h-fit lg:h-screen flex flex-col justify-end items-end relative"
                }
              >
                {isFirst && (
                  <h2 className="text-xs font-mono uppercase p-4 md:p-6 lg:p-8 mb-32 lg:mb-0">
                    Projects
                  </h2>
                )}
                <div className="group w-full h-fit relative flex flex-col gap-4 md:gap-6 lg:gap-8">
                  <div
                    className={
                      isFirst
                        ? "project-content px-4 md:px-6 lg:px-8 w-full flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 lg:gap-8 relative"
                        : "project-content px-4 md:px-6 lg:px-8 mt-20 md:mt-24 w-full flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-6 lg:gap-8 relative"
                    }
                  >
                    <div className="index-project-meta text-sm md:col-span-1 font-serif pt-1 lg:pt-2 uppercase group-hover:text-text-action">
                      {project.year}
                    </div>
                    <TransitionLink
                      href={project.href}
                      className="index-project-title cursor-animation ~text-4xl/6xl font-serif md:col-span-8 group-hover:text-text-action group-hover:underline text-pretty"
                      data-cursor-text="VIEW PROJECT"
                    >
                      {project.title}
                    </TransitionLink>
                    <div className="index-project-meta text-lg md:col-start-10 md:col-span-3 pt-1 font-serif group-hover:text-text-action">
                      <p>{project.role}</p>
                      <p>{project.company}</p>
                    </div>
                  </div>

                  <TransitionLink
                    href={project.href}
                    className="cursor-animation relative flex w-full"
                    data-cursor-text="VIEW PROJECT"
                  >
                    <div className="project-image-left relative w-full aspect-4/3 overflow-hidden bg-surface-secondary">
                      <Media
                        src={project.cover.primary.src}
                        alt={project.cover.primary.alt}
                        type="image"
                        imageScaleAnimation="none"
                        {...IMAGE_SIZE}
                      />
                    </div>
                    <div className="project-image-right relative w-full aspect-4/3 overflow-hidden bg-surface-secondary hidden md:block">
                      <Media
                        src={project.cover.secondary.src}
                        alt={project.cover.secondary.alt}
                        type="image"
                        imageScaleAnimation="none"
                        {...IMAGE_SIZE}
                      />
                    </div>
                  </TransitionLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
