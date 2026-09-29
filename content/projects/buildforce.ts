import type { Project } from "@/lib/types";

const buildforce: Project = {
  slug: "buildforce",
  title: "Designing friction to save everyone time",
  company: "Buildforce",
  role: "Staff Product Designer",
  year: "2024",
  duration: "6 weeks",
  problem: "Inaccurate worker time entries made contractors distrust our system & left the ops team cleaning up payroll for 3 days",
  solution: "Redesigning the time tracking flow resulted in fewer errors, more accurate hrs from workers, & reduced days of manual payroll cleanup",
  skills: [
    "!Staff Product Designer",
    "!Iterative Design",
    "Data Analysis",
    "Design Systems",
    "Interaction Design",
    "Mobile App",
    "Research",
    "Visual Design",
    "Web App",
  ],
  team: [
    {
      name: "Buildforce",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744064454/bf_dmmhfv.webp",
      href: "https://www.linkedin.com/company/buildforce/",
    },
    {
      name: "Colin Harman",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742857057/colin_xmpff3.webp",
      href: "https://www.linkedin.com/in/colinharman/",
      role: "Staff Software Engineer",
    },
    {
      name: "Lillian Situ",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/lillian_mgwjau.webp",
      href: "https://www.linkedin.com/in/situlillian/",
      role: "Senior Software Engineer",
    },
    {
      name: "Mark Di Marco",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/mark_cw3uig.webp",
      href: "https://www.linkedin.com/in/markdimarco/",
      role: "VP Eng",
    },
    {
      name: "Michael Harman",
      image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742856923/michaelh_skijai.webp",
      href: "https://www.linkedin.com/in/michael-harman-1a330220a/",
      role: "Software Engineer",
    },
  ],
  cover: {
    primary: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744093117/buildforce-cover-01_1_jzzqeo.webp",
      alt: "Buildforce time tracking app.",
    },
    secondary: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744925544/buildforce-cover-02_v3wm6k.webp",
      alt: "Buildforce worker looking at phone on a construction site.",
    },
  },
  stackHero: true,
  end: {
    image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744924853/buildforce-11_cwgjyq.webp",
    process: [
      "How & why did we start using the Shape Up process?",
      "Which decisions kept us on the worker's side?",
      "How did we tackle product education, comms and support?",
      "What challenges arose throughout the project?",
      "How did we introduce a brand refresh alongside this work?",
    ],
  },
  sections: [
    {
      number: "I",
      label: "Final Design & Outcomes",
      icon: "solution",
      stack: true,
      blocks: [
        {
          type: "text",
          headline: "Workers fixed their own time, contractors edited less, and ops finally didn’t have to spend half their week supporting payroll.",
          body: "Once we released time tracking v2, everyone did less but in the best way. Workers made more accurate submissions up front, contractors barely had to touch them because they aligned with their own logs, and our ops team didn’t have to mediate every payroll cycle. The time tracking system stopped being a problem that needed constant fixing. It wasn’t perfect, but it was going to help us scale the business.",
        },
        {
          type: "stats",
          media: {
            type: "image",
            src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744091995/buildforce-05_hajxhw.webp",
            alt: "Time tracking for Buildforce worker app",
          },
          stats: [
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
          ],
          position: "left",
        },
        {
          type: "text",
          headline: "I redesigned the time entry flow to show workers exactly what the contractor sees. It made workers pause and think.",
          body: "The new flow added a summary screen that showed workers their exact clock-in and clock-out locations on a map just like the contractor would see it. This made mistakes more obvious and accountability more real. We also added automatic rounding to the nearest 15 minutes and snapped unusually long shifts to the project schedule, so payroll ops didn’t have to clean up the mess later. What workers saw matched what was sent to contractors. That small shift in visibility and friction made a huuuge difference.",
        },
        {
          type: "media",
          layout: "mockup",
          media: [
            {
              type: "image",
              src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744060079/buildforce-06_x1tmoq.webp",
              alt: "Electrician clock-out flow in the Buildforce web app",
              caption: "The new clock-out flow adds friction and clarity; I designed a step-by-step review with location data and 15-minute rounding, so workers know exactly what gets submitted.",
            },
          ],
          background: {
            color: "#BEB39E",
          },
        },
        {
          type: "text",
          headline: "Letting workers edit time throughout the week sounded like a logical improvement. Most didn’t do it.",
          body: "I designed a way for workers to review and edit time entries anytime before they were submitted to contractors. In theory, it gave them more flexibility. In practice, almost not many used it. My guess is either they nailed it on the first try (best case), didn’t know they could make edits later (plausible), or still assumed the contractor was ultimately in charge of time (unfortunately still true in some cases).",
        },
        {
          type: "media",
          layout: "mockup",
          media: [
            {
              type: "image",
              src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744060192/buildforce-07_r0yavc.webp",
              alt: "Worker time entry edit flow in Trades app",
              caption: "End-of-week flow to double-check entries before it auto-submits on Monday. Similar to the old design, but workers can edit throughout the week and don’t have to explicitly “submit“ hours.",
            },
          ],
          background: {
            image: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-11-bg_rcrm7o.webp",
          },
        },
        {
          type: "text",
          headline: "Contractors used worker data to resolve disputes, and workers could challenge edits without needing us.",
          body: "We added clock-in and clock-out maps to give contractors a clearer view of when and where shifts started and ended. We didn’t have direct metrics on trust, but we saw contractors using that data to settle disputes, which in my view suggests they believed it. On the flip side, workers were notified when their time was approved or changed and could dispute it directly. Instead of ops chasing people down, both sides had the info they needed. Our team went from spending 3 days a week resolving time disputes to just a couple of hours.",
        },
        {
          type: "group",
          blocks: [
            {
              type: "media",
              layout: "mockup",
              media: [
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1752015713/buildforce-08_shlzjc.webp",
                  alt: "Contractor time approval screen detailing worker time entry",
                  caption: "Contractors can view location and time entry details for each worker. This helped build trust in the system, even though the main approval surface stayed unchanged aside from new brand styling.",
                },
              ],
              background: {
                color: "#BEB39E",
              },
            },
            {
              type: "media",
              layout: "double",
              media: [
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744092019/buildforce-09_dqdnsc.webp",
                  alt: "Trades app showing contractor adjusting worker total hours and option to dispute the change",
                  caption: "Workers are notified when time is approved or edited so they can dispute issues directly. This removed ops from having to chase down confirmations.",
                },
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744092019/buildforce-10_ykqwvx.webp",
                  alt: "Trades app showing contractor adjusting worker total hours",
                },
              ],
            },
            {
              type: "media",
              layout: "full",
              media: [
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744924853/buildforce-12_y8hqg1.webp",
                  alt: "Buildforce electrician using mobile phone",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      number: "II",
      label: "Problem Framing",
      icon: "problem",
      stack: true,
      blocks: [
        {
          type: "text",
          headline: "Workers were submitting hours that didn’t reflect reality, so contractors and our ops team had to clean up the mess in time to run payroll every week.",
          body: "Clock-in and clock-out times were all over the place, sometimes showing 24-hour shifts, other times missing entire days. Some clocked out hours after their shift ended, or forgot entirely and only noticed when clocking in the next day. Many workers didn’t review their time before submitting. This led to inaccurate time sheets getting sent to contractors and a cascade of manual corrections later.",
        },
        {
          type: "group",
          blocks: [
            {
              type: "media",
              layout: "mockup",
              media: [
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743717774/buildforce-02_bpjwok.webp",
                  alt: "Trades app clockout flow in previous version",
                  caption: "Our time tracking system works like a stopwatch: easy to forget. Most workers forget to clock in or out, and about 65% of these time entries go uncorrected.",
                },
              ],
              background: {
                color: "#BDC3CF",
              },
            },
            {
              type: "media",
              layout: "mockup",
              media: [
                {
                  type: "image",
                  src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743717774/buildforce-03_qq6zik.webp",
                  alt: "Trades app submit time flow at the start of the following week in previous version",
                  caption: "Workers get a second chance to fix their hours at the start of the week but most skip it, either unaware or assuming the original entry is “good enough.“",
                },
              ],
              background: {
                color: "#BDC3CF",
              },
            },
          ],
        },
        {
          type: "text",
          headline: "Contractors didn’t trust the hours and inputted their own time sheets. As a result, our ops team spent 3 days of their week untangling the truth.",
          body: "Each week followed the same painful pattern. Our payroll team rounded worker-reported hours and sent them to contractors, who cross-checked them against their own logs usually treating theirs as the source of truth. When the numbers didn&’;t match (which happened a lot), payroll and support ops were left sorting it out. That meant chasing foremen, piecing together timelines, and trying to resolve disputes with limited context. Workers were often left in the dark sometimes waiting weeks to get paid correctly.",
        },
        {
          type: "media",
          layout: "mockup",
          media: [
            {
              type: "image",
              src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744064972/buildforce-01_fhd7ft.webp",
              alt: "Contractor time approval in previous version",
              caption: "Contractors use this web app surface to approve worker hours but usually end up editing them. They often overwrite worker entries to match time sheets from their own systems.",
            },
          ],
          background: {
            color: "#BDC3CF",
          },
        },
        {
          type: "text",
          headline: "The system created friction for contractors, gave workers little feedback, and left ops stuck in the middle.",
          body: "Hiring through Buildforce was supposed to be easier, but our time tracking flow added more overhead for contractors. Many already had systems in place, so using ours felt like extra work... not an upgrade. On the worker side, the flow was too easy to speed through (they didn’t know they were doing anything wrong) and too hard to correct later. Meanwhile, our ops team was stretched thin, manually reconciling time across three disconnected perspectives.",
        },
        {
          type: "callouts",
          items: [
            "Workers didn’t review or correct their hours with **~65% of entries were submitted without worker edits**",
            "Contractors often ignored worker-submitted time with **45% of entries edited by contractors**",
            "Ops had to intervene constantly with only **~55% of time sheets getting auto-approved**",
          ],
        },
      ],
    },
  ],
};

export default buildforce;
