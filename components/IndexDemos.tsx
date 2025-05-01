"use client";

import React, { useEffect, useRef } from "react";
import TransitionLink from "./TransitionLink";
import { demos } from "@/data/codeDemos";
import Button from "./Button";
import MediaImage from "./MediaImage";
import { Badge } from "./Badge";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useLenis } from "@studio-freight/react-lenis";
import Link from "next/link";

const IndexCodeProjects = () => {
  const lenis = useLenis();

  return (
    <section
      id="code"
      className="bg-surface-primary border-t border-border-primary relative grid grid-flow-row gap-32 px-4 pt-4 pb-32 md:gap-48 md:px-6 md:pt-6 md:pb-40 lg:px-8 lg:pt-8 lg:pb-48"
    >
      <h2 className="text-xs font-mono uppercase">Code</h2>

      <ul className="">
        {demos.map((demo) => (
          <li
            key={demo.title}
            className="py-4 md:py-6 lg:py-8 border-b border-border-primary"
          >
            <Link href={demo.url}>
              <div className="grid grid-cols-12 gap-4 md:gap-6 lg:gap-8">
                <h3 className="text-5xl font-serif col-span-6">{demo.title}</h3>
                <p className="text-5xl font-serif col-span-3">{demo.year}</p>
                <div className="col-span-3 flex flex-wrap gap-1">
                  {demo.technologies.map((technology) => (
                    <Badge key={technology} label={technology} />
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IndexCodeProjects;
