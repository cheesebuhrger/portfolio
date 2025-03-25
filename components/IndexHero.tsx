"use client";

import React, { useState } from "react";
import Button from "./Button";
import ProjectSection from "./ProjectSection";

interface Project {
  id: number;
  imageUrl: string;
  backgroundColor: string;
  company: string;
  projectTitle: string;
  projectUrl: string; // Add case study URL to Project interface
}

const projects: Project[] = [
  {
    id: 1,
    imageUrl: "/images/project1.jpg",
    backgroundColor: "#FFDDC1",
    company: "Buildforce",
    projectTitle: "Improving Marketplace Efficiency",
    projectUrl: "/projects/buildforce",
  },
  {
    id: 2,
    imageUrl: "/images/project2.jpg",
    backgroundColor: "#CFFFCF",
    company: "Strava Growth",
    projectTitle: "Case Study 2",
    projectUrl: "/projects/strava",
  },
  {
    id: 3,
    imageUrl: "/images/project3.jpg",
    backgroundColor: "#CFE2F3",
    company: "Strava",
    projectTitle: "Case Study 3",
    projectUrl: "/projects/strava-growth",
  },
  {
    id: 4,
    imageUrl: "/images/project4.jpg",
    backgroundColor: "#FECACA",
    company: "Wheel",
    projectTitle: "Case Study 4",
    projectUrl: "/projects/wheel",
  },
];

const IndexHero: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number>(
    projects[0].id
  );

  const handleHover = (id: number) => {
    setSelectedProject(id);
  };

  const currentProject = projects.find(
    (project) => project.id === selectedProject
  );

  return (
    <section
      id="case-studies"
      className="relative w-full h-[95vh] overflow-hidden"
    >
      {/* Full container for the project cover */}
      <div
        className="absolute p-16 inset-0 bg-cover bg-center flex items-center justify-center flex-col transition-all duration-700 delay-300 ease-in-out"
        style={{ backgroundColor: currentProject?.backgroundColor }} // Use color from the selected project
      >
        {/* Project title centered over the image */}
        <h1 className="text-8xl text-center leading-tight mb-16">
          {currentProject?.projectTitle}
        </h1>

        {/* Button to open project case study */}
        {currentProject?.projectUrl && (
          <Button
            label="View"
            href={currentProject?.projectUrl} // Link to the case study
            size="large"
          />
        )}
      </div>

      {/* List of projects for switching, with focus styling */}
      <div className="absolute bottom-16 left-16 transform flex flex-col">
        <ProjectSection
          sectionLabel="Case Studies"
          className="h-10 flex items-center"
        />
        {projects.map((project) => (
          <div
            key={project.id}
            className={`cursor-pointer text-base h-10 rounded flex items-center transition-all duration-300 ease-in-out ${
              selectedProject === project.id
                ? "text-text-action"
                : "text-text-primary"
            }`}
            onMouseEnter={() => handleHover(project.id)}
            style={{
              position: "relative",
            }}
          >
            <div
              className={`relative bg-surface-action transform transition-all duration-300 ease-in-out ${
                selectedProject === project.id ? "w-16 mr-2" : "w-0"
              }`}
              style={{
                height: "1px", // Adjust height as needed
              }}
            />
            {project.company}
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndexHero;
