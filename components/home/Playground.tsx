"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import type { PlaygroundItem } from "@/lib/types";
import Dialog from "@/components/ui/Dialog";
import Media from "@/components/ui/Media";

type PlaygroundProps = { items: PlaygroundItem[] };

const TILE_SIZES = "(min-width: 60rem) 33vw, (min-width: 30rem) 50vw, 100vw";

/** Grid of small works; each opens in a dialog with Previous/Next. */
export default function Playground({ items }: PlaygroundProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const item = items[index];

  const show = (i: number) => {
    setIndex(i);
    setOpen(true);
  };
  const close = useCallback(() => setOpen(false), []);
  const next = useCallback(
    () => setIndex((i) => (i + 1) % items.length),
    [items.length],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );

  if (items.length === 0) return null;

  return (
    <section
      id="playground"
      className="relative border-t border-border-primary p-4 md:p-6 lg:p-8"
    >
      <h2 className="text-xs font-mono uppercase mb-64">Playground</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {items.map((tile, i) => (
          <button
            key={tile.src}
            type="button"
            onClick={() => show(i)}
            aria-label={`${tile.title}, view details`}
            className="cursor-animation relative group overflow-hidden rounded-md aspect-4/3 cursor-pointer bg-surface-secondary w-full"
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
          </button>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={close}
        onPrev={prev}
        onNext={next}
        label={item.title}
      >
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
              <h2 className="text-4xl mb-4">{item.title}</h2>
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
      </Dialog>
    </section>
  );
}
