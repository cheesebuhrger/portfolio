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
  const isHistoryNavigation = useRef(false);
  // Last scroll position per path, for back/forward. The browser's own
  // restoration lands too late (after ScrollTrigger has already refreshed).
  const savedPositions = useRef(new Map<string, number>());

  useEffect(() => {
    const onPopState = () => {
      isHistoryNavigation.current = true;
    };
    const onScroll = () => {
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
    previousPathname.current = pathname;

    const fromHistory = isHistoryNavigation.current;
    isHistoryNavigation.current = false;

    const hashTarget = window.location.hash
      ? document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      : null;
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
      lenis.scrollTo(target, { immediate: true, force: true });
    };
    jump();
    ScrollTrigger.clearScrollMemory();

    // Layout can still shift after the jump (e.g. text splitting into lines
    // above the viewport, which the browser's scroll anchoring compensates
    // for), and ScrollTrigger's first refresh then locks in the shifted
    // position. Re-apply the target once that refresh is done.
    const onRefresh = () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      jump();
    };
    ScrollTrigger.addEventListener("refresh", onRefresh);
    return () => ScrollTrigger.removeEventListener("refresh", onRefresh);
  }, [lenis, pathname]);

  return null;
}
