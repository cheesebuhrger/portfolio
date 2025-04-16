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
    title: "Designing friction to save everyone time",
    company: "Buildforce",
    //   "Project with lots of technical constraints, ambiguous scope, and phasing strategy (solve the time tracking problem first, then the reconciliation problem).",
    year: "2023",
    url: "/projects/buildforce",
    image1: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744093117/buildforce-cover-01_1_jzzqeo.webp",
      alt: "Buildforce",
    },
    image2: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744060999/buildforce-cover-02_thswdq.webp",
      alt: "Buildforce",
    },
  },
  {
    title: "How I shaped design & improved collaboration @Buildforce",
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
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-1_dwsdpv.webp",
      alt: "Buildforce",
    },
    image2: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-2_iyh5ek.webp",
      alt: "Buildforce",
    },
  },
  // {
  //   title:
  //     "Designing for clarity, control, & efficiency in virtual care, from 0 → 1",
  //   company: "Wheel",
  //   year: "2021",
  //   url: "/projects/wheel",
  //   image1: {
  //     src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873250/wheel-cover-1_uamqg1.webp",
  //     alt: "Wheel",
  //   },
  //   image2: {
  //     src: "/images/wheel/wheel-cover-2.jpg",
  //     alt: "Wheel",
  //   },
  // },
];
