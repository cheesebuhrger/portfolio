import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface TooltipProps {
  primary: string;
  secondary?: string;
  children: ReactNode;
}

const Tooltip = ({ primary, secondary, children }: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Find the tooltip-trigger sibling
    const tooltipTrigger =
      tooltipRef.current?.parentElement?.querySelector(".tooltip-trigger");
    if (!tooltipRef.current || !tooltipTrigger) return;

    const tooltipTimeline = gsap.timeline({ paused: true });

    tooltipTimeline
      .to(tooltipRef.current, {
        y: -8,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .to(
        tooltipRef.current,
        {
          opacity: 1,
          delay: 0.25,
          duration: 0.3,
          display: "block",
          ease: "power2.inOut",
        },
        "<"
      ); // The "<" makes this animation start at the same time as the previous one

    const handleMouseEnter = () => {
      tooltipTimeline.play();
    };

    const handleMouseLeave = () => {
      tooltipTimeline.reverse();
    };

    tooltipTrigger.addEventListener("mouseenter", handleMouseEnter);
    tooltipTrigger.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tooltipTrigger.removeEventListener("mouseenter", handleMouseEnter);
      tooltipTrigger.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // No dependencies needed now

  return (
    <div className="relative flex flex-col items-center">
      <div className="tooltip-trigger">{children}</div>
      <div
        ref={tooltipRef}
        className="tooltip z-10 hidden opacity-0 absolute bg-surface-primary-negative rounded-sm p-2 whitespace-nowrap pointer-events-none max-w-80 origin-bottom bottom-full"
      >
        <div className="text-xs text-text-primary-negative">{primary}</div>
        {secondary && (
          <div className="text-xs text-text-secondary-negative">
            {secondary}
          </div>
        )}
      </div>
    </div>
  );
};

export { Tooltip };
