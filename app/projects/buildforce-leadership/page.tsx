"use client";

import React from "react";
import MediaStatsGrid from "@/components/MediaStatsGrid";
import { useImageScaleAnimation } from "@/hooks/useImageScaleAnimation";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import ProjectSectionContent from "@/components/ProjectSectionContent";
import ProjectSection from "@/components/ProjectSection";
import ProjectHero from "@/components/ProjectHero";
import Quote from "@/components/Quote";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useStackAnimation } from "@/hooks/useStackAnimation";
import Button from "@/components/Button";
import TransitionLink from "@/components/TransitionLink";
gsap.registerPlugin(ScrollTrigger);

const Project1: React.FC = () => {
  const imageScaleRef = useImageScaleAnimation();
  const stackRef = useStackAnimation();
  useLenisScroll(); // Initialize smooth scrolling

  return (
    <div>
      <ProjectHero
        headline={
          <>
            <div className="">
              How I shaped design @Buildforce & improved collaboration
            </div>
          </>
        }
        results={[
          {
            title: "Shared definition of good and how to measure it",
          },
          {
            title: "Improved speed:quality ratio",
          },
          {
            title:
              "Fostered continuous feedback, utilizing strengths, and skill sharing",
          },
        ]}
        skills={[
          "Brand",
          "Code",
          "Design Systems",
          "Growth",
          "IXD",
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
            src: "/images/bf-leadership/bf-leadership-7.webp",
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
              &ldquo;Let&apos;s just ship and see if people use it&rdquo; was
              the attitude for almost every project.
            </>
          }
          body={
            <>
              Every project sparked scope debates, with speed taking priority
              over quality. This approach often led to hacked-together solutions
              that didn&apos;t always solve the right problems for users.
            </>
          }
        />

        <MediaStatsGrid
          layout={{ type: "full" }}
          media={[
            {
              type: "image",
              src: "/images/bf-leadership/bf-leadership-0.webp",
              alt: "Contractor onboarding for Buildforce web app",
            },
          ]}
        />
        <ProjectSectionContent
          headline={
            <>I uncovered tangential problems while working on product.</>
          }
          body={
            <>
              Design systems challenges with typography hierarchy, inconsistent
              iconography, color contrast issues. Also, design didn&apos;t
              really have a &ldquo;voice&rdquo; where decisions were questioned
              and brushed off. I didn&apos;t understand why that was happening
              in the beginning but it turns out, articulating decisions and
              putting enough rigor to know if you&apos;re doing the right thing
              wasn&apos;t apart of the deign process at the time.
            </>
          }
        />

        <MediaStatsGrid
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
          headline={<>As a result, we blah blah blah</>}
          body={
            <>
              Time tracking was the most complex with lots of technical
              constraints and the first with the new process. Lots of pivoting
              and opened a lot of new opportunities for future roadmap items
              like moving from time sheets to individual time entries.
            </>
          }
        />
      </ProjectSection>

      {/* ---- APPROACH ---- */}
      <ProjectSection
        sectionNumber="II"
        sectionLabel="Approach"
        className="stack-animation"
      >
        <ProjectSectionContent
          headline={
            <>
              One-on-one conversations with teammates and building trust is just
              as important as product work.
            </>
          }
          body={
            <>
              I approached everyone individually, genuinely trying to understand
              their painpoints and what they wanted in an ideal team.
            </>
          }
        />

        <MediaStatsGrid
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

        <MediaStatsGrid
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

      {/* ---- OUTCOMES 1 ---- */}
      <ProjectSection
        sectionNumber="III"
        sectionLabel="Outcomes A"
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

        <MediaStatsGrid
          layout={{
            type: "stats",
            statsPosition: "left",
          }}
          media={[
            {
              type: "image",
              src: "/images/bf-leadership/bf-leadership-1.webp",
              alt: "Worker time recording on Trades app in construction scene",
            },
          ]}
          stats={[
            {
              title: <>Metric</>,
              value: "431",
            },
            {
              title: <>Metric</>,
              value: "431",
            },
            null,
            {
              title: (
                <>
                  <span className="font-serif-italic">Less time</span>{" "}
                  correcting hours by contractors & workers
                </>
              ),
              value: "50%",
              footnote: "*Approximate amount per week",
            },
          ]}
        />
        <Quote
          image="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/michaelo_yesl2r.webp"
          name="Michael Orcutt"
          role="CTO"
          preview={
            <>
              Buhr{" "}
              <span className="text-text-action">
                greatly impacted design, design processes, how product operated
                and evolved, and overall team dynamics
              </span>
              . When he joined, things were a bit chaotic, and he brought
              balance and much-needed structure to our team.
            </>
          }
          fullQuote={
            <>
              Buhr is talented far beyond his title.
              <br />
              <br />
              He joined Buildforce as a Staff Product Designer focused on
              bringing our SaaS product to life. It wasn&apos;t long before I
              realized I needed to get out of the way, let him do his thing, and
              promote him to Head of Design. He greatly impacted design, design
              processes, how product operated and evolved, and overall team
              dynamics. When he joined, things were a bit chaotic, and he
              brought balance and much-needed structure to our team. He did this
              all while elevating our design, brand, and overall experience of
              Buildforce.
              <br />
              <br />
              He set the structure and processes for managing designers at
              Buildforce. He had a thoughtful approach and consistently managed
              and mentored another product designer. Under his leadership, they
              were able to grow and understand where to grow and focus.
              <br />
              <br />
              Moreover, Buhr is the best designer I&apos;ve had the privilege to
              work with. His skill set is remarkably diverse, spanning product
              design, marketing/growth, brand design, and more. There is no task
              he couldn&apos;t handle.
              <br />
              <br />I consider myself lucky to have had the opportunity to work
              with him, and I hope to have the chance to work with him again in
              the future.
            </>
          }
        />

        <div
          id="case-image-grid"
          className="flex flex-col gap-4 md:gap-6 lg:gap-8"
        >
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-2.webp",
                alt: "Contractor onboarding for Buildforce web app",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-3.webp",
                alt: "Worker profile for Buildforce web app in construction scene",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-5.webp",
                alt: "Worker time submission flow for Buildforce web app",
              },
            ]}
          />
        </div>
      </ProjectSection>

      {/* ---- OUTCOMES 2 ---- */}
      <ProjectSection
        sectionNumber="III"
        sectionLabel="Outcomes B"
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

        <MediaStatsGrid
          layout={{
            type: "stats",
            statsPosition: "right",
          }}
          media={[
            {
              type: "video",
              src: "/images/bf-leadership/bf-leadership-6.webm",
              alt: "??",
              autoPlay: true,
              loop: true,
              muted: true,
              controls: false,
            },
          ]}
          stats={[
            null,
            {
              title: <>Structure to projects and process changes, time saved</>,
              value: "431",
            },
            {
              title: <>Design system formalized</>,
              value: "10+",
              footnote: "Pull requests sumbitted",
            },
            null,
          ]}
        />

        <Quote
          image="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/colin_xmpff3.webp"
          name="Colin Harman"
          role="Staff Software Engineer"
          preview={
            <>
              We loved having Buhr in the room because it meant our scoping,
              critiquing, or ideating would result in a{" "}
              <span className="text-text-action">
                higher quality feature in less time.
              </span>
            </>
          }
          fullQuote={
            <>
              Buhr is one of the most talented designers and product minds I
              have encountered in my 10 years working as a software engineer.
              His ability to isolate and solve customer problems with simple,
              focused and beautiful UX is unparalleled. At Buildforce I watched
              Buhr take a scattered brand and transform it into something unique
              and consistent -- all within the span of a few months. As if that
              weren't enough, shortly after its release Buhr was able to to make
              contributions to our production codebase and release UI changes
              that may have never been prioritized by a busy engineering team.
              <br />
              <br />
              When encountering technical hurdles, Buhr is quick to collaborate.
              We often came up with creative design alterations, keeping
              engineering pace high. As a result, we loved having Buhr in the
              room because it meant our scoping, critiquing, or ideating would
              result in a higher quality feature in less time.
            </>
          }
        />

        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-7.webp",
                alt: "Moodboard for Buildforce brand",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "double" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-8.webp",
                alt: "??",
              },
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-9.webp",
                alt: "Spot compoisitions Buildforce brand",
              },
            ]}
          />
        </div>

        <ProjectSectionContent
          body={<>Something needs to go here explaining the design system.</>}
        />

        <MediaStatsGrid
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
      <ProjectSection sectionNumber="III" sectionLabel="Outcomes C">
        <ProjectSectionContent headline={<>Empowerment & Growth</>} />

        <MediaStatsGrid
          layout={{
            type: "stats",
            statsPosition: "left",
          }}
          stats={[
            null,
            {
              title: <>Clarity over product design role at buildforce</>,
              value: "0 to 1",
            },
            {
              title: <>Design crits include eng</>,
              value: "188",
            },
            null,
          ]}
          media={[
            {
              type: "video",
              src: "/images/bf-leadership/bf-leadership-11.webm",
              alt: "??",
              autoPlay: true,
              loop: true,
              muted: true,
              controls: false,
            },
          ]}
        />

        <Quote
          image="https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/melysia_si7s14.webp"
          name="Melysia Cha"
          role="Product Designer"
          preview={
            <>
              Buhr acts as a skilled mediator,{" "}
              <span className="text-text-action">
                fostering open communication and bridging gaps
              </span>{" "}
              between teams with his genuine curiosity and collaborative spirit.
            </>
          }
          fullQuote={
            <>
              Buhr's impact on Buildforce was undeniable from the moment he
              joined the team. He wasn't just another hire; he rolled up his
              sleeves and helped us define and establish design processes that
              are still the backbone of our workflow today. He also played a key
              role in facilitating and shaping our product roadmap, ensuring
              design remained at the forefront of every decision. His passion
              for fostering a strong design culture was infectious, creating a
              space where collaboration and innovation thrived across product,
              design, and engineering.
              <br />
              <br />
              Buhr's leadership went beyond just the technical aspects. He
              spearheaded the development of our design systems and brand
              identity, ensuring a consistent experience for all our products.
              But what truly sets Buhr apart is his ability to connect with
              people. He's a fantastic listener who asks insightful questions
              and acts as a skilled mediator, fostering open communication and
              bridging gaps between teams with his genuine curiosity and
              collaborative spirit. He wasn't just my manager; he was a mentor
              who generously shared his knowledge and helped shape my
              professional journey.
              <br />
              <br />
              Buhr's a rare combination of design expertise, collaborative
              spirit, and a genuinely positive and curious personality. He's an
              invaluable asset to any organization, and I highly recommend him
              for any design leadership role where his skills and experience can
              truly shine. It was an absolute privilege to get to work with and
              know this wonderful human being.
            </>
          }
        />

        <div className="flex flex-col gap-4 md:gap-6 lg:gap-8">
          <MediaStatsGrid
            layout={{ type: "full" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-12.webp",
                alt: "??",
              },
            ]}
          />
          <MediaStatsGrid
            layout={{ type: "double" }}
            media={[
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-13.webp",
                alt: "??",
              },
              {
                type: "image",
                src: "/images/bf-leadership/bf-leadership-14.webp",
                alt: "??",
              },
            ]}
          />
        </div>
      </ProjectSection>
      <footer className="p-8 pt-40 bg-surface-primary border-t border-border-primary">
        Hello
      </footer>
    </div>
  );
};

export default Project1;
