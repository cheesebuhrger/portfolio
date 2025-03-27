"use client";

import Link from "next/link";
import { useTransition } from "../hooks/useTransition";

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const TransitionLink = ({ href, children, className }: TransitionLinkProps) => {
  const { navigate } = useTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
      className={className}
    >
      {children}
    </Link>
  );
};

export default TransitionLink;
