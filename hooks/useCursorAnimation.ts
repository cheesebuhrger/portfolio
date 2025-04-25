import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const useCursorAnimation = () => {
  useGSAP(() => {
    // Check if elements exist before setting up animations
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorText = document.querySelector(".cursor-text");

    if (!cursorDot || !cursorText) {
      console.warn("Cursor elements not found, skipping animation setup");
      return;
    }

    // Initial setup
    gsap.set(cursorDot, {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });
    gsap.set(cursorText, {
      scale: 0,
      xPercent: -50,
      yPercent: -75,
      opacity: 0,
    });

    let isVisible = false;
    const cursorEase = "power3";

    const mouseMove = (e: MouseEvent): void => {
      if (!isVisible) {
        gsap.set([cursorDot, cursorText], { opacity: 1 });
        isVisible = true;
      }

      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: cursorEase,
        overwrite: "auto",
      });
      gsap.to(cursorText, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: cursorEase,
      });
    };

    const targets = gsap.utils.toArray(".cursor-animation") as Element[];
    const cursorScale = gsap.timeline({ paused: true });

    cursorScale
      .to(cursorText, {
        scale: 1,
        duration: 0.35,
        ease: "power2.inOut",
      })
      .to(
        cursorDot,
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
