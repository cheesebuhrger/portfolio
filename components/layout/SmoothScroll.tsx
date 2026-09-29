"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "@/lib/gsap";

// One Lenis instance for the whole site. `root` renders children without a
// wrapper element and makes the instance available to useLenis() anywhere.
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
      <ResetScrollOnNavigate />
      {children}
    </ReactLenis>
  );
}

/**
 * Puts each newly navigated page at the right scroll position.
 *
 * Next positions the page after navigation, but only after the new page has
 * created its ScrollTriggers at the *old* scroll position. ScrollTrigger's
 * refresh then restores that remembered position, undoing Next's scroll. So we
 * position the page ourselves, in a layout effect that runs before the page's
 * own effects (this renders before {children}; the new DOM already exists):
 *   - normal link → top
 *   - #hash link → the target element
 *   - browser back/forward → where the visitor was when they left that page
 * then clear ScrollTrigger's remembered position.
 */
function ResetScrollOnNavigate() {
  const lenis = useLenis();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  // Path a back/forward is heading to, until that page renders.
  const pendingHistoryPath = useRef<string | null>(null);
  // Last scroll position per path, for back/forward. The browser's own
  // restoration lands too late (after ScrollTrigger has already refreshed).
  // Keyed by path, not history entry: revisiting a page restores the most
  // recent visit's position.
  const savedPositions = useRef(new Map<string, number>());

  useEffect(() => {
    const onPopState = () => {
      // Only track back/forward that changes page; a same-path popstate (e.g.
      // between #hash entries) never reaches the route-change effect.
      const path = window.location.pathname;
      pendingHistoryPath.current =
        path !== previousPathname.current ? path : null;
    };
    const onScroll = () => {
      const pending = pendingHistoryPath.current;
      if (pending !== null) {
        // During back/forward the browser scrolls before React swaps pages;
        // that position belongs to the incoming page, so don't record it.
        if (window.location.pathname === pending) return;
        // The URL moved on (e.g. a link clicked before the back/forward
        // rendered), so that navigation was superseded.
        pendingHistoryPath.current = null;
      }
      savedPositions.current.set(previousPathname.current, window.scrollY);
    };
    window.addEventListener("popstate", onPopState);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    // Only on real route changes, not on first load or when Lenis initialises.
    if (!lenis || pathname === previousPathname.current) return;
    const leaving = previousPathname.current;
    previousPathname.current = pathname;

    const fromHistory = pendingHistoryPath.current === pathname;
    pendingHistoryPath.current = null;

    // Overlay routes (dialogs with their own URL, see app/@modal) open over
    // the page you were on, which stays mounted: opening, stepping between
    // items and closing with Back must not move it.
    const opensOverlay = isOverlayRoute(pathname);
    const closesOverlay = fromHistory && isOverlayRoute(leaving);
    if (opensOverlay || closesOverlay) return;

    const hashTarget = getHashTarget();
    const target = fromHistory
      ? (savedPositions.current.get(pathname) ?? 0)
      : (hashTarget ?? 0);

    const jump = () => {
      // stop() + start() cancels any in-flight smooth scroll and re-syncs
      // Lenis to the real scroll position (public API for its internal
      // reset). Without the re-sync, Lenis skips a jump to where it *thinks*
      // it already is.
      lenis.stop();
      lenis.start();
      // Lenis clamps jumps to its cached page height, which is still the
      // previous page's until its resize observer fires; coming from a short
      // page, a jump down this one would stop short. Re-measure first.
      lenis.resize();
      lenis.scrollTo(target, { immediate: true, force: true });
    };
    jump();
    ScrollTrigger.clearScrollMemory();

    // Layout can still shift after the jump (e.g. text splitting into lines
    // above the viewport, which the browser's scroll anchoring compensates
    // for), and ScrollTrigger's first refresh then locks in the shifted
    // position. Re-apply the target once that refresh is done.
    //
    // Pages without ScrollTriggers never refresh, so disarm on the visitor's
    // first input or after a moment; otherwise a later resize would snap
    // them back to the target mid-read.
    const disarm = () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      clearTimeout(timeout);
      for (const type of INPUT_EVENTS) window.removeEventListener(type, disarm);
    };
    const onRefresh = () => {
      disarm();
      jump();
    };
    const timeout = setTimeout(disarm, 1000);
    ScrollTrigger.addEventListener("refresh", onRefresh);
    for (const type of INPUT_EVENTS) {
      window.addEventListener(type, disarm, { passive: true, once: true });
    }
    return disarm;
  }, [lenis, pathname]);

  return null;
}

/** Routes shown as a dialog over the current page when navigated to in-app. */
const isOverlayRoute = (path: string) => path.startsWith("/playground/");

const INPUT_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

function getHashTarget(): HTMLElement | null {
  const raw = window.location.hash.slice(1);
  if (!raw) return null;
  let id = raw;
  try {
    id = decodeURIComponent(raw);
  } catch {
    // Malformed percent-encoding in a shared link: use the hash as written.
  }
  return document.getElementById(id);
}
