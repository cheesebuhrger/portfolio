import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { projects, romanNumerals } from "@/data/indexProjectCovers";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import TransitionLink from "./TransitionLink";

gsap.registerPlugin(ScrollTrigger);

const IndexProjects = () => {
  const time = 2;
  const imageScaleRef = useImageScaleAnimation();

  useGSAP(() => {
    // // const projectsHeight = gsap.utils.
    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".cards",
    //     start: "top top",
    //     end: `${window.innerHeight * 3} center`,
    //     scrub: true,
    //     pin: true,
    //     markers: true,
    //   },
    // });
    // // Dynamically set z-index values for all project cards and scrims
    // const cards = gsap.utils.toArray<HTMLElement>(".project-card");
    // cards.forEach((card, index) => {
    //   const scrim = card.querySelector(".project-card-scrim");
    //   tl.set(
    //     card,
    //     {
    //       zIndex: index * 2 + 1,
    //     },
    //     "<"
    //   ).set(
    //     scrim,
    //     {
    //       zIndex: index * 2 + 2,
    //     },
    //     "<"
    //   );
    // });
    // // Add animations to the timeline
    // tl.from(".project-card:not(:first-child)", {
    //   y: window.innerHeight,
    //   duration: time,
    //   stagger: time,
    // });
    // tl.to(
    //   ".project-card:not(:last-of-type) .project-card-content",
    //   {
    //     scale: 0.9,
    //     stagger: time,
    //     duration: time,
    //   },
    //   "<"
    // );
    // tl.to(
    //   ".project-card:not(:last-of-type) .project-card-scrim",
    //   {
    //     opacity: 0.5,
    //     stagger: time,
    //     duration: time,
    //   },
    //   "<"
    // );
    // tl.from(
    //   ".project-card .project-card-media-1",
    //   {
    //     scale: 1.1,
    //     stagger: time,
    //     duration: time,
    //   },
    //   "<"
    // );
    // tl.from(
    //   ".project-card .project-card-media-2",
    //   {
    //     scale: 1.1,
    //     stagger: time,
    //     duration: time,
    //   },
    //   "<"
    // );
    // // Separate timeline for media images
    // const mediaElements = document.querySelectorAll(".image-scale-animation");
    // mediaElements.forEach((element) => {
    //   gsap.from(element, {
    //     scale: 1.2,
    //     duration: 2,
    //     scrollTrigger: {
    //       trigger: element,
    //       scrub: true,
    //       markers: true,
    //     },
    //   });
    // });
  });

  return (
    <section className="">
      {projects.map((project, index) => (
        <section
          key={index}
          className="relative project-card bg-surface-primary py-8 md:py-24 border-t border-border-primary md:border-none"
        >
          <div className="project-card-scrim absolute top-0 left-0 w-full h-full bg-[black] opacity-0 pointer-events-none" />
          <div className="relative project-card-content">
            <div className="project-card-header px-4 md:px-8 mb-4 md:mb-8 grid grid-cols-12 gap-8 items-end">
              <p className="text-sm col-span-1">{romanNumerals[index]}</p>
              <TransitionLink
                href={project.url}
                className="text-5xl font-serif col-span-6 text-balance"
              >
                {project.title}
              </TransitionLink>
              <div className="text-sm col-start-10 col-span-3">
                <p>{project.company}</p>
                <p>{project.year}</p>
              </div>
            </div>

            <TransitionLink
              href={project.url}
              className="project-card-media-container grid grid-cols-2 aspect-21/9"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image1.src}
                  alt={project.image1.alt}
                  fill
                  className="image-scale-animation object-cover"
                />
              </div>
              <div className="relative overflow-hidden">
                <Image
                  src={project.image2.src}
                  alt={project.image2.alt}
                  fill
                  className="image-scale-animation object-cover"
                />
              </div>
            </TransitionLink>
          </div>
        </section>
      ))}
    </section>
  );
};

export default IndexProjects;
