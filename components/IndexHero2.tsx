"use client";

import React, { useState, useRef } from "react";
import Button from "./Button";

interface Project {
  id: number;
  imageUrl: string;
  backgroundColor: string;
  company: string;
  projectTitle: string;
  projectDescription: string;
  projectUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    imageUrl: "/images/project1.jpg",
    backgroundColor: "#FFDDC1",
    company: "Buildforce",
    projectTitle: "Time Tracking",
    projectDescription:
      "This is the time tracking app for Buildforce. It allows users to track their time spent on projects and tasks.",
    projectUrl: "/projects/buildforce",
  },
  {
    id: 2,
    imageUrl: "/images/project2.jpg",
    backgroundColor: "#CFFFCF",
    company: "Buildforce",
    projectTitle: "Buildforce Leadership",
    projectDescription:
      "How to build a leadership team that can help you scale your business.",
    projectUrl: "/projects/strava",
  },
  {
    id: 3,
    imageUrl: "/images/project3.jpg",
    backgroundColor: "#CFE2F3",
    company: "Strava",
    projectTitle: "Strava Growth",
    projectDescription: "Grow your Strava business by 10x in 10 months.",
    projectUrl: "/projects/strava-growth",
  },
  {
    id: 4,
    imageUrl: "/images/project4.jpg",
    backgroundColor: "#FECACA",
    company: "Strava",
    projectTitle: "Sport Picker",
    projectDescription:
      "Build a product that allows users to pick their favorite sports.",
    projectUrl: "/projects/strava-sport-picker",
  },
  {
    id: 5,
    imageUrl: "/images/project5.jpg",
    backgroundColor: "#FECACA",
    company: "Wheel",
    projectTitle: "Clinician App",
    projectDescription:
      "Product that allows clinicians to track their patients' progress.",
    projectUrl: "/projects/wheel",
  },
];

const IndexHero2 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollPosition = container.scrollTop;
    const itemHeight = container.clientHeight;
    const newIndex = Math.floor(scrollPosition / itemHeight);

    if (newIndex >= 0 && newIndex < projects.length) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToProject = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: containerRef.current.clientHeight * index,
      behavior: "smooth",
    });
  };

  const currentProject = projects[activeIndex];

  return (
    <section className="relative w-full h-screen overflow-hidden grid grid-cols-12 gap-8 items-center">
      {/* Project titles on the left */}
      <div className="col-span-4 flex flex-col gap-4 p-8 text-3xl font-serif">
        {projects.map((project, index) => (
          <button
            key={project.id}
            onClick={() => scrollToProject(index)}
            className={`text-left transition-all duration-300 ${
              activeIndex === index ? "text-text-action" : "text-text-secondary"
            }`}
          >
            {project.projectTitle}
          </button>
        ))}
      </div>

      {/* Scrollable project container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="col-span-4 h-screen overflow-y-scroll snap-y snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="h-screen snap-center flex items-center justify-center"
            style={{ background: project.backgroundColor }}
          >
            <div className="w-[500px] h-[500px]" />
          </div>
        ))}
      </div>

      {/* Fixed project details on the right */}
      <div className="col-span-4 flex flex-col items-start justify-center p-8">
        <p className="text-base leading-tight mb-16">
          @{currentProject.company} / 2021
        </p>
        <p className="text-base mb-16">{currentProject.projectDescription}</p>
        <Button label="View" href={currentProject.projectUrl} size="large" />
      </div>
    </section>
  );
};

export default IndexHero2;
