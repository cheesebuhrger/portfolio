"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import type { TeamMember } from "@/lib/types";
import { BadgeGroup } from "@/components/BadgeGroup";
import { AvatarGroup } from "@/components/AvatarGroup";
import { AnimatedIcon } from "@/components/icons";
import SplitReveal from "@/components/motion/SplitReveal";
import { useScaleReveal } from "@/components/motion/useScaleReveal";
import { StackScrim, useStack } from "@/components/motion/stack";

interface HeroProps {
  headline: ReactNode;
  problem: string;
  solution: string;
  skills: string[];
  team: TeamMember[];
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
  /** Pin and fade under the next section as it scrolls over. */
  stack?: boolean;
}

// ---- DATA COMPONENT ----

interface HeroDetailProps {
  children: ReactNode;
  label: string;
  className?: string;
}

const HeroDetail: React.FC<HeroDetailProps> = ({
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

const Hero: React.FC<HeroProps> = ({
  headline,
  skills,
  team,
  duration,
  images,
  problem,
  solution,
  className = "",
  stack = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const primaryImageRef = useRef<HTMLImageElement>(null);
  const secondaryImageRef = useRef<HTMLImageElement>(null);
  useStack(ref, stack);
  useScaleReveal(primaryImageRef);
  useScaleReveal(secondaryImageRef);

  return (
    <div
      ref={ref}
      id="introduction"
      className={`flex flex-col gap-y-12 md:gap-y-24 pb-24 md:pb-40 w-screen ${className}`}
    >
      <div className="flex flex-col gap-y-12 md:gap-y-24 pt-24 pb-4 md:pb-0 md:h-85 md:min-h-fit md:justify-end">
        <SplitReveal
          as="h1"
          variant="hero"
          className="~text-6xl/10xl px-4 md:px-6 lg:px-8 text-text-primary md:text-pretty"
        >
          {headline}
        </SplitReveal>
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
            <HeroDetail label="Role & Scope">
              <BadgeGroup badges={skills} />
            </HeroDetail>

            <div className="flex flex-row md:flex-col gap-8">
              <HeroDetail
                label="Duration"
                className="w-1/2 md:w-full"
              >
                <span className="~text-sm/base col-span-full">
                  {duration.length} · {duration.year}
                </span>
              </HeroDetail>

              <HeroDetail label="Team" className="w-1/2 md:w-full">
                <AvatarGroup
                  avatars={team.map((member) => ({
                    src: member.image,
                    alt: member.name,
                    href: member.href,
                    primary: member.name,
                    secondary: member.role,
                  }))}
                />
              </HeroDetail>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="relative overflow-hidden bg-surface-secondary w-full md:w-1/2 aspect-21/9-half">
          <Image
            ref={primaryImageRef}
            src={images.primary.src}
            alt={images.primary.alt}
            fill
            loading="eager"
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden bg-surface-secondary w-full md:w-1/2 aspect-21/9-half hidden md:block">
          <Image
            ref={secondaryImageRef}
            src={images.secondary.src}
            alt={images.secondary.alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
      {stack && <StackScrim />}
    </div>
  );
};

export default Hero;
