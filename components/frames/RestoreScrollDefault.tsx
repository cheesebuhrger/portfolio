"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Turns browser scroll restoration back on once the visitor leaves this page:
 * on pagehide (a refresh or leaving the site) and on unmount (an in-site
 * navigation, which doesn't fire pagehide).
 *
 * A frame dialog sets it to "manual" so refreshing with the dialog open opens
 * the full frame page at the top, and that setting sticks to the entry. It
 * must stay "manual" for this whole load: browsers restore scroll just after
 * the load event, so switching back while loading can still apply the old
 * position. Set through ScrollTrigger so its saved copy of the setting (which
 * it rewrites on every refresh) stays in sync.
 */
export default function RestoreScrollDefault() {
  useEffect(() => {
    const restore = () => ScrollTrigger.clearScrollMemory("auto");
    window.addEventListener("pagehide", restore);
    return () => {
      window.removeEventListener("pagehide", restore);
      restore();
    };
  }, []);
  return null;
}
