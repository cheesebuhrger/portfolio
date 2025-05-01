export interface Demos {
  title: string;
  company: string;
  year: string;
  duration: string;
  url: string;
  technologies: string[];
  image1: {
    src: string;
    alt: string;
  };
  image2: {
    src: string;
    alt: string;
  };
}

export const demos: Demos[] = [
  {
    title: "Categorization interaction",
    company: "Categorize",
    year: "2025",
    duration: "N/A",
    url: "",
    technologies: ["React", "Typescript", "Vite"],
    image1: {
      src: "",
      alt: "Image 1",
    },
    image2: {
      src: "",
      alt: "Image 2",
    },
  },
  {
    title: "buhr.dev",
    company: "Me",
    year: "2025",
    duration: "N/A",
    url: "/",
    technologies: ["React", "Typescript", "Next.js", "Tailwind CSS", "GSAP"],
    image1: {
      src: "",
      alt: "Image 1",
    },
    image2: {
      src: "",
      alt: "Image 2",
    },
  },
];
