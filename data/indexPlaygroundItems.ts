export interface GridItem {
  type: "video" | "image";
  src: string;
  title: string;
  date: string;
  description?: string;
  url?: string;
}

export const playgroundItems: GridItem[] = [
  {
    type: "video",
    src: "/images/craft/buildforce-loader.webm",
    title: "Buildforce Loader",
    date: "2024",
    description: "Animated loader I created using Lottie.",
  },
  {
    type: "image",
    src: "/images/craft/gloss-genius.webp",
    title: "Gloss Genius",
    date: "2023",
    description: "A visual exercise for Gloss Genius.",
  },
  {
    type: "image",
    src: "/images/craft/buildforce-icons.webp",
    title: "Buildforce Icons",
    date: "2024",
    description:
      "Icon set I chipped away at @Buildforce. Inspiration from the blueprint and elevator iconography.",
  },
  {
    type: "image",
    src: "/images/craft/buildforce-spots.webp",
    title: "Buildforce Spots",
    date: "2024",
    description:
      "Spots I made @Buildforce. We initially started out heavy on illustrations but those take a long time to produce. I evolved our approach to a more composite grunge. Used them in product for empty states and guided onboarding.",
  },
  {
    type: "video",
    src: "/images/craft/uber-cross-dispatch.webm",
    title: "Uber Cross Dispatch",
    date: "2017",
    description:
      "A project that I worked on @Uber; created an animation in AE and various feed card assets. When supply/demand conditions are right, Uber might dispatch a vehicle of a higher class to the rider. Happened all the time but users weren't aware. We ran an experiment with this animation and feed card to see if it would drive repeat rides.",
  },
  {
    type: "image",
    src: "/images/craft/chapter-2.webp",
    title: "Chapter 2",
    date: "2014",
  },
  {
    type: "image",
    src: "/images/craft/chapter-4.webp",
    title: "Chapter 4",
    date: "2014",
  },
  {
    type: "video",
    src: "/images/craft/andy-nguyen.webm",
    title: "Andy Nguyen Portrait",
    date: "2014",
    url: "https://vimeo.com/113965742",
    description:
      "I filmed a video portrait/documentary of my nephew, Andy Nguyen. Played around with a few different lenses and techniques. Also scrappily used my iPhone to record better soundf for the interview and steps.",
  },
  {
    type: "video",
    src: "/images/craft/eod-props.webm",
    title: "Enzyme Value Props",
    date: "2019",
    description:
      "A narrative style animation I made for a marketing site @Wheel (fka Enzyme). The value props keep the provider, Julian, at the center.",
  },
];
