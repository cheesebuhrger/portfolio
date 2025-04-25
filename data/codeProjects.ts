export interface CodeProject {
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

export const codeProjects: CodeProject[] = [
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
    title: "Playground",
    company: "Me",
    year: "2025",
    duration: "N/A",
    url: "/projects/playground",
    technologies: ["React", "Typescript", "Next.js", "Tailwind CSS"],
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
    title: "Particle waves",
    company: "Me",
    year: "2024",
    duration: "N/A",
    url: "/projects/playground",
    technologies: ["React", "Typescript", "Next.js", "Tailwind CSS"],
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
    title: "Wheel Clinician App",
    company: "Wheel",
    year: "2021",
    duration: "1 month",
    url: "https://www.google.com",
    technologies: ["Protopie", "Figma"],
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
