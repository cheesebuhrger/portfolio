import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FrameDetail from "@/components/frames/FrameDetail";
import JsonLd from "@/components/seo/JsonLd";
import {
  getFrame,
  getFrames,
  frameDescription,
  frameHref,
} from "@/lib/content";
import { ogImage, frameJsonLd, shareMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// Only items in content exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getFrames().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = getFrame((await params).slug);
  if (!item) return {};
  const description = frameDescription(item);

  return {
    title: item.title,
    description,
    ...shareMetadata({
      path: frameHref(item.slug),
      title: `Buhr | ${item.title}`,
      description,
      image: ogImage(item.src, item.preview),
      imageAlt: item.title,
    }),
  };
}

/**
 * A frame's own page: what a shared link, a refresh and search
 * engines get. Inside the site, the same URL opens as a dialog instead
 * (app/@modal/(.)frames). Uses the homepage Nav and Footer (see
 * usesHomeChrome), whose Projects/Frames links lead back to the homepage.
 */
export default async function FramePage({ params }: Params) {
  const { slug } = await params;
  const item = getFrame(slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-surface-background pt-28 md:pt-36 xl:pt-28">
      <JsonLd
        data={frameJsonLd(item, frameHref(slug), frameDescription(item))}
      />
      <FrameDetail item={item} headingLevel="h1" />
    </div>
  );
}
