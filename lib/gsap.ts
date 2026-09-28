import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register plugins once for the whole app. Import gsap from here, not "gsap".
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Runs `setup` only when the visitor hasn't asked for reduced motion, and
 * reverts it if that preference changes. Return the result from a useGSAP
 * callback so it's cleaned up on unmount:
 *
 *   useGSAP(() => withMotion(() => { gsap.to(...) }), { scope: ref });
 */
export function withMotion(setup: () => void | (() => void)) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", setup);
  return () => mm.revert();
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
