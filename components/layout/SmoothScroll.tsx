"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

// One Lenis instance for the whole site. `root` renders children without a
// wrapper element and makes the instance available to useLenis() anywhere.
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root>
      <CancelScrollOnNavigate />
      {children}
    </ReactLenis>
  );
}

// The instance outlives page navigations. Without this, a smooth scroll still
// in flight when a link is clicked keeps animating on the next page and fights
// Next's scroll-to-top / #hash positioning. stop() + start() cancels the
// animation and re-syncs Lenis to the real scroll position (public API for its
// internal reset), so Next stays in charge.
function CancelScrollOnNavigate() {
  const lenis = useLenis();
  const pathname = usePathname();

  // Layout effect, not useEffect: Next positions the new page in its own layout
  // effects (which run after this one, since we render before {children}). A
  // passive effect could run after a Lenis frame has already dragged the page
  // back toward the old scroll target.
  useLayoutEffect(() => {
    lenis?.stop();
    lenis?.start();
  }, [lenis, pathname]);

  return null;
}
