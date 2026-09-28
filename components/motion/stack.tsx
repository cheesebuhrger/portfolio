"use client";

import { gsap, useGSAP, withMotion } from "@/lib/gsap";

const STACK_SCRIM_CLASS = "stack-scrim";

/** Darkening overlay for useStack. Render as the last child of the element. */
export function StackScrim() {
  return (
    <div
      className={`${STACK_SCRIM_CLASS} absolute top-0 left-0 w-full h-full bg-[black] opacity-0 pointer-events-none`}
    />
  );
}

/**
 * "Stacking cards" effect: when the section's bottom reaches the bottom of
 * the viewport it pins in place, its content shrinks slightly and darkens
 * under a scrim while the next section slides over it.
 *
 * Render <StackScrim /> as the element's last child when enabled.
 */
export function useStack(
  ref: React.RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useGSAP(
    () => {
      if (!enabled || !ref.current) return;
      const element = ref.current;
      const scrim = element.querySelector(`:scope > .${STACK_SCRIM_CLASS}`);
      const content = Array.from(element.children).filter((c) => c !== scrim);

      return withMotion(() => {
        gsap.to(content, {
          scrollTrigger: {
            trigger: element,
            start: "bottom bottom",
            end: () => "+=" + window.innerHeight,
            scrub: 1,
            pin: true,
            pinSpacing: false,
          },
          scale: 0.9,
        });

        if (scrim) {
          gsap.to(scrim, {
            scrollTrigger: {
              trigger: element,
              start: "bottom bottom",
              end: () => "+=" + window.innerHeight,
              scrub: 1,
            },
            opacity: 0.9,
          });
        }
      });
    },
    { dependencies: [enabled] },
  );
}
