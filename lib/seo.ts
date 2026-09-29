/**
 * Site identity and SEO helpers — the single source for who this site is
 * about. Metadata, structured data (JSON-LD), robots, the sitemap and the
 * footer's profile links all read from here, so they can't drift apart.
 */
import type { Metadata } from "next";
import type { Frame, Project } from "./types";

export const SITE = {
  /** Primary domain. buhr.dev, buhr.design and www.* 308-redirect here (Vercel). */
  url: "https://buhrduong.com",
  name: "Buhr Duong",
  jobTitle: "Design Engineer",
  /** Homepage <title>; other pages use the "Buhr | %s" template. */
  title: "Buhr Duong: Design Engineer",
  description:
    "Buhr Duong is a design engineer who designs and builds products across interaction, motion, and prototyping, taking work from concept to production front-end.",
  business: { name: "Buhr Duong, LLC" },
  profiles: {
    linkedin: "https://linkedin.com/in/buhrduong",
    github: "https://github.com/cheesebuhrger",
    arena: "https://are.na/buhr-duong/",
  },
  knowsAbout: [
    "Product design",
    "Interaction design",
    "Motion design",
    "Prototyping",
    "Design systems",
    "Front-end development",
  ],
  /** Default share image (already 1200×630). */
  ogImage:
    "https://res.cloudinary.com/dc9cfuxqp/image/upload/v1746121545/open-graph-image_zagxbj.png?v=2",
  ogImageAlt:
    "Buhr Duong, designer, coder, builder: Bringing Ideas to Life, above a row of project thumbnails",
} as const;

/** Absolute URL for a site path. */
export const absoluteUrl = (path = "/") =>
  path === "/" ? SITE.url : `${SITE.url}${path}`;

const CLOUDINARY_ASSET =
  /^(https:\/\/res\.cloudinary\.com\/[^/]+\/(image|video)\/upload\/)(.+)\.[a-z0-9]+(?:\?.*)?$/i;

/**
 * 1200×630 JPEG share image from any Cloudinary image or video URL, via
 * Cloudinary's on-the-fly transforms (crop around the subject, auto quality).
 * Videos use the frame at `at` seconds (default: the first frame).
 * Non-Cloudinary URLs are returned unchanged.
 */
export function ogImage(
  src: string,
  { at = 0, gravity = "auto" }: { at?: number; gravity?: "auto" | "center" } = {},
): string {
  const match = src.match(CLOUDINARY_ASSET);
  if (!match) return src;
  const [, base, kind, path] = match;
  const frame = kind === "video" ? `so_${at},` : "";
  return `${base}${frame}c_fill,g_${gravity},w_1200,h_630,q_auto,f_jpg/${path}.jpg`;
}

/**
 * When a Cloudinary asset was uploaded (its /v<unix seconds>/ version), as an
 * ISO date — i.e. when it was first published on this site.
 */
export function cloudinaryUploadDate(src: string): string | undefined {
  const version = src.match(/\/v(\d{9,11})\//)?.[1];
  return version
    ? new Date(Number(version) * 1000).toISOString().slice(0, 10)
    : undefined;
}

/**
 * Complete share-preview metadata (Open Graph + Twitter) for a page. Next.js
 * replaces a parent's openGraph/twitter objects instead of merging them, so
 * every page that customises them must send the whole set.
 */
export function shareMetadata({
  path,
  title,
  description,
  image = SITE.ogImage,
  imageAlt = SITE.ogImageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const images = [
    {
      url: image,
      width: 1200,
      height: 630,
      type: /\.png(\?|$)/i.test(image) ? "image/png" : "image/jpeg",
      alt: imageAlt,
    },
  ];
  return {
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE.name,
      title,
      description,
      images,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: [SITE.url],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}

// ---------------------------------------------------------------------------
// Structured data (schema.org JSON-LD). Entities get stable @ids so every page
// refers to the same person and site.

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;
const BUSINESS_ID = `${SITE.url}/#business`;

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: SITE.name,
  jobTitle: SITE.jobTitle,
  url: SITE.url,
  description: SITE.description,
  sameAs: Object.values(SITE.profiles),
  knowsAbout: SITE.knowsAbout,
  worksFor: {
    "@type": "Organization",
    "@id": BUSINESS_ID,
    name: SITE.business.name,
    url: SITE.url,
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  publisher: { "@id": PERSON_ID },
};

/** Homepage: who the site is about. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteSchema, personSchema],
  };
}

/** Case study: an article authored by the person, about the client. */
export function caseStudyJsonLd(project: Project, path: string) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        url,
        mainEntityOfPage: url,
        headline: project.title,
        description: project.solution,
        image: ogImage(project.cover.primary.src),
        datePublished: project.published,
        dateModified: project.updated ?? project.published,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@type": "Organization", name: project.company },
        // "!" marks highlighted skills in the UI; not part of the keyword.
        keywords: project.skills.map((skill) => skill.replace(/^!/, "")),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: SITE.url },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
      websiteSchema,
      personSchema,
    ],
  };
}

/** Frame: a video or image by the person, on its own page. */
export function frameJsonLd(
  item: Frame,
  path: string,
  description: string,
) {
  const url = absoluteUrl(path);
  const thumbnail = ogImage(item.src, item.preview);
  const media =
    item.type === "video"
      ? {
          "@type": "VideoObject",
          name: item.title,
          description,
          thumbnailUrl: thumbnail,
          contentUrl: item.src,
          uploadDate: cloudinaryUploadDate(item.src),
        }
      : {
          "@type": "ImageObject",
          name: item.title,
          description,
          contentUrl: item.src,
          thumbnailUrl: thumbnail,
        };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...media,
        "@id": `${url}#media`,
        url,
        mainEntityOfPage: url,
        dateCreated: item.date,
        creator: { "@id": PERSON_ID },
        ...(item.url && { sameAs: item.url }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE.name, item: SITE.url },
          { "@type": "ListItem", position: 2, name: item.title, item: url },
        ],
      },
      websiteSchema,
      personSchema,
    ],
  };
}
