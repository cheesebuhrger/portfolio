"use client";

import React from "react";
import Logo from "../../../public/images/logos/logo-buildforce.svg";
import MediaStatsGrid from "@/components/MediaStatsGrid";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
// import { useAppearAnimation } from "@/hooks/useAppearAnimation";

const Project1: React.FC = () => {
  // const appearRef = useAppearAnimation();
  const imageScaleRef = useImageScaleAnimation();

  return (
    <div>
      <section
        id="introduction"
        className="grid grid-cols-1 gap-y-24 px-4 md:px-8 pb-40 w-screen;"
      >
        <div className="col-span-1 grid grid-cols-12 items-start gap-x-2 gap-y-24 h-85 auto-rows-max content-end">
          <h1 className="~text-5xl/10xl col-span-full">
            Helping Electricians
            <br />
            <span className="font-serif-italic">Get Paid Accurately</span>
          </h1>
          <div className="col-span-12 grid grid-cols-12 items-start gap-x-2 auto-rows-max border-t border-border-primary pt-8">
            <div className="col-span-8 grid grid-cols-8 gap-6">
              <h3 className="text-xl col-span-full">My Role</h3>
              {/* <div className="col-span-full border-b border-primary pb-4 flex items-center pr-8">
                <Image
                  src={Logo}
                  alt="Buildforce Logo"
                  width={28}
                  height={28}
                  className="mr-2"
                />
              </div> */}
              <p className="text-base col-span-4">
                Buildforce is a pre-seed construction startup with a temp job
                marketplace for electricians & subcontractors. I&apos;m most
                proud of cultivating an amazing team culture that was
                functionally increasing in craft, collaboration, and growth.
              </p>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <h3 className="text-xl col-span-full">Team</h3>
              <div className="text-base col-span-full pr-6">
                <ul>
                  <li>7 Engineers</li>
                  <li>Product Designer</li>
                  <li>CPO</li>
                  <li>VP of Eng</li>
                </ul>
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <h3 className="text-xl col-span-full">Duration</h3>
              <div className="text-base col-span-full">
                <ul>
                  <li>1 year</li>
                  <li>2023-2024</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <MediaStatsGrid
          layout={{ type: "full" }}
          media={[
            {
              type: "image",
              src: "/images/bf/bf-2.webp",
              alt: "Contractor onboarding for Buildforce web app",
            },
          ]}
        />
      </section>

      {/* ---- Outcomes 1 ---- */}
      <section
        id="outcomes"
        className="relative px-4 md:px-8 py-40 grid grid-flow-row gap-48"
      >
        <MediaStatsGrid
          layout={{
            type: "stats",
            statsPosition: "left",
          }}
          media={[
            {
              type: "image",
              src: "/images/bf/bf-1.webp",
              alt: "Worker time recording on Trades app in construction scene",
            },
          ]}
          stats={[
            {
              title: <>Metric</>,
              value: "431",
            },
            {
              title: <>Metric</>,
              value: "431",
            },
            null,
            {
              title: (
                <>
                  <span className="font-serif-italic">Less time</span>{" "}
                  correcting hours by contractors & workers
                </>
              ),
              value: "50%",
              footnote: "*Approximate amount per week",
            },
          ]}
        />

        <div className="col-span-full grid grid-cols-12 gap-8">
          <div className="col-start-7 col-span-6">
            <p className="~text-base/lg-p font-sans">
              Time tracking was the most complex with lots of technical
              constraints and the first with the new process. Lots of pivoting
              and opened a lot of new opportunities for future roadmap items
              like moving from time sheets to individual time entries.
            </p>
          </div>
        </div>

        <div id="case-image-grid" className="grid grid-flow-row gap-8">
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-2.webp",
                alt: "Contractor onboarding for Buildforce web app",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-3.webp",
                alt: "Worker profile for Buildforce web app in construction scene",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-5.webp",
                alt: "Worker time submission flow for Buildforce web app",
              },
            ]}
          />
        </div>
      </section>

      {/* ---- Outcomes 2 ---- */}
      <section
        id="outcomes"
        className="relative px-4 md:px-8 py-40 grid grid-flow-row gap-48"
      >
        <MediaStatsGrid
          layout={{
            type: "stats",
            statsPosition: "right",
          }}
          media={[
            {
              type: "video",
              src: "/images/bf/bf-6.webm",
              alt: "??",
              autoPlay: true,
              loop: true,
              muted: true,
              controls: false,
            },
          ]}
          stats={[
            null,
            {
              title: <>Structure to projects and process changes, time saved</>,
              value: "431",
            },
            {
              title: <>Design system formalized</>,
              value: "10+",
              footnote: "Pull requests sumbitted",
            },
            null,
          ]}
        />

        <div className="col-span-full grid grid-cols-12 gap-8">
          <div className="col-span-6">
            <p className="~text-base/lg-p font-sans">
              Time tracking was the most complex with lots of technical
              constraints and the first with the new process. Lots of pivoting
              and opened a lot of new opportunities for future roadmap items
              like moving from time sheets to individual time entries.
            </p>
          </div>
        </div>

        <div id="case-image-grid" className="grid grid-flow-row gap-8">
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-7.webp",
                alt: "Moodboard for Buildforce brand",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "double" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-8.webp",
                alt: "??",
              },
              {
                type: "image",
                src: "/images/bf/bf-4.webp",
                alt: "Spot compoisitions Buildforce brand",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-10.webp",
                alt: "??",
              },
            ]}
          />
        </div>
      </section>

      {/* ---- Outcomes 3 ---- */}
      <section
        id="outcomes"
        className="relative px-4 md:px-8 py-40 grid grid-flow-row gap-48"
      >
        <MediaStatsGrid
          layout={{
            type: "stats",
            statsPosition: "left",
          }}
          stats={[
            null,
            {
              title: <>Clarity over product design role at buildforce</>,
              value: "0 to 1",
            },
            {
              title: <>Design crits include eng</>,
              value: "188",
            },
            null,
          ]}
          media={[
            {
              type: "video",
              src: "/images/bf/bf-11.webm",
              alt: "??",
              autoPlay: true,
              loop: true,
              muted: true,
              controls: false,
            },
          ]}
        />

        <div className="col-span-full grid grid-cols-12 gap-8">
          <div className="col-start-7 col-span-6">
            <p className="~text-base/lg-p font-sans">
              Time tracking was the most complex with lots of technical
              constraints and the first with the new process. Lots of pivoting
              and opened a lot of new opportunities for future roadmap items
              like moving from time sheets to individual time entries.
            </p>
          </div>
        </div>

        <div id="case-image-grid" className="grid grid-flow-row gap-8">
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-12.webp",
                alt: "??",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "double" }}
            media={[
              {
                type: "image",
                src: "/images/bf/bf-13.webp",
                alt: "??",
              },
              {
                type: "image",
                src: "/images/bf/bf-14.webp",
                alt: "??",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};

export default Project1;
