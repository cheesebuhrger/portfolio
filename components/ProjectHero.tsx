import { ReactNode } from "react";
import Image from "next/image";
import { BadgeGroup } from "./BadgeGroup";
import { AvatarGroup } from "./AvatarGroup";

interface ProjectHeroResults {
  title: string;
}

interface ProjectHeroProps {
  headline: ReactNode;
  company?: ReactNode;
  results: ProjectHeroResults[];
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

// ---- RESULT COMPONENT ----
interface ProjectHeroResultsProps {
  title: string;
  index: number;
}

const ProjectHeroResults: React.FC<ProjectHeroResultsProps> = ({
  title,
  index,
}) => {
  const letter = String.fromCharCode(65 + index); // 65 is ASCII for 'A'
  return (
    <div className="flex flex-row border border-border-primary p-8 font-serif-p ~text-2xl/3xl rounded-md gap-8">
      <span className="font-mono text-xs uspanpercase mt-1 lg:mt-[3px]">
        {letter}
      </span>
      <p>{title}</p>
    </div>
  );
};

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
  results,
  className,
}) => {
  return (
    <div
      id="introduction"
      className={`flex flex-col gap-y-12 md:gap-y-24 pb-24 md:pb-40 w-screen ${className}`}
    >
      <div className="flex flex-col gap-y-12 md:gap-y-24 pt-24 pb-4 md:pb-0 md:h-85 md:justify-end">
        <h1 className="~text-6xl-p/9xl-p px-4 md:px-6 lg:px-8 text-text-primary text-balance">
          {headline}
        </h1>
        <div className="grid grid-flow-row md:grid-flow-col md:grid-cols-6 lg:grid-cols-12 gap-12 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8">
          <div className="md:col-span-4 lg:col-span-8 xl:col-span-6 flex flex-col gap-2">
            {results.map((result, index) => (
              <ProjectHeroResults
                key={index}
                title={result.title}
                index={index}
              />
            ))}
          </div>
          <div className="md:col-start-5 md:col-span-2 lg:col-start-10 lg:col-span-3 flex flex-col gap-8 -mt-1">
            <ProjectHeroDataWrapper label="Skills">
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
