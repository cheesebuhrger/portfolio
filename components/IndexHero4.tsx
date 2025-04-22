"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import TransitionLink from "./TransitionLink";
import MediaImage from "./MediaImage";

const IndexHero4 = () => {
  return (
    <section className="w-screen h-screen">
      <div className="w-full h-full grid grid-cols-12 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 pt-16 md:pt-20 lg:pt-24 items-end">
        <h1 className="col-span-6 col-start-7 text-4xl split-type-animation">
          Through a decade of designing, I&rsquo;ve honed skills in interaction
          design, motion, design systems, & prototyping. I&rsquo;m a builder at
          heart and I&rsquo;m always finding new ways to bring ideas to life.
          Now I&rsquo;m blending my design skills with code.
        </h1>

        <div className="col-span-6 col-start-7 flex flex-row gap-2">
          <div className="relative w-full h-fit flex flex-col gap-2">
            <p className="text-xs font-mono uppercase">Featured Projects</p>
            <TransitionLink
              href="/projects/buildforce"
              className="cursor-animation"
              data-cursor-text="VIEW PROJECT"
            >
              <div className="relative w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744093117/buildforce-cover-01_1_jzzqeo.webp"
                  alt="Buildforce Time Tracking App"
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>

          <div className="relative w-full h-fit flex flex-col gap-2">
            <TransitionLink
              href="/projects/strava-growth"
              className="cursor-animation"
              data-cursor-text="VIEW PROTOTYPE"
            >
              <div className="relative w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-1_dwsdpv.webp"
                  alt="Buildforce Time Tracking App"
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>

          <div className="relative w-full h-fit flex flex-col gap-2">
            <p className="text-xs font-mono uppercase">Featured Prototype</p>
            <TransitionLink
              href="/projects/strava-growth"
              className="cursor-animation"
              data-cursor-text="VIEW PROTOTYPE"
            >
              <div className="relative w-full aspect-4/3 bg-surface-secondary rounded-md overflow-hidden">
                <MediaImage
                  src="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-1_dwsdpv.webp"
                  alt="Buildforce Time Tracking App"
                  type="image"
                />
              </div>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndexHero4;
