"use client";

import React from "react";
import { useRef } from "react";

import ProjectSectionMedia from "@/components/ProjectSectionMedia";
import ProjectSectionContent from "@/components/ProjectSectionContent";
import ProjectSection from "@/components/ProjectSection";
import ProjectHero from "@/components/ProjectHero";
import Quote from "@/components/Quote";
import Button from "@/components/Button";
import ProjectSectionMediaBinder from "@/components/ProjectSectionMediaBinder";
import ProjectEnd from "@/components/ProjectEnd";
import { designProjects } from "@/data/designProjects";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import SplitType from "split-type";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Wheel: React.FC = () => {
  const imageScaleRef = useImageScaleAnimation();
  const stackRef = useStackAnimation();

  return (
    <ReactLenis root>
      <div>
        <ProjectHero
          headline={designProjects[3].title}
          problem={designProjects[3].problem}
          solution={designProjects[3].solution}
          skills={[
            "Design Systems",
            "IA",
            "Interaction Design",
            "Mobile App",
            "Motion",
            "Prototyping",
            "Research",
            "Usability Testing",
            "Visual Design",
            "Web App",
          ]}
          duration={{
            length: designProjects[3].duration,
            year: designProjects[3].year,
          }}
          team={{
            avatars: [
              {
                src: "/images/avatars/danh.webp",
                alt: "Dan Hunter",
                href: "https://www.linkedin.com/in/danphunter/",
                primary: "Dan Hunter",
                secondary: "Senior Software Engineer",
              },
              {
                src: "/images/avatars/dustind.webp",
                alt: "Dustin Downing",
                href: "https://www.linkedin.com/in/dustin-downing-272576ba/",
                primary: "Dustin Downing",
                secondary: "Senior Software Engineer",
              },
              {
                src: "/images/avatars/philj.webp",
                alt: "Philip Johnson",
                href: "https://www.linkedin.com/in/philipljohnson/",
                primary: "Philip Johnson",
                secondary: "CPO",
              },
              {
                src: "/images/avatars/zackg.webp",
                alt: "Zack Green",
                href: "https://www.linkedin.com/in/zackdovgreen/",
                primary: "Zack Green",
                secondary: "Head of Operations",
              },
            ],
          }}
          images={{
            primary: {
              src: designProjects[3].image1.src,
              alt: designProjects[3].image1.alt,
            },
            secondary: {
              src: designProjects[3].image2.src,
              alt: designProjects[3].image2.alt,
            },
          }}
          className="stack-animation"
        />

        {/* ---- PROBLEM ---- */}
        <ProjectSection
          sectionNumber="I"
          sectionLabel="Problem"
          className="stack-animation"
        >
          <ProjectSectionContent
            headline={
              <>
                Clinicians used email to know what patients they were assigned
                to, needed to context switch and learn many different platforms
              </>
            }
            body={
              <>
                lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Quisquam, quos.
              </>
            }
          />

          <ProjectSectionMediaBinder>
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873250/wheel-cover-1_uamqg1.webp",
                  alt: "rotating gif of gmail example and client platforms to show how similar everything looks",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743013996/wheel-03_xlk30w.webp",
                  alt: "Email to partner platform flow diagram",
                },
              ]}
            />
          </ProjectSectionMediaBinder>

          <ProjectSectionContent
            headline={<>No product and little data</>}
            body={
              <>
                Design systems challenges with typography hierarchy,
                inconsistent iconography, color contrast issues. Also, design
                didn&apos;t really have a &ldquo;voice&rdquo; where decisions
                were questioned and brushed off. I didn&apos;t understand why
                that was happening in the beginning but it turns out,
                articulating decisions and putting enough rigor to know if
                you&apos;re doing the right thing wasn&apos;t apart of the deign
                process at the time.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{ type: "double" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-0.webp",
                alt: "Worker profile for Buildforce web app in construction scene",
              },
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-0.webp",
                alt: "Spot compoisitions Buildforce brand",
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                The core problems clinicians were experiencing were discovered
                through foundational research
              </>
            }
            body={
              <>
                Time tracking was the most complex with lots of technical
                constraints and the first with the new process. Lots of pivoting
                and opened a lot of new opportunities for future roadmap items
                like moving from time sheets to individual time entries.
              </>
            }
          />
          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <div className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col">
              <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
                Clinicians could go{" "}
                <span className="text-text-action">
                  days or weeks without talking to someone
                </span>{" "}
                from Wheel
              </p>
            </div>
            <div className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col">
              <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
                Clinicians have extremely{" "}
                <span className="text-text-action">
                  low expectations of software
                </span>
              </p>
            </div>
            <div className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col">
              <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
                Clinicians feel{" "}
                <span className="text-text-action">
                  burnt out and unappreciated
                </span>
                , which is why they turned to telemedicine
              </p>
            </div>
            <div className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col">
              <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
                Clinicians{" "}
                <span className="text-text-action">
                  lack trust from not getting paid
                </span>{" "}
                from previous telemedicine companies
              </p>
            </div>
          </div>
        </ProjectSection>

        {/* ---- OUTCOMES ---- */}
        <ProjectSection
          sectionNumber="II"
          sectionLabel="Final Design & Outcomes"
          className="stack-animation"
        >
          <ProjectSectionContent
            headline={
              <>
                Improved processes & accountability for results. This is the
                second sentance to illustrate the length. This is the third line
                to illustrate the length.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{
              type: "stats",
              statsPosition: "left",
            }}
            media={[
              {
                type: "image",
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743014081/wheel-04_ntsraj.webp",
                alt: "Wheel web app in mockup with hand",
              },
            ]}
            stats={[
              {
                title: "Time saved by ops per week",
                value: "4 hrs",
              },
              {
                title: "First assignment completions",
                value: "17%",
              },
              null,
              {
                title: "Average visit completion time",
                value: "-44 s",
              },
            ]}
          />

          <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
            <Quote
              writer={{
                name: "A.P.",
                role: "Physician",
              }}
              content={{
                snippet: (
                  <>
                    I never thought I&apos;d work for a company that actually
                    listened to their providers.
                  </>
                ),
              }}
            />

            <Quote
              writer={{
                name: "M.N.",
                role: "Nurse Practitioner",
              }}
              content={{
                snippet: (
                  <>
                    Love the new portal! It&apos;s so simple and clean. I can
                    finally see my earnings!!!
                  </>
                ),
              }}
            />

            <Quote
              writer={{
                name: "B.H.",
                role: "Nurse Practitioner",
              }}
              content={{
                snippet: (
                  <>
                    Can I make a confession? I wake up at 2-3 in the morning and
                    do [assignments].
                  </>
                ),
              }}
            />
          </div>

          <ProjectSectionMediaBinder>
            <ProjectSectionMedia
              layout={{ type: "double" }}
              media={[
                {
                  type: "image",
                  src: "",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: (
                    <>
                      A Clear Path Forward. The next patient is in plain view,
                      reducing the number of clinicians&apos; pathways to
                      achieve their goal. Their saved mental resources can focus
                      on making the correct assessment and crafting a thoughtful
                      care plan for patients.
                    </>
                  ),
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-06-bg_y7lytz.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: (
                    <>
                      An Efficient Way to Work. After clinicians have completed
                      their visit, they can move onto their next patient with a
                      single action, dramatically improving their workflow
                      efficiency and reducing wait times for patients in the
                      queue.
                    </>
                  ),
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "double" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-07-bg_geqvos.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: (
                    <>
                      A Moment of Reassurance. Clinicians can count on accurate
                      earnings. It&apos;s immediately apparent that the patients
                      they&apos;ve seen while on client platforms have been
                      recorded and marked as complete.
                    </>
                  ),
                },
                {
                  type: "image",
                  src: "",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: (
                    <>
                      A Flexible Way to Work. Clinicians can call it a day by
                      going offline. No more assignments. No more notifications.
                      Just family time.
                    </>
                  ),
                },
              ]}
            />
          </ProjectSectionMediaBinder>

          <ProjectSectionContent
            headline={
              <>
                The lower time to complete a consult was a huge selling point to
                sign new clients.
              </>
            }
            body={
              <>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quos.
              </>
            }
          />

          <ProjectSectionMediaBinder>
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743022531/wheel-09_czlvi3.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: (
                    <>
                      A Clear Path Forward. The next patient is in plain view,
                      reducing the number of clinicians&apos; pathways to
                      achieve their goal. Their saved mental resources can focus
                      on making the correct assessment and crafting a thoughtful
                      care plan for patients.
                    </>
                  ),
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "double" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-05-bg_akhsv5.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                },
                {
                  type: "image",
                  src: "",
                  alt: "Contractor onboarding for Buildforce web app",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "double" }}
              media={[
                {
                  type: "image",
                  src: "",
                  alt: "Contractor onboarding for Buildforce web app",
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743015415/wheel-08-bg_ajqwcj.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                },
              ]}
            />
          </ProjectSectionMediaBinder>
        </ProjectSection>

        {/* ---- PROCESS ---- */}
        <ProjectSection
          sectionNumber="III"
          sectionLabel="Process"
          // className="stack-animation"
        >
          <ProjectSectionContent
            headline={
              <>
                One-on-one conversations with teammates and building trust is
                just as important as product work.
              </>
            }
            body={
              <>
                I approached everyone individually, genuinely trying to
                understand their painpoints and what they wanted in an ideal
                team.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{ type: "double" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-0.webp",
                alt: "Worker profile for Buildforce web app in construction scene",
              },
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-0.webp",
                alt: "Spot compoisitions Buildforce brand",
              },
            ]}
          />

          <ProjectSectionContent
            body={
              <>
                Time tracking was the most complex with lots of technical
                constraints and the first with the new process. Lots of pivoting
                and opened a lot of new opportunities for future roadmap items
                like moving from time sheets to individual time entries.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-0.webp",
                alt: "Contractor onboarding for Buildforce web app",
              },
            ]}
          />
        </ProjectSection>

        <footer className="p-8 pt-40 bg-surface-primary border-t border-border-primary">
          Hello
        </footer>
      </div>
    </ReactLenis>
  );
};

export default Wheel;
