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
    src: "https://res.cloudinary.com/dc9cfuxqp/video/upload/v1770667545/abodemoney-loader_srqqc5.webm",
    title: "Abode Money Loader",
    date: "2026",
    description: "Animated loader for Abode Money with Rive.",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dc9cfuxqp/video/upload/v1742872389/buildforce-loader_ntpl4q.webm",
    title: "Buildforce Loader",
    date: "2024",
    description: "Animated loader I created using Lottie.",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742872388/gloss-genius_jo1q9t.webp",
    title: "Gloss Genius",
    date: "2023",
    description: "A visual exercise for Gloss Genius.",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742872387/buildforce-icons_gzy72y.webp",
    title: "Buildforce Icons",
    date: "2024",
    description:
      "Icon set I chipped away at @Buildforce. Inspiration from the blueprint and elevator iconography.",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742872387/buildforce-spots_zhudiu.webp",
    title: "Buildforce Spots",
    date: "2024",
    description:
      "Spots I made @Buildforce. We initially started out heavy on illustrations but those take a long time to produce. I evolved our approach to a more composite grunge. Used them in product for empty states and guided onboarding.",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dc9cfuxqp/video/upload/v1742872390/uber-cross-dispatch_fpunmd.webm",
    title: "Uber Cross Dispatch",
    date: "2017",
    description:
      "A project that I worked on @Uber; created an animation in AE and various feed card assets. When supply/demand conditions are right, Uber might dispatch a vehicle of a higher class to the rider. Happened all the time but users weren't aware. We ran an experiment with this animation and feed card to see if it would drive repeat rides.",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742872388/chapter-2_hjku1l.webp",
    title: "Chapter 2",
    date: "2014",
  },
  {
    type: "image",
    src: "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1742872388/chapter-4_tdbtuv.webp",
    title: "Chapter 4",
    date: "2014",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dc9cfuxqp/video/upload/v1742872391/andy-nguyen_eg7k6a.webm",
    title: "Andy Nguyen Portrait",
    date: "2014",
    url: "https://vimeo.com/113965742",
    description:
      "I filmed a video portrait/documentary of my nephew, Andy Nguyen. Played around with a few different lenses and techniques. Also scrappily used my iPhone to record better sound for the interview and choreo.",
  },
  {
    type: "video",
    src: "https://res.cloudinary.com/dc9cfuxqp/video/upload/v1742872389/eod-props_r90nda.webm",
    title: "Enzyme Value Props",
    date: "2019",
    description:
      "A narrative style animation I made for a marketing site @Wheel (fka Enzyme). The value props keep the provider, Julian, at the center.",
  },
];
