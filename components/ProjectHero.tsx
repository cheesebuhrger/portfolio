import { ReactNode } from "react";
import Image from "next/image";
import { BadgeGroup } from "./BadgeGroup";
import { AvatarGroup } from "./AvatarGroup";
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";
import { AnimatedIcon } from "./icons";

interface ProjectHeroResults {
  title: string;
}

interface ProjectHeroProps {
  headline: ReactNode;
  company?: ReactNode;
  problem: string;
  solution: string;
  skills: string[];
  team:
    | ReactNode
    | {
        avatars: {
          src: string;
          alt: string;
          href?: string;
          primary?: string;
          secondary?: string;
        }[];
      };
  duration: {
    length: string;
    year: string;
  };
  images: {
    primary: {
      src: string;
      alt: string;
    };
    secondary: {
      src: string;
      alt: string;
    };
  };
  className?: string;
}

const problemIconSequence = [
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177227/problem-1_parbly.svg",
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177227/problem-2_lxidte.svg",
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177227/problem-3_vnjp3a.svg",
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177228/problem-4_zzod3m.svg",
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177228/problem-5_knoanl.svg",
];

const solutionIconSequence = [
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177813/solution-1_jj64ip.svg",
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177813/solution-2_x0ryne.svg",
  "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744177814/solution-3_vgzypm.svg",
];

// ---- RESULT COMPONENT ----
interface ProjectHeroResultsProps {
  title: string;
  index: number;
}

// ---- DATA COMPONENT ----

interface ProjectHeroDataWrapperProps {
  children: ReactNode;
  label: string;
  className?: string;
}

const ProjectHeroDataWrapper: React.FC<ProjectHeroDataWrapperProps> = ({
  children,
  label,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h3 className="~text-xl/2xl col-span-full">{label}</h3>
      <div className="~text-sm/base col-span-full">{children}</div>
    </div>
  );
};

const ProjectHero: React.FC<ProjectHeroProps> = ({
  headline,
  skills,
  team,
  duration,
  images,
  problem,
  solution,
  className,
}) => {
  useSplitTypeAnimation();
  return (
    <div
      id="introduction"
      className={`flex flex-col gap-y-12 md:gap-y-24 pb-24 md:pb-40 w-screen ${className}`}
    >
      <div className="flex flex-col gap-y-12 md:gap-y-24 pt-24 pb-4 md:pb-0 md:h-85 md:min-h-fit md:justify-end">
        <h1 className="split-type-animation-hero ~text-6xl/10xl px-4 md:px-6 lg:px-8 text-text-primary md:text-pretty">
          {headline}
        </h1>
        <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-6 lg:grid-cols-12 gap-12 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8">
          <div className="md:col-span-4 lg:col-span-8 xl:col-span-6 flex flex-col gap-2">
            <div className="flex flex-row border border-border-primary p-4 md:p-6 lg:p-8 font-serif-p ~text-xl/3xl-p rounded-md gap-4 md:gap-6 lg:gap-8">
              <div className="relative mt-1">
                <AnimatedIcon type="problem" />
              </div>
              <p>{problem}</p>
            </div>
            <div className="flex flex-row border border-border-primary p-4 md:p-6 lg:p-8 font-serif-p ~text-xl/3xl-p rounded-md gap-4 md:gap-6 lg:gap-8">
              <div className="relative mt-1">
                <AnimatedIcon type="solution" interval={250} />
              </div>
              <p>{solution}</p>
            </div>
          </div>
          <div className="md:col-start-5 md:col-span-2 lg:col-start-10 lg:col-span-3 flex flex-col gap-8 -mt-1">
            <ProjectHeroDataWrapper label="Role & Scope">
              <BadgeGroup badges={skills} />
            </ProjectHeroDataWrapper>

            <div className="flex flex-row md:flex-col gap-8">
              <ProjectHeroDataWrapper
                label="Duration"
                className="w-1/2 md:w-full"
              >
                <span className="~text-sm/base col-span-full">
                  {duration.length} · {duration.year}
                </span>
              </ProjectHeroDataWrapper>

              <ProjectHeroDataWrapper label="Team" className="w-1/2 md:w-full">
                {typeof team === "object" &&
                team !== null &&
                "avatars" in team ? (
                  <AvatarGroup avatars={team.avatars} />
                ) : (
                  <div className="~text-sm/base col-span-full pr-6">{team}</div>
                )}
              </ProjectHeroDataWrapper>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="relative overflow-hidden bg-surface-secondary w-full md:w-1/2 aspect-21/9-half">
          <Image
            src={images.primary.src}
            alt={images.primary.alt}
            fill
            className="image-scale-animation object-cover"
          />
        </div>
        <div className="relative overflow-hidden bg-surface-secondary w-full md:w-1/2 aspect-21/9-half hidden md:block">
          <Image
            src={images.secondary.src}
            alt={images.secondary.alt}
            fill
            className="image-scale-animation object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHero;
