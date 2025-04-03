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
                Workers took control of their time entries while all parties
                spent less time correcting hours for payroll. Helped scale
                operations and reduce disputes.
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
                title: "Less edits made overall",
                value: "−42%",
                footnote: "~2,500 → ~1,450 edits/week",
              },
              {
                title: "Workers took more ownership of their time",
                value: "+15%",
                footnote: "35% to 50%",
              },
              null,
              {
                title:
                  "More time entries moved through without any intervention",
                value: "+20%",
                footnote: "55% to 75%",
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                To protect workers from costly mistakes, I designed a flow that
                made them slow down & review their time.
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
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743617221/buildforce-06_skkg7l.webp",
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
                Allowing workers to edit their time entries throughout the week
                had very little impact; they didn't do it.
              </>
            }
            body={
              <>
                <p className="mb-4">
                  Once the worker added their time entry, I designed a way for
                  them to view and edit them if they needed to make corrections.
                  We found that workers didn&apos;t edit their time after the
                  initial entry which could be tied to a few reasons:
                </p>
                <ul className="list-disc list-outside ml-4">
                  <li>
                    Workers know they entered correctly the first time which is
                    probably the most likely reason.
                  </li>
                  <li>
                    Time entries entry point is difficult to find and/or they
                    don't know they could edit them.
                  </li>
                  <li>
                    Workers still believe contractors are the source of truth
                    for time entries/hours.
                  </li>
                </ul>
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

          <ProjectSectionContent
            headline={
              <>
                I designed a way for contractors to get more visibility into
                worker clock-in & out locations but it's difficult to say if it
                impacted contractor editing behavior.
              </>
            }
            body={
              <>
                We saw contractors engaging with this data, but not sure if it
                kept them accountable from reporting inaccurate hours. We did
                see less edits to time entries from contractors, so it's
                possible it did have an impact, but difficult to attribute.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{
              type: "mockup",
              background: {
                image: "",
              },
            }}
            media={[
              {
                type: "image",
                src: "",
                alt: "Contractor onboarding for Buildforce web app",
                caption: <>This is a caption</>,
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                Workers got notified when contractors approved their time. They
                could see if edits were made and dispute inaccuracies. We
                anecdotally heard from our team that there were less disputes
                and disputes were easier to manage but I believe it was because
                of more accurate times being submitted by workers.
              </>
            }
            body={<>?</>}
          />

          <ProjectSectionMedia
            layout={{
              type: "mockup",
              background: {
                image: "",
              },
            }}
            media={[
              {
                type: "image",
                src: "",
                alt: "Contractor onboarding for Buildforce web app",
                caption: <>This is a caption</>,
              },
            ]}
          />
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
                If you'd like to learn more about the process, I'd be happy to
                chat.
              </>
            }
            body={
              <>
                Learn more about how these questions I answered:
                <ul className="list-disc list-outside ml-4">
                  <li>
                    What were our principles and how did we stay on the worker's
                    side?
                  </li>
                  <li>What challenges arose throughout the project?</li>
                  <li>How did did we move to the shape-up process?</li>
                  <li>
                    How did we tackle product education, comms and support?
                  </li>
                  <li>
                    How did we introduce a brand refresh alongside product work?
                  </li>
                </ul>
              </>
            }
          />
        </ProjectSection>

        <footer className="p-8 pt-40 bg-surface-primary border-t h-screen border-border-primary">
          Hello
        </footer>
      </div>
    </ReactLenis>
  );
};

export default Buildforce;
