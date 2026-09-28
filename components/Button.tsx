"use client";

import React, { useRef } from "react";
import { gsap, SplitText, useGSAP, withMotion } from "@/lib/gsap";
import TransitionLink from "./layout/TransitionLink";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  label,
  href,
  onClick,
  className = "",
  size = "medium",
  variant = "primary",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const hoverTl = useRef<gsap.core.Timeline | null>(null);
  const firstLabelRef = useRef<HTMLDivElement>(null);
  const secondLabelRef = useRef<HTMLDivElement>(null);

  // Hover: each character of the label flips up and out while a copy flips
  // in from below. SplitText and the timeline are reverted automatically.
  useGSAP(
    () =>
      withMotion(() => {
        if (!firstLabelRef.current || !secondLabelRef.current) return;

        const firstChars = SplitText.create(firstLabelRef.current, {
          type: "chars",
        }).chars;
        const secondChars = SplitText.create(secondLabelRef.current, {
          type: "chars",
        }).chars;

        const labelHeight = firstLabelRef.current.offsetHeight;
        const duration = 0.25;
        const ease = "power2.inOut";

        hoverTl.current = gsap
          .timeline({ paused: true })
          .to(firstChars, { duration, y: -labelHeight, rotate: 90, ease })
          .fromTo(
            secondChars,
            { y: labelHeight, rotate: -90 },
            { duration, y: 0, rotate: 0, ease },
            "<",
          );

        return () => {
          hoverTl.current = null;
        };
      }),
    { scope: rootRef, dependencies: [label] },
  );

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  const sizeClasses = {
    small: "h-8 min-w-8 px-2 text-xs rounded-sm",
    medium: "h-10 min-w-10 px-4 text-sm rounded-md",
    large: "h-12 min-w-12 px-12 text-base rounded-lg",
  };

  const variantClasses = {
    primary:
      "border border-border-primary hover:border-border-tertiary transition-all duration-30",
    secondary:
      "border-none hover:bg-surface-button-hover active:bg-surface-button-active transition-all duration-30",
  };

  const hoverHandlers = {
    onMouseEnter: () => hoverTl.current?.play(),
    onMouseLeave: () => hoverTl.current?.reverse(),
  };

  const commonClassName = `flex relative w-fit font-mono uppercase cursor-pointer justify-center items-center ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  const buttonContent = (
    <div ref={rootRef} className="relative overflow-hidden">
      <div ref={firstLabelRef} className="font-mono uppercase">
        {label}
      </div>
      <div
        ref={secondLabelRef}
        // Hover-flip copy; without motion it would sit on top of the label.
        className="absolute top-0 left-0 font-mono uppercase motion-reduce:hidden"
      >
        {label}
      </div>
    </div>
  );

  return href ? (
    <TransitionLink href={href} className={commonClassName} {...hoverHandlers}>
      {buttonContent}
    </TransitionLink>
  ) : (
    <button
      type="button"
      onClick={handleClick}
      className={commonClassName}
      {...hoverHandlers}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
