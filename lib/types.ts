import type { AnimatedIconType } from "@/components/icons";

/**
 * Plain-string rich text, kept serialisable so content can move to a CMS.
 *   **like this**   → highlighted (text-action colour)
 *   blank line      → new paragraph (<p> in text-block bodies; a double line
 *                     break elsewhere, since those slots are already inside <p>/<h2>)
 * Use real typographic characters (’ “ ”) rather than HTML entities.
 */
export type RichText = string;

export type Media =
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: RichText;
    }
  | {
      type: "video";
      src: string;
      alt: string;
      caption?: RichText;
      poster?: string;
      autoPlay?: boolean;
      loop?: boolean;
      muted?: boolean;
      controls?: boolean;
    };

export type Stat = {
  title: RichText;
  value: string;
  footnote?: string;
  direction?: "up" | "down" | "unknown" | "none";
};

/** A case study is a list of sections, each a list of these blocks. */
export type Block =
  | {
      type: "text";
      headline?: RichText;
      body?: RichText;
      animateHeadline?: boolean;
    }
  | {
      type: "media";
      layout: "full" | "double" | "mockup";
      media: Media[];
      /** Mockup backdrop: a colour (hex) and/or an image URL. */
      background?: { color?: string; image?: string };
    }
  | {
      type: "stats";
      media: Media;
      /** Up to four; null leaves an empty slot in the 2×2 grid. */
      stats: (Stat | null)[];
      position: "left" | "right";
    }
  | {
      type: "quote";
      writer?: { name: string; role?: string; image?: string };
      snippet: RichText;
      full?: RichText;
    }
  | {
      /** Row of bordered cards with short serif statements. */
      type: "callouts";
      items: RichText[];
    }
  | {
      /** Keeps blocks tight together (smaller gap than between blocks). */
      type: "group";
      blocks: Block[];
    };

export type Section = {
  number: string;
  label: string;
  icon?: AnimatedIconType;
  /** Pin and darken under the next section as it scrolls over. */
  stack?: boolean;
  blocks: Block[];
};

export type TeamMember = {
  name: string;
  image: string;
  href?: string;
  role?: string;
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  role: string;
  year: string;
  duration: string;
  /** First published on the site (ISO date, e.g. "2024-07-05"). */
  published: string;
  /** Last meaningful content change (ISO date); omit if never updated. */
  updated?: string;
  problem: string;
  solution: string;
  skills: string[];
  team: TeamMember[];
  cover: {
    primary: { src: string; alt: string };
    secondary: { src: string; alt: string };
  };
  /** Pin and darken the hero under the first section. */
  stackHero?: boolean;
  sections: Section[];
  end: {
    /** Full-bleed image before "The Nitty Gritty". */
    image: string;
    process: string[];
  };
};

/** A tile in the homepage Playground grid (opens in the detail dialog). */
export type PlaygroundItem = {
  /** URL segment: /playground/{slug}. Hand-written so URLs stay stable. */
  slug: string;
  type: "image" | "video";
  src: string;
  title: string;
  date: string;
  description?: string;
  /** External link, shown as "View" in the dialog. */
  url?: string;
  /**
   * Share-preview tweaks: for videos, the moment (seconds) to take the frame
   * from — the first frame of a loader can be blank — and how to crop it.
   */
  preview?: { at?: number; gravity?: "auto" | "center" };
};
