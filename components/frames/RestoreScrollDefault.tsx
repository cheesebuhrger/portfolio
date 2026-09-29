"use client";

import { useEffect } from "react";

/**
 * Turns browser scroll restoration back on for this history entry.
 *
 * A frame dialog sets it to "manual" so refreshing with the dialog open
 * opens the full frame page at the top. That setting sticks to the entry;
 * resetting it here (after the browser has already positioned this load)
 * means a later refresh of the scrolled full page restores normally.
 */
export default function RestoreScrollDefault() {
  useEffect(() => {
    window.history.scrollRestoration = "auto";
  }, []);
  return null;
}
