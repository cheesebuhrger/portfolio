import { useEffect } from "react";
import { gsap } from "gsap";

export const useCursorAnimation = () => {
  useEffect(() => {
    // Initial setup
    gsap.set(".cursor-dot", {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });
    gsap.set(".cursor-text", {
      scale: 0,
      xPercent: -50,
      yPercent: -75,
      opacity: 0,
    });

    let isVisible = false;
    const cursorEase = "power3";

    const mouseMove = (e: MouseEvent): void => {
      if (!isVisible) {
        gsap.set([".cursor-dot", ".cursor-text"], { opacity: 1 });
        isVisible = true;
      }

      gsap.to(".cursor-dot", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: cursorEase,
        overwrite: "auto",
      });
      gsap.to(".cursor-text", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: cursorEase,
      });
    };

    const targets = gsap.utils.toArray(".cursor-animation") as Element[];
    const cursorScale = gsap.timeline({ paused: true });

    cursorScale
      .to(".cursor-text", {
        scale: 1,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .to(
        ".cursor-dot",
        {
          scale: 1,
          duration: 0.35,
          backgroundColor: "#C71010",
          ease: "power2.inOut",
          yPercent: -75,
        },
        "<"
      );

    // Event listeners
    document.addEventListener("mousemove", mouseMove);

    targets.forEach((target) => {
      target.addEventListener("mouseenter", () => {
        const cursorText = target.getAttribute("data-cursor-text");
        if (cursorText) {
          const textElement = document.querySelector(".cursor-text span");
          if (textElement) {
            textElement.textContent = cursorText;
          }
        }
        cursorScale.play();
      });
      target.addEventListener("mouseleave", () => {
        cursorScale.reverse();
      });
    });

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", mouseMove);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", () => cursorScale.play());
        target.removeEventListener("mouseleave", () => cursorScale.reverse());
      });
    };
  }, []);
};
