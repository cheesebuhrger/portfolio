import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useEffect, useRef } from "react";

export const useSplitTypeAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<NodeListOf<HTMLElement> | null>(null);

  useGSAP(() => {
    // Check if we're on medium devices or larger
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    // Function to handle media query changes
    const handleMediaQueryChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      if (e.matches) {
        // On medium and up, observe elements
        elementsRef.current?.forEach((el) => {
          observerRef.current?.observe(el);
        });
      } else {
        // On small screens, disconnect observer
        observerRef.current?.disconnect();
      }
    };

    // Initial check
    handleMediaQueryChange(mediaQuery);

    // Listen for changes
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    elementsRef.current = document.querySelectorAll<HTMLElement>(
      ".split-type-animation, .split-type-animation-hero"
    );

    if (!elementsRef.current || elementsRef.current.length === 0) {
      return;
    }

    const setupAnimation = (element: HTMLElement) => {
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
      const lines = text.lines; // Get lines for this specific element

      if (!spans || spans.length === 0 || !lines || lines.length === 0) {
        console.warn(
          "SplitType did not produce expected spans/lines for",
          element
        );
        return; // Avoid GSAP errors if split fails
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
        display: "block", // Keeping block as per previous state
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

      // Return cleanup function for this specific element's animations/split
      return () => {
        if (text) text.revert();
        // GSAP ScrollTriggers associated with the element are automatically killed by GSAP's context cleanup
      };
    };

    // Using IntersectionObserver to lazy-load animations
    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            setupAnimation(element); // Setup animation for the intersecting element
            observer.unobserve(element); // Stop observing once setup is done
          }
        });
      },
      {
        rootMargin: "0px 0px 50% 0px", // Trigger when element is 10% from bottom edge
      }
    );

    // Cleanup function for the hook
    return () => {
      observerRef.current?.disconnect();
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);
};
