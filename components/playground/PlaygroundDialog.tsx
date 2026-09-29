"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { playgroundHref } from "@/lib/routes";
import Dialog from "@/components/ui/Dialog";

type PlaygroundDialogProps = {
  /** Every item's slug and title, in display order (for Previous/Next). */
  items: { slug: string; title: string }[];
  children: React.ReactNode;
};

/**
 * A playground item opened from inside the site: the URL is the item's own
 * (/playground/{slug}), shown as a dialog over the page you were on.
 *
 * Rendered from the intercepted route's *layout*, so it stays mounted while
 * Previous/Next swap the item inside it (no close/reopen between items).
 * Previous/Next replace the history entry, so Back still closes the dialog in
 * one step; closing goes back to exactly where you were.
 */
export default function PlaygroundDialog({
  items,
  children,
}: PlaygroundDialogProps) {
  const router = useRouter();
  const slug = useSelectedLayoutSegment();
  const index = Math.max(
    0,
    items.findIndex((item) => item.slug === slug),
  );
  const count = items.length;

  // Where Previous/Next are heading. Rapid presses step from the item still
  // on its way, not the one currently shown, so two quick presses move two.
  const pending = useRef<number | null>(null);
  useEffect(() => {
    if (pending.current !== null && items[pending.current]?.slug === slug) {
      pending.current = null;
    }
  }, [items, slug]);

  const step = useCallback(
    (delta: number) => {
      const from = pending.current ?? index;
      const to = (from + delta + count) % count;
      pending.current = to;
      router.replace(playgroundHref(items[to].slug), { scroll: false });
    },
    [router, items, index, count],
  );

  const close = useCallback(() => router.back(), [router]);
  const prev = useCallback(() => step(-1), [step]);
  const next = useCallback(() => step(1), [step]);

  return (
    <Dialog
      open
      routeOverlay
      onClose={close}
      onPrev={prev}
      onNext={next}
      label={items[index]?.title}
    >
      {children}
    </Dialog>
  );
}
