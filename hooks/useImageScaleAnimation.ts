import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useImageScaleAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>(".image-scale-animation");
    elements.forEach((element) => {
      gsap.from(element, {
        scale: 1.2,
        duration: 3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          toggleActions: "play none none reverse",
          // markers:true,
        },
      });
    });

    // Handle subtle scale animation
    const subtleElements = gsap.utils.toArray<HTMLElement>(
      ".image-scale-animation-subtle"
    );
    subtleElements.forEach((element) => {
      gsap.from(element, {
        scale: 1.1,
        duration: 3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  return containerRef;
};
