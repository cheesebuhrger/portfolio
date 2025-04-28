export interface Project {
  title: string;
  problem: string;
  solution: string;
  company: string;
  year: string;
  duration: string;
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

export const designProjects: Project[] = [
  {
    company: "Buildforce",
    year: "2024",
    duration: "6 weeks",
    url: "/projects/buildforce",
    title: "Designing friction to save everyone time",
    problem:
      "Inaccurate worker time entries made contractors distrust our system & left the ops team cleaning up payroll for 3 days",
    solution:
      "Redesigning the time tracking flow resulted in fewer errors, more accurate hrs from workers, & reduced days of manual payroll cleanup",
    image1: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744093117/buildforce-cover-01_1_jzzqeo.webp",
      alt: "Buildforce time tracking app.",
    },
    image2: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1744925544/buildforce-cover-02_v3wm6k.webp",
      alt: "Buildforce worker looking at phone on a construction site.",
    },
  },
  {
    company: "Buildforce",
    year: "2023-24",
    duration: "1 year",
    url: "/projects/buildforce-leadership",
    title: "How I shaped design & improved collaboration @Buildforce",
    problem:
      "Every new project sparked scope debates with speed taking priority over quality, leading to bandaids that didn't always solve actual user problems",
    solution:
      "Shaped a culture of accountability & trust, improved speed:quality ratio, fostered continuous feedback, & utilized individual strengths",

    image1: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745867478/buildforce-leadership-cover-01_qwwv1t.webp",
      alt: "Buildforce",
    },
    image2: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1743183530/buildforce-leadership-cover-02_gqnb5l.webp",
      alt: "Buildforce brand refresh moodboard.",
    },
  },
  {
    company: "Strava",
    year: "2021-22",
    duration: "1 year",
    url: "/projects/strava-growth",
    title: "Evolving my process for growth design",
    problem:
      "Early subscription growth efforts didn't always perform well, lacking connection to human problems & context",
    solution:
      "I grounded growth experiements & initiatives in real human problems resulting in $6.8MM/yr subscription revenue with my involvement",
    image1: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742873197/strava-growth-cover-1_dwsdpv.webp",
      alt: "Strava subscription cancel modal",
    },
    image2: {
      src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1745864055/strava-growth-cover-02_vmvxii.webp",
      alt: "Strava youth running",
    },
  },
  {
    company: "Wheel",
    year: "2019",
    duration: "3 months",
    url: "/projects/wheel",
    title:
      "Designing for clarity, control, & efficiency in virtual care, from 0 → 1",
    problem:
      "Clinicians used email to know what patients they were assigned to, needed to context switch and learn many different platforms",
    solution:
      "Less ops hours dedicated to scheduling and pay, more first assignment completions under round robin system, and faster visit completion times",
    image1: {
      src: "/images/wheel/wheel-cover-1.webp",
      alt: "Wheel",
    },
    image2: {
      src: "/images/wheel/wheel-cover-2.jpg",
      alt: "Wheel",
    },
  },
];
