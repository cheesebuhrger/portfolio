import Link from "next/link";
import type { PlaygroundItem } from "@/lib/types";
import Media from "@/components/ui/Media";

/**
 * A playground item's media and details. Shared by the dialog (opened from
 * the homepage) and the item's full page (a shared link or refresh), so both
 * show exactly the same thing.
 */
export default function PlaygroundDetail({
  item,
  headingLevel = "h2",
}: {
  item: PlaygroundItem;
  /** h1 on the item's own page; h2 in the dialog (the page behind has the h1). */
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;
  return (
    <div className="mx-auto max-w-[1600px] w-full">
      <div className="flex flex-col gap-4 md:gap-8 lg:flex-row p-4 md:p-8 h-auto">
        <div className="flex-shrink-0 lg:w-2/3">
          <div className="w-full h-0 pb-[75%] relative">
            <div className="absolute inset-0 rounded-md overflow-hidden">
              <Media
                key={item.src}
                type={item.type}
                src={item.src}
                alt={item.title}
                sizes="(min-width: 60rem) 66vw, 100vw"
                imageScaleAnimation="none"
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <Heading className="text-4xl mb-4">{item.title}</Heading>
          <div className="flex flex-row mb-4 text-base">
            {item.date && <p>{item.date}</p>}
            {item.url && <p className="mx-4">/</p>}
            {item.url && (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-action text-base"
              >
                View
              </Link>
            )}
          </div>
          <p className="text-base">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
