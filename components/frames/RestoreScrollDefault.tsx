"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Turns browser scroll restoration back on as the visitor leaves this page.
 *
 * A frame dialog sets it to "manual" so refreshing with the dialog open opens
 * the full frame page at the top, and that setting sticks to this history
 * entry. It must stay "manual" for this whole load (browsers restore scroll
 * just after the load event), so it's switched back only when leaving:
 *   - pagehide: a refresh or leaving the site
 *   - a click on an in-site link: caught before the router pushes the next
 *     entry, so it applies to *this* entry (and the next one inherits it)
 *   - popstate: Back/Forward; the entry has already changed, so this keeps
 *     "manual" from carrying over to the page being shown
 * Not on unmount: that runs after the next entry exists, and React's dev
 * Strict Mode would trigger it during this load. Set through ScrollTrigger
 * so its saved copy of the setting (rewritten on every refresh) stays in sync.
 */
export default function RestoreScrollDefault() {
  useEffect(() => {
    const restore = () => ScrollTrigger.clearScrollMemory("auto");
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if (new URL(link.href, window.location.href).origin !== window.location.origin) return;
      restore();
    };
    window.addEventListener("pagehide", restore);
    window.addEventListener("popstate", restore);
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener("pagehide", restore);
      window.removeEventListener("popstate", restore);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);
  return null;
}
