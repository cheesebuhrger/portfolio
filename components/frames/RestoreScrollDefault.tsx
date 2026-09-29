"use client";

import { useEffect } from "react";

/**
 * Turns browser scroll restoration back on for this history entry when the
 * visitor leaves the page (including a refresh).
 *
 * A frame dialog sets it to "manual" so refreshing with the dialog open
 * opens the full frame page at the top. That setting sticks to the entry.
 * It must stay "manual" for this whole load: browsers restore scroll just
 * after the load event (and GSAP's load-time refresh touches the setting
 * too), so switching it back while loading can still apply the old
 * position. Switching on pagehide instead means the *next* load of this
 * entry (e.g. refreshing a scrolled frame page) restores normally.
 */
export default function RestoreScrollDefault() {
  useEffect(() => {
    const restore = () => {
      window.history.scrollRestoration = "auto";
    };
    window.addEventListener("pagehide", restore);
    return () => window.removeEventListener("pagehide", restore);
  }, []);
  return null;
}
