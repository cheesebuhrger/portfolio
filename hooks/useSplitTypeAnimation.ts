import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

export const useSplitTypeAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
  }, []);

  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>(
      ".split-type-animation, .split-type-animation-hero"
    );

    elements.forEach((element) => {
      const text = new SplitType(element, {
        types: "lines",
        tagName: "div",
        lineClass: "line",
      });

      // Wrap each line's content in a span
      text.lines?.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      // Get all spans within the lines for this specific element
      const spans = element.querySelectorAll<HTMLElement>(
        ":scope > .line > span"
      );
      const lines = text.lines;

      if (!spans || spans.length === 0 || !lines || lines.length === 0) {
        console.warn(
          "SplitType did not produce expected spans/lines for",
          element
        );
        return;
      }

      const ease = "power3.out";
      const duration = element.classList.contains("split-type-animation-hero")
        ? 1.25
        : 1;
      const stagger = 0.075;
      const delay = element.classList.contains("split-type-animation-hero")
        ? 0.5
        : 0;
      const start = element.classList.contains("split-type-animation-hero")
        ? "top bottom"
        : "top 80%";

      // Initial state for spans
      gsap.set(spans, {
        skewX: 30,
        x: 75,
        y: "100%",
        display: "block",
      });

      // Animate spans
      gsap.to(spans, {
        y: 0,
        x: 0,
        skewX: 0,
        duration: duration,
        ease: ease,
        stagger: stagger,
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: start,
          toggleActions: "play none none reverse",
        },
      });

      // Animate lines clip-path
      gsap.fromTo(
        lines,
        { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 112%, 0 112%)",
          duration: duration,
          ease: ease,
          stagger: stagger,
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: start,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  });

  return containerRef;
};
