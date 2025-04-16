"use client";

import React from "react";
import ProjectSectionMedia from "@/components/ProjectSectionMedia";
import ProjectSectionContent from "@/components/ProjectSectionContent";
import ProjectSection from "@/components/ProjectSection";
import ProjectHero from "@/components/ProjectHero";
import Quote from "@/components/Quote";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import { ReactLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger);

const Project1: React.FC = () => {
  const imageScaleRef = useImageScaleAnimation();
  const stackRef = useStackAnimation();

  return (
    <ReactLenis root>
      <div>
        <ProjectHero
          headline={
            <>How I shaped design & improved collaboration @Buildforce</>
          }
          problem="Every new project sparked scope debates with speed taking priority over quality, leading to bandaids that didn't always solve actual user problems"
          solution="Shaped a culture of accountability & trust, improved speed:quality ratio, fostered continuous feedback, & utilized individual strengths"
          skills={[
            "!Staff Product Designer",
            "Brand",
            "Code",
            "Design Systems",
            "Growth",
            "Interaction Design",
            "Management",
            "Mobile App",
            "Prototyping",
            "Product Strategy",
            "Research",
            "Web App",
          ]}
          duration={{
            length: "1 year",
            year: "2023-2024",
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
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/melysia_si7s14.webp",
                alt: "Melysia Cha",
                href: "https://www.linkedin.com/in/melysia-cha/",
                primary: "Melysia Cha",
                secondary: "Product Designer",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/michaelh_skijai.webp",
                alt: "Michael Harman",
                href: "https://www.linkedin.com/in/michael-harman-1a330220a/",
                primary: "Michael Harman",
                secondary: "Software Engineer",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/michaelo_yesl2r.webp",
                alt: "Michael Orcutt",
                href: "https://www.linkedin.com/in/michael-orcutt/",
                primary: "Michael Orcutt",
                secondary: "CTO",
              },
              {
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/stephanie_ryoqzx.webp",
                alt: "Stephanie Bistransin",
                href: "https://www.linkedin.com/in/stephanie-bistransin/",
                primary: "Stephanie Bistransin",
                secondary: "Software Engineer",
              },
            ],
          }}
          images={{
            primary: {
              src: "/images/bf-leadership/bf-leadership-cover-1.webp",
              alt: "Buildforce Leadership",
            },
            secondary: {
              src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-cover-02_gqnb5l.webp",
              alt: "Buildforce Leadership",
            },
          }}
          className="stack-animation"
        />

        {/* ---- OUTCOMES 1 ---- */}
        <ProjectSection
          sectionNumber="I.A"
          sectionLabel="Outcome: Accountability & Trust"
          iconType="solution"
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
                src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183529/buildforce-leadership-08_pnhrc4.webp",
                alt: "Worker time recording on Trades app in construction scene",
              },
            ]}
            stats={[
              {
                title: <>Strategic initiatives planned & led</>,
                value: "7",
                footnote: "Across growth, product, and brand",
                direction: "up",
                // footnote: "Rebrand (Marketing), Design System, External Applications, Time Tracking, Core Workforce, NC Expansion, Vision",
              },
              {
                title: <>Tighter collaborative exercises introduced</>,
                value: "3",
                footnote: "Shape Up, xfn crit, product debates",
                direction: "up",
              },
              null,
              {
                title: <>Hypothesis-driven accountability strengthened</>,
                value: "0 → 1",
                footnote: "Inspired by strong inference",
              },
            ]}
          />
          <Quote
            writer={{
              image:
                "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/michaelo_yesl2r.webp",
              name: "Michael Orcutt",
              role: "CTO",
            }}
            content={{
              snippet: (
                <>
                  Buhr{" "}
                  <span className="text-text-action">
                    greatly impacted design, design processes, how product
                    operated and evolved, and overall team dynamics
                  </span>
                  . When he joined, things were a bit chaotic, and he brought
                  balance and much-needed structure to our team.
                </>
              ),
              full: (
                <>
                  Buhr is talented far beyond his title.
                  <br />
                  <br />
                  He joined Buildforce as a Staff Product Designer focused on
                  bringing our SaaS product to life. It wasn&apos;t long before
                  I realized I needed to get out of the way, let him do his
                  thing, and promote him to Head of Design. He greatly impacted
                  design, design processes, how product operated and evolved,
                  and overall team dynamics. When he joined, things were a bit
                  chaotic, and he brought balance and much-needed structure to
                  our team. He did this all while elevating our design, brand,
                  and overall experience of Buildforce.
                  <br />
                  <br />
                  He set the structure and processes for managing designers at
                  Buildforce. He had a thoughtful approach and consistently
                  managed and mentored another product designer. Under his
                  leadership, they were able to grow and understand where to
                  grow and focus.
                  <br />
                  <br />
                  Moreover, Buhr is the best designer I&apos;ve had the
                  privilege to work with. His skill set is remarkably diverse,
                  spanning product design, marketing/growth, brand design, and
                  more. There is no task he couldn&apos;t handle.
                  <br />
                  <br />I consider myself lucky to have had the opportunity to
                  work with him, and I hope to have the chance to work with him
                  again in the future.
                </>
              ),
            }}
          />

          <div
            id="case-image-grid"
            className="flex flex-col gap-4 md:gap-6 lg:gap-8"
          >
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "/images/bf-leadership/bf-leadership-2.webp",
                  alt: "Contractor onboarding for Buildforce web app",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-10_otwlkk.webp",
                  alt: "Worker profile for Buildforce web app in construction scene",
                },
              ]}
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
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183529/buildforce-leadership-11_defhzi.webp",
                  alt: "Worker time submission flow for Buildforce web app",
                },
              ]}
            />
          </div>
        </ProjectSection>

        {/* ---- OUTCOMES 2 ---- */}
        <ProjectSection
          sectionNumber="I.B"
          sectionLabel="Outcome: Speed & Quality"
          iconType="solution"
          className="stack-animation"
        >
          <ProjectSectionContent
            headline={
              <>
                Evolved Visual Identity & Design System Foundation. This is the
                second sentance to illustrate the length. This is the third line
                to illustrate the length.
              </>
            }
          />

          <ProjectSectionMedia
            layout={{
              type: "stats",
              statsPosition: "right",
            }}
            media={[
              {
                type: "video",
                src: "https://res.cloudinary.com/dc9cfuxqp/video/upload/v1743183530/buildforce-leadership-12_aqpi2t.webm",
                alt: "??",
              },
            ]}
            stats={[
              null,
              {
                title: <>Pull requests merged</>,
                value: "20+",
                direction: "up",
              },
              {
                title: <>Brand refresh & design system shipped</>,
                value: "0 → 1",
              },
              {
                title: <>Design system tokens & components created</>,
                value: "300+",
                direction: "up",
              },
            ]}
          />

          <Quote
            writer={{
              image:
                "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/colin_xmpff3.webp",
              name: "Colin Harman",
              role: "Staff Software Engineer",
            }}
            content={{
              snippet: (
                <>
                  We loved having Buhr in the room because it meant our scoping,
                  critiquing, or ideating would result in a{" "}
                  <span className="text-text-action">
                    higher quality feature in less time.
                  </span>
                </>
              ),
              full: (
                <>
                  Buhr is one of the most talented designers and product minds I
                  have encountered in my 10 years working as a software
                  engineer. His ability to isolate and solve customer problems
                  with simple, focused and beautiful UX is unparalleled. At
                  Buildforce I watched Buhr take a scattered brand and transform
                  it into something unique and consistent -- all within the span
                  of a few months. As if that weren&apos;t enough, shortly after
                  its release Buhr was able to to make contributions to our
                  production codebase and release UI changes that may have never
                  been prioritized by a busy engineering team.
                  <br />
                  <br />
                  When encountering technical hurdles, Buhr is quick to
                  collaborate. We often came up with creative design
                  alterations, keeping engineering pace high. As a result, we
                  loved having Buhr in the room because it meant our scoping,
                  critiquing, or ideating would result in a higher quality
                  feature in less time.
                </>
              ),
            }}
          />

          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-13_moefco.webp",
                  alt: "Moodboard for Buildforce brand",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "double" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183529/buildforce-leadership-14_q6huzo.webp",
                  alt: "??",
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183529/buildforce-leadership-15_wtczko.webp",
                  alt: "Spot compoisitions Buildforce brand",
                },
              ]}
            />
          </div>

          <ProjectSectionContent
            body={<>Something needs to go here explaining the design system.</>}
          />

          <ProjectSectionMedia
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-10.webp",
                alt: "??",
              },
            ]}
          />
        </ProjectSection>

        {/* ---- OUTCOMES 3 ---- */}
        <ProjectSection
          sectionNumber="I.C"
          sectionLabel="Outcome: Empowerment & Growth"
          iconType="solution"
          // className="stack-animation"
        >
          <ProjectSectionContent
            headline={<>Empowerment & Growth</>}
            body={<>My view i</>}
          />

          <ProjectSectionMedia
            layout={{
              type: "stats",
              statsPosition: "left",
            }}
            stats={[
              {
                title: <>Adhoc pair-design sessions</>,
                value: "50+",
                direction: "up",
                footnote: "Across design & eng",
              },
              {
                title: <>Skills benchmarked, measured, & improved</>,
                value: "12",
                direction: "up",
                footnote: "Used Figma's levels framework",
              },
              {
                title: <>Average directional explorations per project</>,
                value: "4",
                direction: "up",
                footnote: "Up from 1, more rigor & practice",
              },
              null,
            ]}
            media={[
              {
                type: "video",
                src: "https://res.cloudinary.com/dc9cfuxqp/video/upload/v1743183531/buildforce-leadership-17_g9pm0a.webm",
                alt: "??",
              },
            ]}
          />

          <Quote
            writer={{
              image:
                "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/melysia_si7s14.webp",
              name: "Melysia Cha",
              role: "Product Designer",
            }}
            content={{
              snippet: (
                <>
                  Buhr acts as a skilled mediator,{" "}
                  <span className="text-text-action">
                    fostering open communication and bridging gaps
                  </span>{" "}
                  between teams with his genuine curiosity and collaborative
                  spirit.
                </>
              ),
              full: (
                <>
                  Buhr&apos;s impact on Buildforce was undeniable from the
                  moment he joined the team. He wasn&apos;t just another hire;
                  he rolled up his sleeves and helped us define and establish
                  design processes that are still the backbone of our workflow
                  today. He also played a key role in facilitating and shaping
                  our product roadmap, ensuring design remained at the forefront
                  of every decision. His passion for fostering a strong design
                  culture was infectious, creating a space where collaboration
                  and innovation thrived across product, design, and
                  engineering.
                  <br />
                  <br />
                  Buhr&apos;s leadership went beyond just the technical aspects.
                  He spearheaded the development of our design systems and brand
                  identity, ensuring a consistent experience for all our
                  products. But what truly sets Buhr apart is his ability to
                  connect with people. He&apos;s a fantastic listener who asks
                  insightful questions and acts as a skilled mediator, fostering
                  open communication and bridging gaps between teams with his
                  genuine curiosity and collaborative spirit. He wasn&apos;t
                  just my manager; he was a mentor who generously shared his
                  knowledge and helped shape my professional journey.
                  <br />
                  <br />
                  Buhr&apos;s a rare combination of design expertise,
                  collaborative spirit, and a genuinely positive and curious
                  personality. He&apos;s an invaluable asset to any
                  organization, and I highly recommend him for any design
                  leadership role where his skills and experience can truly
                  shine. It was an absolute privilege to get to work with and
                  know this wonderful human being.
                </>
              ),
            }}
          />

          <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
            <ProjectSectionMedia
              layout={{ type: "full" }}
              media={[
                {
                  type: "image",
                  src: "/images/bf-leadership/bf-leadership-12.webp",
                  alt: "??",
                },
              ]}
            />
            <ProjectSectionMedia
              layout={{ type: "double" }}
              media={[
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-20_fmi2so.webp",
                  alt: "??",
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-21_ki9pnk.webp",
                  alt: "??",
                },
              ]}
            />
          </div>
        </ProjectSection>

        {/* ---- FOOTER ---- */}
        <footer className="p-8 pt-40 bg-surface-primary border-t border-border-primary">
          Hello
        </footer>
      </div>
    </ReactLenis>
  );
};

export default Project1;
