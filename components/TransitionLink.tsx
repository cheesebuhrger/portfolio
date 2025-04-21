"use client";

import Link from "next/link";
import { useTransition } from "../hooks/useTransition";
import { useIsMobile } from "../hooks/useIsMobile";
import React from "react";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any; // Allow any other props to be passed through
}

const TransitionLink = React.forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  ({ href, children, className, ...props }, ref) => {
    const { navigate } = useTransition();
    const isMobile = useIsMobile();

    return (
      <Link
        ref={ref}
        href={href}
        onClick={(e) => {
          e.preventDefault();
          if (!isMobile) {
            navigate(href);
          } else {
            window.location.href = href;
          }
        }}
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }
);

TransitionLink.displayName = "TransitionLink";

export default TransitionLink;
