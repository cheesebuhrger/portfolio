"use client";

import ProjectSection from "@/components/ProjectSection";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import Image from "next/image";
import React from "react";
import ProjectSectionMedia from "@/components/ProjectSectionMedia";

const Playground: React.FC = () => {
  // Initialize the animation hook
  useImageScaleAnimation();

  return (
    <div>
      {/* Spacing */}
      <section className="h-80" />

      <ProjectSection sectionLabel="Playground">
        {/* full - mockup-desktop - VIDEO */}
        <div>full - mockup-mobile - VIDEO</div>
        <div
          className="
          w-full
          rounded-md
          overflow-hidden
          lg:h-[calc(100vh-4rem)]
          bg-[url('https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-06-bg_y7lytz.webp')]
          bg-cover
          bg-center
          bg-no-repeat
        "
        >
          <div
            className="
            relative
            flex
            w-full
            h-full
            items-center
            justify-center
            p-4 py-20
            sm:p-8 sm:py-24
            md:p-12 md:py-24
          "
          >
            <video
              src="/images/wheel/TRH-6.1.mp4"
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="
                w-fit
                h-full
                object-contain
                image-scale-animation-subtle
              "
              aria-label="Full width media item"
            />
          </div>
        </div>

        <ProjectSectionMedia
          layout={{
            type: "mockup",
            background: {
              color:
                "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-06-bg_y7lytz.webp",
            },
          }}
          media={[
            {
              type: "video",
              src: "/images/wheel/TRH-6.1.mp4",
              alt: "Full width media item",
            },
          ]}
        />
      </ProjectSection>
    </div>
  );
};

export default Playground;
