import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import FrameDetail from "@/components/frames/FrameDetail";
import JsonLd from "@/components/seo/JsonLd";
import {
  getAdjacentFrames,
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

// Styled like Button (small, secondary) but a plain <a>: a full navigation,
// so Next doesn't intercept it into a dialog over this page.
const STEP_LINK =
  "flex relative w-fit font-mono uppercase justify-center items-center h-8 min-w-8 px-2 text-xs rounded-sm hover:bg-surface-button-hover active:bg-surface-button-active transition-all duration-30";

/**
 * A frame's own page: what a shared link, a refresh and search
 * engines get. Inside the site, the same URL opens as a dialog instead
 * (app/@modal/(.)frames).
 */
export default async function FramePage({ params }: Params) {
  const { slug } = await params;
  const item = getFrame(slug);
  if (!item) notFound();
  const { prev, next } = getAdjacentFrames(slug);

  return (
    <div className="min-h-screen bg-surface-background pt-20 md:pt-24">
      <JsonLd
        data={frameJsonLd(item, frameHref(slug), frameDescription(item))}
      />
      <nav
        aria-label="Frames"
        className="flex flex-row justify-between w-full px-6 py-4 border-b border-border-secondary"
      >
        <Button
          href="/#frames"
          label="All Frames"
          size="small"
          variant="secondary"
        />
        <div className="flex gap-4 text-xs">
          <a href={frameHref(prev.slug)} className={STEP_LINK}>
            Previous
          </a>
          <a href={frameHref(next.slug)} className={STEP_LINK}>
            Next
          </a>
        </div>
      </nav>
      <FrameDetail item={item} headingLevel="h1" />
    </div>
  );
}
