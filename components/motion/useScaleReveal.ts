"use client";

import { gsap, useGSAP, withMotion } from "@/lib/gsap";

export type ScaleReveal = "default" | "subtle" | "none";

const FROM_SCALE: Record<Exclude<ScaleReveal, "none">, number> = {
  default: 1.2,
  subtle: 1.1,
};

/**
 * Media eases down from slightly zoomed-in as it scrolls into view.
 * Only animates the element in `ref`.
 */
export function useScaleReveal(
  ref: React.RefObject<HTMLElement | null>,
  variant: ScaleReveal = "default",
) {
  useGSAP(
    () => {
      if (variant === "none" || !ref.current) return;
      const element = ref.current;

      return withMotion(() => {
        gsap.from(element, {
          scale: FROM_SCALE[variant],
          duration: 3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { dependencies: [variant] },
  );
}
