"use client";

import React from "react";
import { ReactLenis } from "@studio-freight/react-lenis";
import CursorDot from "@/components/CursorDot";
import ProjectHero from "@/components/ProjectHero";
import ProjectSection from "@/components/ProjectSection";
import { designProjects } from "@/data/designProjects";
import ProjectSectionContent from "@/components/ProjectSectionContent";
import ProjectEnd from "@/components/ProjectEnd";
import ProjectSectionMedia from "@/components/ProjectSectionMedia";
import ProjectSectionMediaBinder from "@/components/ProjectSectionMediaBinder";

import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";

const Project3: React.FC = () => {
  useImageScaleAnimation();
  useStackAnimation();
  useSplitTypeAnimation();

  return (
    <ReactLenis root>
      <div>
        <CursorDot />
        <ProjectHero
          headline={designProjects[2].title}
          problem={designProjects[2].problem}
          solution={designProjects[2].solution}
          skills={[
            "!Senior Product Designer",
            "!Growth Design",
            "Data Analysis",
            "Hypothesis Driven Design",
            "Marcomm Design",
            "Mobile App",
            "Multi-variant Experiments",
            "Research",
            "Web App",
            "Ideation Workshop",
          ]}
          duration={{
            length: designProjects[2].duration,
            year: designProjects[2].year,
          }}
          team={{
            avatars: [
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745850731/strava_voveuq.webp",
                alt: "Strava",
                href: "https://www.linkedin.com/company/strava-inc./",
                primary: "Strava",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852355/allison-boyd_nuiq0t.webp",
                alt: "Allison Boyd",
                href: "https://www.linkedin.com/in/allison-boyd9/",
                primary: "Allison Boyd",
                secondary: "Senior PMM",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852356/andros-slowley_yxs5wq.webp",
                alt: "Andros Slowley",
                href: "https://www.linkedin.com/in/androsslowley/",
                primary: "Andros Slowley",
                secondary: "Senior iOS Engineer",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852356/faraz_znjezr.webp",
                alt: "Faraz Mohamed Rafi",
                href: "https://www.linkedin.com/in/greybeard1123/",
                primary: "Faraz Mohamed Rafi",
                secondary: "Senior Software Engineer",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852357/ripal-sanghani_cleanup_uwlpth.webp",
                alt: "Rip Sanghani",
                href: "https://www.linkedin.com/in/ripalsanghani/",
                primary: "Rip Sanghani",
                secondary: "Senior Product Manager",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852356/sarah-kelman_zdgpmb.webp",
                alt: "Sarah Kelman",
                href: "https://www.linkedin.com/in/sarahkelman/",
                primary: "Sarah Kelman",
                secondary: "Senior Product Researcher",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745852357/tanyu-yuba_d7qywp.webp",
                alt: "Tanyu Yuba",
                href: "https://www.linkedin.com/in/tanyuyuba/",
                primary: "Tanyu Yuba",
                secondary: "Senior Product Analyst",
              },
            ],
          }}
          images={{
            primary: {
              src: designProjects[2].image1.src,
              alt: designProjects[2].image1.alt,
            },
            secondary: {
              src: designProjects[2].image2.src,
              alt: designProjects[2].image2.alt,
            },
          }}
          className="stack-animation"
        />
        <ProjectSection
          sectionNumber="I"
          sectionLabel="Outcomes & Design Samples"
          className="stack-animation"
          iconType="solution"
        >
          <ProjectSectionContent
            headline={
              <>
                We fixed the experiment backlog to solve real problems, grew
                subscriptions, and didn&rsquo;t wreck the product doing it.
              </>
            }
            body={
              <>
                As the first designer on a newly established subscription growth
                team, I helped shift our approach by reverse engineering backlog
                ideas into human problems, collaborating with research to run
                ideation sessions along the athlete journey. Alongside building
                smarter growth experiments, I also made sure our work respected
                the overall product, working within an existing design system
                and partnering with designers to form new patterns. My
                contributions helped drive ~$6.3M in annual subscription growth
                revenue.
              </>
            }
          />
          <ProjectSectionMedia
            layout={{ type: "stats", statsPosition: "left" }}
            media={[
              {
                type: "image",
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745879439/strava-growth-01_mc03zg.webp",
                alt: "Growth experiment on registration in Strava app detailing when subscriber free trial and when payment is required",
              },
            ]}
            stats={[
              null,
              {
                title: <>Est. annual booking impact</>,
                value: "$6.3M",
                direction: "up",
              },
              {
                title: <>Subscription starts</>,
                value: "~90k",
                direction: "up",
              },
              null,
            ]}
          />

          <ProjectSectionMediaBinder>
            <ProjectSectionMedia
              layout={{ type: "double" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745888194/strava-growth-02_ogyywo.webp",
                  alt: "Monthly or annual subscription rate selection in bottom sheet",
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745887485/strava-growth-03_xjtc4t.webp",
                  alt: "Page showcasing different types of trail routes on Strava web for SEO",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745887483/strava-growth-04_ldtsl6.webp",
                  alt: "Various strava subscription UI cards with different features that are being upsold",
                },
              ]}
            />
          </ProjectSectionMediaBinder>
        </ProjectSection>
        <ProjectEnd
          image="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745864060/strava-growth-fs_phk3vq.webp"
          process={{
            item1: "What were my most successful experiments?",
            item2: "Which experiments were failures & learning opportunities?",
            item3: "How did I work with developers?",
            item4: "What came from the team ideation workshop?",
            item5: "How did I reverse-engineer our backlog of ideas?",
          }}
          project={{
            name: designProjects[2].title,
            type: "image",
            src: designProjects[2].image1.src,
            alt: designProjects[2].image1.alt,
            url: designProjects[2].url,
          }}
          prototype={{
            name: designProjects[0].title,
            type: "image",
            src: designProjects[0].image1.src,
            alt: designProjects[0].image1.alt,
            url: designProjects[0].url,
          }}
        />
      </div>
    </ReactLenis>
  );
};

export default Project3;
