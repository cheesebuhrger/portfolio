import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const usePeelMediaAnimation = () => {
  useGSAP(() => {
    // Handle right-to-left animations
    const leftElements = document.querySelectorAll(
      ".peel-media-animation-left"
    );
    // Handle left-to-right animations
    const rightElements = document.querySelectorAll(
      ".peel-media-animation-right"
    );

    const setupAnimation = (element: Element, fromLeft: boolean) => {
      gsap.set(element, {
        transformOrigin: fromLeft ? "top left" : "top right",
      });

      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
          markers: true,
        },
        x: fromLeft ? "-100%" : "100%",
        rotateX: 90,
        rotateZ: fromLeft ? 90 : -90,
        duration: 2,
        ease: "power3.out",
      });
    };

    // Apply animations to all elements
    leftElements.forEach((element) => setupAnimation(element, true));
    rightElements.forEach((element) => setupAnimation(element, false));
  }, []);
};
