import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import PlaygroundDetail from "@/components/playground/PlaygroundDetail";
import JsonLd from "@/components/seo/JsonLd";
import {
  getAdjacentPlaygroundItems,
  getPlaygroundItem,
  getPlaygroundItems,
  playgroundDescription,
  playgroundHref,
} from "@/lib/content";
import { ogImage, playgroundJsonLd, shareMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// Only items in content exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getPlaygroundItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = getPlaygroundItem((await params).slug);
  if (!item) return {};
  const description = playgroundDescription(item);

  return {
    title: item.title,
    description,
    ...shareMetadata({
      path: playgroundHref(item.slug),
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
 * A playground item's own page: what a shared link, a refresh and search
 * engines get. Inside the site, the same URL opens as a dialog instead
 * (app/@modal/(.)playground).
 */
export default async function PlaygroundItemPage({ params }: Params) {
  const { slug } = await params;
  const item = getPlaygroundItem(slug);
  if (!item) notFound();
  const { prev, next } = getAdjacentPlaygroundItems(slug);

  return (
    <div className="min-h-screen bg-surface-background pt-20 md:pt-24">
      <JsonLd
        data={playgroundJsonLd(item, playgroundHref(slug), playgroundDescription(item))}
      />
      <nav
        aria-label="Playground"
        className="flex flex-row justify-between w-full px-6 py-4 border-b border-border-secondary"
      >
        <Button
          href="/#playground"
          label="All Playground"
          size="small"
          variant="secondary"
        />
        <div className="flex gap-4 text-xs">
          <a href={playgroundHref(prev.slug)} className={STEP_LINK}>
            Previous
          </a>
          <a href={playgroundHref(next.slug)} className={STEP_LINK}>
            Next
          </a>
        </div>
      </nav>
      <PlaygroundDetail item={item} headingLevel="h1" />
    </div>
  );
}
