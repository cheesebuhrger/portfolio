export interface Project {
  title: string;
  company: string;
  year: string;
  url: string;
  image1: {
    src: string;
    alt: string;
  };
  image2: {
    src: string;
    alt: string;
  };
}

export const romanNumerals = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
];

export const projects: Project[] = [
  {
    title: "Helping Electricians Get Paid Accurately",
    company: "Buildforce",
    //   "Project with lots of technical constraints, ambiguous scope, and phasing strategy (solve the time tracking problem first, then the reconciliation problem).",
    year: "2023",
    url: "/projects/buildforce",
    image1: {
      src: "/images/bf/bf-1.webp",
      alt: "Buildforce",
    },
    image2: {
      src: "/images/bf/bf-cover-2.webp",
      alt: "Buildforce",
    },
  },
  {
    title:
      "How I shaped the design culture at Buildforce and improved collaboration",
    company: "Buildforce",
    year: "2023-24",
    url: "/projects/buildforce-leadership",
    image1: {
      src: "/images/bf-leadership/bf-leadership-cover-1.png",
      alt: "Buildforce",
    },
    image2: {
      src: "/images/bf-leadership/bf-leadership-7.webp",
      alt: "Buildforce",
    },
  },
  {
    title: "Evolving my process for growth design",
    company: "Strava",
    year: "2022-23",
    url: "/projects/strava-growth",
    image1: {
      src: "/images/strava-growth/strava-growth-cover-1.webp",
      alt: "Buildforce",
    },
    image2: {
      src: "/images/strava-growth/strava-growth-cover-2.webp",
      alt: "Buildforce",
    },
  },
  {
    title:
      "Designing for clarity, control, & efficiency in virtual care, from 0 → 1",
    company: "Wheel",
    year: "2021",
    url: "/projects/wheel",
    image1: {
      src: "/images/wheel/wheel-cover-1.webp",
      alt: "Buildforce",
    },
    image2: {
      src: "/images/wheel/wheel-cover-2.jpg",
      alt: "Buildforce",
    },
  },
];
