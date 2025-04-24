"use client";

import React from "react";
import { useRef } from "react";

import ProjectSectionMedia from "@/components/ProjectSectionMedia";
import ProjectSectionContent from "@/components/ProjectSectionContent";
import ProjectSection from "@/components/ProjectSection";
import ProjectHero from "@/components/ProjectHero";
import ProjectSectionMediaBinder from "@/components/ProjectSectionMediaBinder";
import ProjectEnd from "@/components/ProjectEnd";
import { projects } from "@/data/projects";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";

import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Buildforce: React.FC = () => {
  const imageScaleRef = useImageScaleAnimation();
  const stackRef = useStackAnimation();

  useGSAP(() => {
    gsap.to(".closer-image-pin", {
      scrollTrigger: {
        trigger: ".closer-image-pin",
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
        // markers: true,
        pin: true,
      },
    });
  });

  return (
    <ReactLenis root>
      <div>
        <ProjectHero
          headline={projects[0].title}
          problem={projects[0].problem}
          solution={projects[0].solution}
          skills={[
            "!Staff Product Designer",
            "!Iterative Design",
            "Data Analysis",
            "Design Systems",
            "Interaction Design",
            "Mobile App",
            "Research",
            "Visual Design",
            "Web App",
          ]}
          duration={{
            length: projects[0].duration,
            year: projects[0].year,
          }}
          team={{
            avatars: [
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744064454/bf_dmmhfv.webp",
                alt: "Buildforce",
                href: "https://www.linkedin.com/company/buildforce/",
                primary: "Buildforce",
              },
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
              src: projects[0].image1.src,
              alt: projects[0].image1.alt,
            },
            secondary: {
              src: projects[0].image2.src,
              alt: projects[0].image2.alt,
            },
          }}
          className="stack-animation"
        />

        {/* ---- OUTCOMES ---- */}
        <ProjectSection
          sectionNumber="I"
          sectionLabel="Final Design & Outcomes"
          className="stack-animation"
          iconType="solution"
        >
          <ProjectSectionContent
            headline={
              <>
                Workers fixed their own time, contractors edited less, and ops
                finally didn&rsquo;t have to spend half their week supporting
                payroll.
              </>
            }
            body={
              <>
                <p>
                  Once we released time tracking v2, everyone did less but in
                  the best way. Workers made more accurate submissions up front,
                  contractors barely had to touch them because they aligned with
                  their own logs, and our ops team didn&rsquo;t have to mediate
                  every payroll cycle. The time tracking system stopped being a
                  problem that needed constant fixing. It wasn&rsquo;t perfect,
                  but it was going to help us scale the business.
                </p>
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
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744091995/buildforce-05_hajxhw.webp",
                alt: "Time tracking for Buildforce worker app",
              },
            ]}
            stats={[
              {
                title: "Less edits made by all parties",
                value: "42%",
                footnote: "~2,500 → ~1,450 edits/wk",
                direction: "down",
              },
              {
                title: "Workers corrected their own time",
                value: "15%",
                footnote: "~35% to ~50%",
                direction: "up",
              },
              {
                title: "Contractors/ops had to fix less",
                value: "21%",
                footnote: "~45% to ~24%",
                direction: "down",
              },
              {
                title: "More time approved without intervention",
                value: "20%",
                footnote: "~55% to ~75%",
                direction: "up",
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                I redesigned the time entry flow to show workers exactly what
                the contractor sees. It made workers pause and think.
              </>
            }
            body={
              <>
                The new flow added a summary screen that showed workers their
                exact clock-in and clock-out locations on a map just like the
                contractor would see it. This made mistakes more obvious and
                accountability more real. We also added automatic rounding to
                the nearest 15 minutes and snapped unusually long shifts to the
                project schedule, so payroll ops didn&rsquo;t have to clean up
                the mess later. What workers saw matched what was sent to
                contractors. That small shift in visibility and friction made a
                huuuge difference.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{
              type: "mockup",
              background: {
                color: "bg-[#BEB39E]",
              },
            }}
            media={[
              {
                type: "image",
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744060079/buildforce-06_x1tmoq.webp",
                alt: "Electrician clock-out flow in the Buildforce web app",
                caption: (
                  <>
                    The new clock-out flow adds friction and clarity; I designed
                    a step-by-step review with location data and 15-minute
                    rounding, so workers know exactly what gets submitted.
                  </>
                ),
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                Letting workers edit time throughout the week sounded like a
                logical improvement. Most didn&rsquo;t do it.
              </>
            }
            body={
              <>
                I designed a way for workers to review and edit time entries
                anytime before they were submitted to contractors. In theory, it
                gave them more flexibility. In practice, almost not many used
                it. My guess is either they nailed it on the first try (best
                case), didn&rsquo;t know they could make edits later
                (plausible), or still assumed the contractor was ultimately in
                charge of time (unfortunately still true in some cases).
              </>
            }
          />

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
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744060192/buildforce-07_r0yavc.webp",
                alt: "Contractor onboarding for Buildforce web app",
                caption: (
                  <>
                    End-of-week flow to double-check entries before it
                    auto-submits on Monday. Similar to the old design, but
                    workers can edit throughout the week and don&rsquo;t have to
                    explicitly “&ldquo;submit&rdquo; hours.
                  </>
                ),
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                Contractors used worker data to resolve disputes, and workers
                could challenge edits without needing us.
              </>
            }
            body={
              <>
                We added clock-in and clock-out maps to give contractors a
                clearer view of when and where shifts started and ended. We
                didn&rsquo;t have direct metrics on trust, but we saw
                contractors using that data to settle disputes, which in my view
                suggests they believed it. On the flip side, workers were
                notified when their time was approved or changed and could
                dispute it directly. Instead of ops chasing people down, both
                sides had the info they needed. Our team went from spending 3
                days a week resolving time disputes to just a couple of hours.
              </>
            }
          />

          <ProjectSectionMediaBinder>
            <ProjectSectionMedia
              layout={{
                type: "mockup",
                background: {
                  color: "bg-[#BEB39E]",
                },
              }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744060079/buildforce-08_nrwqhs.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: (
                    <>
                      Contractors can view location and time entry details for
                      each worker. This helped build trust in the system, even
                      though the main approval surface stayed unchanged aside
                      from new brand styling.
                    </>
                  ),
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{
                type: "double",
              }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744092019/buildforce-09_dqdnsc.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                  caption: (
                    <>
                      Workers are notified when time is approved or edited so
                      they can dispute issues directly. This removed ops from
                      having to chase down confirmations.
                    </>
                  ),
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744092019/buildforce-10_ykqwvx.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{
                type: "full",
              }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744924853/buildforce-12_y8hqg1.webp",
                  alt: "Buildforce electrician using mobile phone",
                },
              ]}
            />
          </ProjectSectionMediaBinder>
        </ProjectSection>

        {/* ---- PROBLEM ---- */}
        <ProjectSection
          sectionNumber="II"
          sectionLabel="Problem"
          iconType="problem"
          className="stack-animation"
        >
          <ProjectSectionContent
            headline={
              <>
                Workers were submitting hours that didn&rsquo;t reflect reality,
                so contractors and our ops team had to clean up the mess in time
                to run payroll every week.
              </>
            }
            body={
              <>
                Clock-in and clock-out times were all over the place, sometimes
                showing 24-hour shifts, other times missing entire days. Some
                clocked out hours after their shift ended, or forgot entirely
                and only noticed when clocking in the next day. Many workers
                didn&rsquo;t review their time before submitting. This led to
                inaccurate time sheets getting sent to contractors and a cascade
                of manual corrections later.
              </>
            }
          />

          <ProjectSectionMediaBinder>
            <ProjectSectionMedia
              layout={{
                type: "mockup",
                background: {
                  color: "bg-[#BDC3CF]",
                },
              }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743717774/buildforce-02_bpjwok.webp",
                  alt: "Trades app clockout flow",
                  caption: (
                    <>
                      Our time tracking system works like a stopwatch: easy to
                      forget. Most workers forget to clock in or out, and about
                      65% of these time entries go uncorrected.
                    </>
                  ),
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{
                type: "mockup",
                background: {
                  color: "bg-[#BDC3CF]",
                },
              }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743717774/buildforce-03_qq6zik.webp",
                  alt: "Trades app submit time flow at the start of the following week",
                  caption: (
                    <>
                      Workers get a second chance to fix their hours at the
                      start of the week but most skip it, either unaware or
                      assuming the original entry is “good enough.”
                    </>
                  ),
                },
              ]}
            />
          </ProjectSectionMediaBinder>

          <ProjectSectionContent
            headline={
              <>
                Contractors didn&rsquo;t trust the hours and inputted their own
                time sheets. As a result, our ops team spent 3 days of their
                week untangling the truth.
              </>
            }
            body={
              <>
                Each week followed the same painful pattern. Our payroll team
                rounded worker-reported hours and sent them to contractors, who
                cross-checked them against their own logs usually treating
                theirs as the source of truth. When the numbers didn&&rsquo;;t
                match (which happened a lot), payroll and support ops were left
                sorting it out. That meant chasing foremen, piecing together
                timelines, and trying to resolve disputes with limited context.
                Workers were often left in the dark sometimes waiting weeks to
                get paid correctly.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{
              type: "mockup",
              background: {
                color: "bg-[#BDC3CF]",
              },
            }}
            media={[
              {
                type: "image",
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744064972/buildforce-01_fhd7ft.webp",
                alt: "Contractor time approval",
                caption: (
                  <>
                    Contractors use this web app surface to approve worker hours
                    but usually end up editing them. They often overwrite worker
                    entries to match time sheets from their own systems.
                  </>
                ),
              },
            ]}
          />

          <ProjectSectionContent
            headline={
              <>
                The system created friction for contractors, gave workers little
                feedback, and left ops stuck in the middle.
              </>
            }
            body={
              <>
                Hiring through Buildforce was supposed to be easier, but our
                time tracking flow added more overhead for contractors. Many
                already had systems in place, so using ours felt like extra
                work... not an upgrade. On the worker side, the flow was too
                easy to speed through (they didn&rsquo;t know they were doing
                anything wrong) and too hard to correct later. Meanwhile, our
                ops team was stretched thin, manually reconciling time across
                three disconnected perspectives.
              </>
            }
          />

          <div className="flex flex-col md:flex-row gap-4 md:gap-2">
            <div className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col">
              <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
                Workers didn’t review or correct their hours with{" "}
                <span className="text-text-action">
                  ~65% of entries were submitted without worker edits
                </span>
              </p>
            </div>
            <div className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col">
              <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
                Contractors often ignored worker-submitted time with{" "}
                <span className="text-text-action">
                  45% of entries edited by contractors
                </span>
              </p>
            </div>
            <div className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col">
              <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
                Ops had to intervene constantly with only{" "}
                <span className="text-text-action">
                  ~55% of time sheets getting auto-approved
                </span>
              </p>
            </div>
          </div>
        </ProjectSection>

        <ProjectEnd
          image="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744924853/buildforce-11_cwgjyq.webp"
          process={{
            item1: "How & why did we start using the Shape Up process?",
            item2: "Which decisions kept us on the worker's side?",
            item3: "How did we tackle product education, comms and support?",
            item4: "What challenges arose throughout the project?",
            item5: "How did we introduce a brand refresh alongside this work?",
          }}
          project={{
            name: "How I shaped design & improved collaboration @Buildforce",
            type: "image",
            src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-cover-02_gqnb5l.webp",
            alt: "Contractor time approval",
            url: "/projects/buildforce-leadership",
          }}
          prototype={{
            name: "Prototype",
            type: "image",
            src: "",
            alt: "",
            url: "",
          }}
        />
      </div>
    </ReactLenis>
  );
};

export default Buildforce;
