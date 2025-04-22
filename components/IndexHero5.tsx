"use client";

import React, { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";
import MediaImage from "./MediaImage";
import { projects } from "@/data/indexProjectCovers";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const IndexHero5 = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap
      .timeline
      //   {
      //   scrollTrigger: {
      //     trigger: "",
      //     start: "top 90%",
      //     // markers: true,
      //     toggleActions: "play none none reverse",
      //   },
      // }
      ();

    tl.set(".project-container-1 ", {
      yPercent: -100,
    }).fromTo(
      ".index-hero-hover",
      {
        display: "none",
        opacity: 0,
      },
      {
        display: "block",
        opacity: 1,
      }
    );
  }, []);

  return (
    <section className="">
      <div className="relative opacity-50 z-[1] w-screen h-screen grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 lg:gap-8 p-4 md:p-6 lg:p-8 pt-16 md:pt-20 lg:pt-24 items-end bg-[yellow]">
        <div className="col-span-1 lg:col-span-6 lg:col-start-7 text-5xl relative">
          <h1 className="relative split-type-animation-hero">
            Through a decade of designing products, I&rsquo;ve honed skills in
            interaction design, motion, design systems, & prototyping. I&rsquo;m
            a builder at heart and I&rsquo;m always finding new ways to bring
            ideas to life. Now I&rsquo;m focusing on blending my design skills
            with code.
          </h1>
        </div>

        <div className="col-span-1 lg:col-start-5 lg:col-span-4 flex flex-row gap-2 items-end">
          <div className="relative w-full h-fit flex flex-col gap-2">
            <p className="text-xs font-mono uppercase">Featured Project</p>
            <TransitionLink href="/projects/buildforce">
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
            <p className="text-xs font-mono uppercase">Featured Prototype</p>
            <TransitionLink href="/projects/strava-growth">
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

      <div className="project-container-1 w-screen h-screen bg-[red]">
        <h1 className="text-12xl">HELLO</h1>
      </div>
    </section>
  );
};

export default IndexHero5;
