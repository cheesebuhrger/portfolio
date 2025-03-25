"use client";

import React from "react";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import CursorDot from "@/components/CursorDot";
import ProjectHeroTest from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import Image from "next/image";
import { Tooltip } from "@/components/Tooltip";
import { Avatar } from "@/components/Avatar";
import { AvatarGroup } from "@/components/AvatarGroup";
import { BadgeGroup } from "@/components/BadgeGroup";

const Project1: React.FC = () => {
  useLenisScroll();

  return (
    <div>
      <ProjectHeroTest
        headline={
          <>
            <div className="">
              How I shaped design @Buildforce & improved collaboration
            </div>
          </>
        }
        role={
          <>
            <BadgeGroup
              badges={[
                "Mobile App",
                "IXD",
                "Prototyping",
                "Brand",
                "Design Systems",
                "Web App",
                "Management",
              ]}
            />
          </>
        }
        duration={<>1 year · 2023-2024</>}
        team={
          <>
            <AvatarGroup
              avatars={[
                {
                  src: "/images/bf-leadership/colin.webp",
                  alt: "Colin Harman",
                  primary: "Colin Harman",
                  secondary: "Staff Software Engineer",
                },
                {
                  src: "/images/bf-leadership/melysia.webp",
                  alt: "Melysia Cha",
                  primary: "Melysia Cha",
                  secondary: "Product Designer",
                },
              ]}
            />
          </>
        }
        image1={"/images/bf-leadership/bf-leadership-cover-1.webp"}
        alt1={"Buildforce Leadership"}
        image2={"/images/bf-leadership/bf-leadership-7.webp"}
        alt2={"Buildforce Leadership"}
        className="stack-animation"
      />

      <div className="flex gap-8 h-screen w-screen bg-[pink] items-center justify-center">
        <Avatar
          src="/images/bf-leadership/colin.webp"
          alt="Colin Harman"
          primary="Colin Harman"
          secondary="Staff Software Engineer"
        />

        <Avatar
          src="/images/bf-leadership/melysia.webp"
          alt="Melysia Cha"
          primary="Melysia Cha"
          secondary="Product Designer"
        />

        <Tooltip primary="Colin Harman" secondary="Staff Software Engineer">
          <Image
            src="/images/bf-leadership/melysia.webp"
            alt="Buildforce Leadership"
            width={100}
            height={100}
          />
        </Tooltip>

        <div className="cursor-animation relative w-32 h-32 border border-[red] rounded-[1000px] flex items-center justify-center">
          A
        </div>
        <div className="cursor-animation relative w-32 h-32 border border-[red] rounded-[1000px] flex items-center justify-center">
          B
        </div>
        <div className="cursor-animation relative w-32 h-32 border border-[red] rounded-[1000px] flex items-center justify-center">
          C
        </div>
        <CursorDot text="VIEW MORE" />
      </div>
    </div>
  );
};

export default Project1;
