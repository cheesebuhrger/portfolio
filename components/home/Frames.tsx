import Link from "next/link";
import type { Frame } from "@/lib/types";
import { frameHref } from "@/lib/routes";
import Media from "@/components/ui/Media";

type FramesProps = { items: Frame[] };

const TILE_SIZES = "(min-width: 60rem) 33vw, (min-width: 30rem) 50vw, 100vw";

/**
 * Grid of small works. Each tile links to the item's own URL
 * (/frames/{slug}); inside the site that opens as a dialog over this
 * page (an intercepted route, app/@modal), and a shared link or refresh
 * loads the item's full page.
 */
export default function Frames({ items }: FramesProps) {
  if (items.length === 0) return null;

  return (
    <section
      id="frames"
      className="relative border-t border-border-primary p-4 md:p-6 lg:p-8"
    >
      <h2 className="text-xs font-mono uppercase mb-64">Frames</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {items.map((tile) => (
          <Link
            key={tile.slug}
            href={frameHref(tile.slug)}
            scroll={false}
            aria-label={`${tile.title}, view details`}
            className="cursor-animation relative group overflow-hidden rounded-md aspect-4/3 cursor-pointer bg-surface-secondary w-full block"
            data-cursor-text="VIEW DETAILS"
          >
            <Media
              type={tile.type}
              src={tile.src}
              alt={tile.title}
              sizes={TILE_SIZES}
              imageScaleAnimation="none"
            />
            <div className="absolute inset-0 bg-surface-overlay flex items-center justify-center p-4 text-text-on-action opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="text-center">
                <h3 className="text-2xl">{tile.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
