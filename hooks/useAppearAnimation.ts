import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useAppearAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const elements = gsap.utils.toArray<HTMLElement>(".appear");
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top 75%",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );
    });
  });

  return containerRef;
};
