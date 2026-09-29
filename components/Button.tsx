"use client";

import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/gsap";
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
  const hoverTl = useRef<gsap.core.Timeline | null>(null);
  const firstLabelRef = useRef<HTMLDivElement>(null);
  const secondLabelRef = useRef<HTMLDivElement>(null);
  const splitTypeRef = useRef<SplitType | null>(null);
  const secondSplitTypeRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!firstLabelRef.current || !secondLabelRef.current) return;

    // Initialize SplitType for both labels
    splitTypeRef.current = new SplitType(firstLabelRef.current, {
      types: "chars",
    });
    secondSplitTypeRef.current = new SplitType(secondLabelRef.current, {
      types: "chars",
    });

    // Get the height of the first label
    const labelHeight = firstLabelRef.current.offsetHeight;

    // Create timeline for hover animation
    const tl = gsap.timeline({ paused: true });

    const animationDuration = 0.25;
    const animationStagger = 0.0;
    const animationEase = "power2.inOut";

    // Animate first label out
    tl.to(splitTypeRef.current.chars, {
      duration: animationDuration,
      y: -labelHeight,
      rotate: 90,
      stagger: animationStagger,
      ease: animationEase,
    });

    // Animate second label in
    tl.fromTo(
      secondSplitTypeRef.current.chars,
      {
        duration: animationDuration,
        y: labelHeight,
        rotate: -90,
        stagger: animationStagger,
        ease: animationEase,
      },
      {
        duration: animationDuration,
        y: 0,
        rotate: 0,
        stagger: animationStagger,
        ease: animationEase,
      },
      "<"
    );

    hoverTl.current = tl;

    // Cleanup
    return () => {
      tl.kill();
      hoverTl.current = null;
      if (splitTypeRef.current) {
        splitTypeRef.current.revert();
      }
      if (secondSplitTypeRef.current) {
        secondSplitTypeRef.current.revert();
      }
    };
  }, [label]);

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
    <div className="relative overflow-hidden">
      <div ref={firstLabelRef} className="font-mono uppercase">
        {label}
      </div>
      <div
        ref={secondLabelRef}
        className="absolute top-0 left-0 font-mono uppercase"
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
