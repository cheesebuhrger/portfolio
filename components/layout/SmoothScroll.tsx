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
  // A link to another page was clicked and its route hasn't rendered yet.
  const navigating = useRef(false);
  // Whether a route dialog was showing after the previous navigation.
  const overlayWasShown = useRef(false);
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
      // Once a navigation has started, the position no longer belongs to
      // this page: browsers can emit a stray scroll (e.g. to 0) before the
      // URL changes, which would overwrite the position the visitor left at.
      if (navigating.current) return;
      savedPositions.current.set(previousPathname.current, window.scrollY);
    };
    // A click on a link to another page starts a navigation (Back/Forward are
    // covered by popstate above). Capture phase, so this runs before any
    // handler that turns the click into a client-side navigation.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement)) return;
      if (link.target && link.target !== "_self") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same-page #hash
      // Snapshot the position at the moment of the click, then ignore scrolls
      // until the new route renders: neither a stray mid-navigation scroll nor
      // leftover smooth-scroll/trackpad momentum can overwrite it. Repeat
      // clicks while a navigation (or a Back/Forward) is still pending keep
      // the first snapshot; one pending longer than NAVIGATION_STALE_MS is
      // treated as abandoned, so the next click snapshots afresh.
      const now = performance.now();
      if (pendingHistoryPath.current !== null) {
        // Mid Back/Forward: scrollY may already belong to the incoming page,
        // so don't snapshot — but still ignore stray scrolls from here on.
        navigating.current = true;
        navigationStartedAt = now;
        return;
      }
      if (navigating.current && now - navigationStartedAt < NAVIGATION_STALE_MS) {
        return; // keep the first click's snapshot
      }
      savedPositions.current.set(previousPathname.current, window.scrollY);
      navigating.current = true;
      navigationStartedAt = now;
    };
    let navigationStartedAt = 0;
    window.addEventListener("popstate", onPopState);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick, { capture: true });
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  useLayoutEffect(() => {
    // Only on real route changes, not on first load or when Lenis initialises.
    if (!lenis || pathname === previousPathname.current) return;
    previousPathname.current = pathname;
    navigating.current = false;

    const fromHistory = pendingHistoryPath.current === pathname;
    pendingHistoryPath.current = null;

    // Route dialogs (URLs shown as a dialog over the page you were on, see
    // app/@modal) leave that page mounted: opening one, stepping between
    // items and closing it must not move it. Decided by whether such a
    // dialog is actually in the DOM (this runs after the commit's DOM
    // updates), not by the URL — the same URL can also be a full page.
    const overlayShown = !!document.querySelector("dialog[data-route-overlay]");
    const overlayClosed = !overlayShown && overlayWasShown.current;
    overlayWasShown.current = overlayShown;
    if (overlayShown || overlayClosed) return;

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

/** A click-started navigation still pending after this is treated as abandoned. */
const NAVIGATION_STALE_MS = 10_000;

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
