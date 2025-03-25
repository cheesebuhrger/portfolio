import { ReactNode } from "react";
import Image from "next/image";

interface ProjectHeroProps {
  headline: ReactNode;
  company?: ReactNode;
  role: ReactNode;
  team: ReactNode;
  duration: ReactNode;
  image1: string;
  alt1: string;
  image2: string;
  alt2: string;
  className?: string;
}

const ProjectHeroAlt: React.FC<ProjectHeroProps> = ({
  headline,
  role,
  team,
  duration,
  image1,
  alt1,
  image2,
  alt2,
  className,
}) => {
  return (
    <div
      id="introduction"
      className={`flex flex-col gap-y-12 md:gap-y-24 pb-24 md:pb-40 w-screen ${className}`}
    >
      <div className="flex flex-col gap-y-12 md:gap-y-24 pt-24 pb-4 md:pb-0 md:h-85 md:justify-end">
        <h1 className="~text-6xl/10xl px-4 md:px-6 lg:px-8 text-text-primary">
          {headline}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-6 lg:gap-8 md:border-t md:border-border-primary pt-4 md:pt-6 lg:pt-8 px-4 md:px-6 lg:px-8">
          <div className="col-span-2 md:col-span-4 flex flex-col gap-4 md:gap-6">
            <h3 className="~text-xl/2xl col-span-full">My Role</h3>
            <p className="~text-sm/base col-span-4">{role}</p>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-7 flex flex-col gap-4 md:gap-6">
            <h3 className="~text-xl/2xl col-span-full">Team</h3>
            <div className="~text-sm/base col-span-full pr-6">{team}</div>
          </div>
          <div className="col-span-1 md:col-span-2 md:col-start-10 flex flex-col gap-4 md:gap-6">
            <h3 className="~text-xl/2xl col-span-full">Duration</h3>
            <div className="~text-sm/base col-span-full">{duration}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="relative overflow-hidden bg-surface-secondary w-full md:w-1/2 aspect-21/9-half">
          <Image
            src={image1}
            alt={alt1}
            fill
            className="image-scale-animation object-cover"
          />
        </div>
        <div className="relative overflow-hidden bg-surface-secondary w-full md:w-1/2 aspect-21/9-half hidden md:block">
          <Image
            src={image2}
            alt={alt2}
            fill
            className="image-scale-animation object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeroAlt;
