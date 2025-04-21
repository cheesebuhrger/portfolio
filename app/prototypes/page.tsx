"use client";

import React from "react";
import Link from "next/link";
import MediaImage from "@/components/MediaImage";

interface PrototypeProject {
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  url: string;
  tags: string[];
}

const projects: PrototypeProject[] = [
  {
    name: "Categorize",
    description:
      "A prototype exploring content organization and sorting interactions",
    image: {
      src: "/path/to/categorize-thumbnail.webp", // You'll need to add this image
      alt: "Categorize prototype thumbnail",
    },
    url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://categorize-icjn64d2c-buhrs-projects.vercel.app",
    tags: ["Vite", "React", "TypeScript"],
  },
  // Add more projects here as you create them
];

export default function Prototype() {
  return (
    <div className="min-h-screen bg-surface-background">
      <section className="p-4 pt-24 md:p-8 min-h-screen">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl mb-4">Prototypes</h1>
          <p className="text-base text-text-secondary max-w-xl">
            A collection of interactive prototypes exploring design patterns,
            interactions, and technical concepts.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              href={project.url}
              key={project.name}
              className="group hover:opacity-90 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9 mb-4">
                <MediaImage
                  type="image"
                  src={project.image.src}
                  alt={project.image.alt}
                />
              </div>
              <h2 className="text-2xl mb-2 group-hover:text-text-action">
                {project.name}
              </h2>
              <p className="text-text-secondary mb-4">{project.description}</p>
              <div className="flex gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono uppercase px-2 py-1 bg-surface-secondary rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
