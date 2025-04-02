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

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import SplitType from "split-type";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Buildforce: React.FC = () => {
  const imageScaleRef = useImageScaleAnimation();
  const stackRef = useStackAnimation();

  return (
    <ReactLenis root>
      <div>
        <ProjectHero
          headline={<>Helping electricians get paid accurately</>}
          results={[
            {
              title:
                "Less time spent on reconciliation internall = tighter window for payroll and less editing",
            },
            {
              title:
                "Decreased disputes = workers ultimately get paid accurately and on time",
            },
            {
              title:
                "Less edits made by contractors = more accurate time tracking",
            },
          ]}
          skills={[
            "Data Analysis",
            "Design Systems",
            "Interaction Design",
            "Mobile App",
            "Prototyping",
            "Research",
            "Visual Design",
            "Web App",
          ]}
          duration={{
            length: "6 weeks",
            year: "2024",
          }}
          team={{
            avatars: [
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/colin_xmpff3.webp",
                alt: "Colin Harman",
                href: "https://www.linkedin.com/in/colinharman/",
                primary: "Colin Harman",
                secondary: "Staff Software Engineer",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/lillian_mgwjau.webp",
                alt: "Lillian Situ",
                href: "https://www.linkedin.com/in/situlillian/",
                primary: "Lillian Situ",
                secondary: "Senior Software Engineer",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/mark_cw3uig.webp",
                alt: "Mark Di Marco",
                href: "https://www.linkedin.com/in/markdimarco/",
                primary: "Mark Di Marco",
                secondary: "VP Eng",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/michaelh_skijai.webp",
                alt: "Michael Harman",
                href: "https://www.linkedin.com/in/michael-harman-1a330220a/",
                primary: "Michael Harman",
                secondary: "Software Engineer",
              },
            ],
          }}
          images={{
            primary: {
              src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183529/buildforce-leadership-08_pnhrc4.webp",
              alt: "Buildforce Leadership",
            },
            secondary: {
              src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743185810/buildforce-cover-02_i4bhke.webp",
              alt: "Buildforce Leadership",
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
                At the time, around ~120 workers on the field on a given day
                across portfolio of contractors. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor
                sit amet consectetur adipisicing elit.
              </>
            }
            body={
              <>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
                  src: "",
                  alt: "rotating gif of gmail example and client platforms to show how similar everything looks",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "",
                  alt: "Email to partner platform flow diagram",
                },
              ]}
            />
          </ProjectSectionMediaBinder>

          <ProjectSectionContent
            headline={
              <>
                Need to communicate complexity of the flow, perhaps it's all the
                moving pieces that make it complex.
              </>
            }
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
                Itaque natus ut. Consequatur error odio sapiente ut laboriosam
                nihil esse et. Libero alias quis ex vitae eius corrupti nihil
                libero. Vel quia eos. Porro sunt accusantium. Quas quo est et
                nisi omnis cum.
              </>
            }
            body={
              <>
                Eum ut officia eum. Dicta quo est aut aut ut fugit
                exercitationem hic. Quod voluptatum odio est ipsa aut vel. Ut
                officia illum quibusdam ab est alias. Voluptas voluptas est.
                Accusamus non architecto. Delectus natus debitis deleniti et rem
                et et. Sed soluta qui odit ea eos laborum aut aut. Incidunt
                omnis error quia dolorum ab officia non quidem sint. Praesentium
                ut ad voluptatem ducimus accusantium aut eius consequatur ea.
                Eaque quia voluptas qui similique excepturi debitis aut soluta
                dolorem. Sit aut laborum quo aut.
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
                src: "",
                alt: "Animated flow of time tracking for Buildforce worker app",
              },
            ]}
            stats={[
              {
                title: "Workers actively corrected time before submitting",
                value: "4 hrs",
              },
              {
                title:
                  "More time entries moved through without any intervention",
                value: "17%",
              },
              {
                title:
                  "Workers still aren’t engaging with time edits later in the week",
                value: "-44 s",
              },
              {
                title:
                  "Contractor and ops edits dropped, meaning fewer last-minute disputes",
                value: "-44 s",
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                More workers were actively involved in correcting their time
                entries before submission, leading to higher-quality data and
                fewer errors down the line.
              </>
            }
            body={
              <>
                Eum ut officia eum. Dicta quo est aut aut ut fugit
                exercitationem hic. Quod voluptatum odio est ipsa aut vel. Ut
                officia illum quibusdam ab est alias. Voluptas voluptas est.
                Accusamus non architecto.
              </>
            }
          />

          <ProjectSectionMediaBinder>
            <ProjectSectionMedia
              layout={{
                type: "mockup",
                background: {
                  image:
                    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-11-bg_rcrm7o.webp",
                },
              }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743576112/buildforce-06_wlbyrv.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: <>This is a caption</>,
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
                  caption: <></>,
                },
                {
                  type: "image",
                  src: "",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: <></>,
                },
              ]}
            />
          </ProjectSectionMediaBinder>

          <ProjectSectionContent
            headline={
              <>
                Time entry view & confirmation resulted in a few more edits but
                not by much. Don&apos;t have the data on when the edits are
                made.
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
              layout={{
                type: "mockup",
                background: {
                  image:
                    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743573561/buildforce-07-bg_h3loqy.webp",
                },
              }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743576113/buildforce-07_r99kby.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: <>This is a caption</>,
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
                  src: "",
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

export default Buildforce;
