"use client";

import React, { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { animationPageOut } from "@/utils/animations";

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary";
  useTransition?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  href,
  onClick,
  className = "",
  size = "medium",
  variant = "primary",
  useTransition = true,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLabelRef = useRef<HTMLDivElement>(null);
  const secondLabelRef = useRef<HTMLDivElement>(null);
  const splitTypeRef = useRef<SplitType | null>(null);
  const secondSplitTypeRef = useRef<SplitType | null>(null);
  const pathname = usePathname();
  const router = useRouter();

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

    // Add event listeners
    const container = href ? linkRef.current : buttonRef.current;
    if (container) {
      container.addEventListener("mouseenter", () => tl.play());
      container.addEventListener("mouseleave", () => tl.reverse());
    }

    // Cleanup
    return () => {
      if (container) {
        container.removeEventListener("mouseenter", () => tl.play());
        container.removeEventListener("mouseleave", () => tl.reverse());
      }
      if (splitTypeRef.current) {
        splitTypeRef.current.revert();
      }
      if (secondSplitTypeRef.current) {
        secondSplitTypeRef.current.revert();
      }
    };
  }, [href]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    } else if (href && useTransition) {
      e.preventDefault();
      if (pathname !== href) {
        animationPageOut(href, router);
      }
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
    <Link
      ref={linkRef}
      href={href}
      onClick={handleClick}
      className={commonClassName}
    >
      {buttonContent}
    </Link>
  ) : (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      className={commonClassName}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
