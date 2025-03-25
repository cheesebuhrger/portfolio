import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  romanNumeral: string;
  image1: {
    src: string;
    alt: string;
    className?: string;
  };
  image2: {
    src: string;
    alt: string;
    className?: string;
  };
}

const ProjectCard = ({
  title,
  description,
  romanNumeral,
  image1,
  image2,
}: ProjectCardProps) => {
  return (
    <section className="relative project-card bg-surface-primary border-t border-border-primary">
      <div className="project-card-scrim absolute top-0 left-0 w-full h-full bg-[black] opacity-0 pointer-events-none" />
      <div className="relative project-card-content">
        <div className="project-card-header p-4 md:p-8 md:pt-16 grid grid-cols-12 gap-8 items-end">
          <p className="text-2xl font-serif text-text-primary col-span-2">
            {romanNumeral}
          </p>
          <h3 className="text-5xl font-serif col-span-6 text-balance">
            {title}
          </h3>
          <p className="text-sm col-start-9 col-span-4 flex flex-wrap gap-2">
            {description}
          </p>
        </div>

        <div className="project-card-media-container grid grid-cols-2 aspect-21/9">
          <div className="relative overflow-hidden">
            <Image
              src={image1.src}
              alt={image1.alt}
              fill
              className={`object-cover ${image2.className}`}
            />
          </div>
          <div className="relative overflow-hidden">
            <Image
              src={image2.src}
              alt={image2.alt}
              fill
              className={`object-cover ${image2.className}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectCard;
