"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";

// Any element with this class grows the cursor on hover. Its
// data-cursor-text attribute sets the label.
const TARGET_SELECTOR = ".cursor-animation";
const CURSOR_EASE = "power3";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);
  const activeTarget = useRef<Element | null>(null);
  const pathname = usePathname();

  useGSAP(() => {
    // Mouse-driven only. Touch devices never see the cursor (also hidden in CSS).
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const dot = dotRef.current!;
    const label = labelRef.current!;

    gsap.set(dot, { scale: 0, xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(label, { scale: 0, xPercent: -50, yPercent: -75, opacity: 0 });

    const tl = gsap
      .timeline({ paused: true })
      .to(label, { scale: 1, duration: 0.35, ease: "power2.inOut" })
      .to(
        dot,
        {
          scale: 1,
          duration: 0.35,
          backgroundColor: "#C71010",
          ease: "power2.inOut",
          yPercent: -75,
        },
        "<",
      );
    hoverTl.current = tl;

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.set([dot, label], { opacity: 1 });
        isVisible = true;
      }
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: CURSOR_EASE,
        overwrite: "auto",
      });
      gsap.to(label, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: CURSOR_EASE,
      });
    };

    // One delegated listener instead of one per target, so targets that
    // mount later (modals, new pages) work without re-scanning the DOM.
    const onMouseOver = (e: MouseEvent) => {
      const target =
        e.target instanceof Element ? e.target.closest(TARGET_SELECTOR) : null;
      if (target === activeTarget.current) return;
      activeTarget.current = target;

      if (target) {
        const text = target.getAttribute("data-cursor-text");
        if (text && textRef.current) textRef.current.textContent = text;
        tl.play();
      } else {
        tl.reverse();
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  // The cursor persists across navigations; start each page un-hovered,
  // like a freshly mounted cursor.
  useEffect(() => {
    activeTarget.current = null;
    hoverTl.current?.pause(0);
  }, [pathname]);

  return (
    <div className="hidden [@media(hover:hover)_and_(pointer:fine)]:block">
      <div
        ref={labelRef}
        className="cursor-text opacity-0 fixed top-0 left-0 rounded-[1000px] w-28 h-28 pointer-events-none z-[50] flex items-center justify-center bg-black text-text-primary-negative"
      >
        <span ref={textRef} className="font-mono text-xs uppercase text-center">
          VIEW MORE
        </span>
      </div>
      <div
        ref={dotRef}
        className="cursor-dot opacity-0 fixed top-0 left-0 rounded-[1000px] w-28 h-28 bg-surface-primary-negative pointer-events-none z-[49]"
      ></div>
    </div>
  );
}
