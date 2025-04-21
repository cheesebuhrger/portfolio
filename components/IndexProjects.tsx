import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import TransitionLink from "./TransitionLink";
import { projects, romanNumerals } from "@/data/indexProjectCovers";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import CursorDot from "./CursorDot";

gsap.registerPlugin(ScrollTrigger);

const IndexProjects = () => {
  const imageScaleRef = useImageScaleAnimation();

  return (
    <section className="">
      <CursorDot text="VIEW PROJECT" />
      {projects.map((project, index) => (
        <section
          key={index}
          className="relative project-card bg-surface-primary py-8 md:py-16 border-t border-border-primary md:border-none"
        >
          <div className="project-card-scrim absolute top-0 left-0 w-full h-full bg-[black] opacity-0 pointer-events-none" />
          <div className="group relative project-card-content">
            <div className="project-card-header px-4 md:px-8 mb-4 grid grid-cols-12 gap-8">
              <TransitionLink
                href={project.url}
                className="text-sm col-span-1 font-serif pt-2 uppercase group-hover:text-text-action transition-all duration-300"
              >
                {romanNumerals[index]}
              </TransitionLink>
              <TransitionLink
                href={project.url}
                className="cursor-animation ~text-2xl/6xl font-serif col-span-6 group-hover:text-text-action group-hover:underline transition-all duration-300"
                data-cursor-text="VIEW PROJECT"
              >
                {project.title}
              </TransitionLink>
              <TransitionLink
                href={project.url}
                className="text-lg col-start-10 col-span-3 pt-1 font-serif group-hover:text-text-action transition-all duration-300"
              >
                <p>{project.company}</p>
                <p>{project.year}</p>
              </TransitionLink>
            </div>

            <TransitionLink
              href={project.url}
              className="cursor-animation project-card-media-container grid grid-cols-2 aspect-21/9"
              data-cursor-text="VIEW PROJECT"
            >
              <div className="relative overflow-hidden bg-surface-secondary">
                <Image
                  src={project.image1.src}
                  alt={project.image1.alt}
                  fill
                  className="image-scale-animation object-cover"
                />
              </div>
              <div className="relative overflow-hidden bg-surface-secondary">
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
