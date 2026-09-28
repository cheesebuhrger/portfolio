"use client";

import { ReactLenis } from "lenis/react";

// One Lenis instance for the whole site. `root` renders children without a
// wrapper element and makes the instance available to useLenis() anywhere.
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactLenis root>{children}</ReactLenis>;
}
