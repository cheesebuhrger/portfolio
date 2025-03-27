"use client";

import Link from "next/link";
import { useTransition } from "../hooks/useTransition";
import { useIsMobile } from "../hooks/useIsMobile";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const TransitionLink = ({ href, children, className }: TransitionLinkProps) => {
  const { navigate } = useTransition();
  const isMobile = useIsMobile();

  return (
    <Link
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
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
