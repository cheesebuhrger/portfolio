"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, withMotion } from "@/lib/gsap";

type Variant = "hero" | "default";

// Same values as the original split-type reveal this replaced.
const SETTINGS: Record<
  Variant,
  { duration: number; delay: number; start: string }
> = {
  hero: { duration: 1.25, delay: 0.5, start: "top bottom" },
  default: { duration: 1, delay: 0, start: "top 80%" },
};
const EASE = "power3.out";
const STAGGER = 0.075;
const CLIP_CLOSED = "polygon(0 0, 100% 0, 100% 0, 0 0)";
const CLIP_OPEN = "polygon(0 0, 100% 0, 100% 112%, 0 112%)";

type SplitRevealProps = {
  as?: React.ElementType;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

/**
 * Reveals its text line by line as it scrolls into view. Only animates its
 * own element, so any number can be on a page. With reduced motion the text
 * is left as-is.
 *
 * Structure SplitText produces (mask: "lines"):
 *   .split-line-mask  ← clip-path opens top-to-bottom
 *     .split-line     ← slides up from below, un-skewing
 */
export default function SplitReveal({
  as: Tag = "div",
  variant = "default",
  className,
  children,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      withMotion(() => {
        const { duration, delay, start } = SETTINGS[variant];

        SplitText.create(ref.current!, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          // Re-split on resize and after web fonts load so line breaks stay correct.
          autoSplit: true,
          onSplit(self) {
            // SplitText masks with overflow: clip; the animated clip-path does
            // the masking instead (it extends to 112% so descenders aren't cut).
            gsap.set(self.masks, { overflow: "visible" });

            // Returning the timeline lets SplitText kill and rebuild it on re-split.
            return gsap
              .timeline({
                scrollTrigger: {
                  trigger: ref.current,
                  start,
                  toggleActions: "play none none reverse",
                },
              })
              .fromTo(
                self.lines,
                { skewX: 30, x: 75, y: "100%" },
                {
                  y: 0,
                  x: 0,
                  skewX: 0,
                  duration,
                  ease: EASE,
                  stagger: STAGGER,
                  delay,
                },
                0,
              )
              .fromTo(
                self.masks,
                { clipPath: CLIP_CLOSED },
                {
                  clipPath: CLIP_OPEN,
                  duration,
                  ease: EASE,
                  stagger: STAGGER,
                  delay,
                },
                0,
              );
          },
        });
      }),
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
