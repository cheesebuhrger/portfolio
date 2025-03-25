import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useStackAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>(".stack-animation");
    elements.forEach((element) => {
      // Add scrim element
      const scrim = document.createElement("div");
      scrim.className =
        "scrim absolute top-0 left-0 w-full h-full bg-[black] opacity-0 pointer-events-none";
      element.appendChild(scrim);

      gsap.to(
        Array.from(element.children).filter(
          (child) => !child.classList.contains("scrim")
        ),
        {
          scrollTrigger: {
            trigger: element,
            start: "bottom bottom",
            end: () => "+=" + window.innerHeight,
            scrub: 1,
            // markers: true,
            pin: true,
            pinSpacing: false,
          },
          scale: 0.9,
        }
      );

      gsap.to(scrim, {
        scrollTrigger: {
          trigger: element,
          start: "bottom bottom",
          end: () => "+=" + window.innerHeight,
          scrub: 1,
        },
        opacity: 0.9,
      });
    });
  });

  return containerRef;
};
