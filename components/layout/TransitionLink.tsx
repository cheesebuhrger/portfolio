"use client";

import Link from "next/link";
import { useTransition } from "./useTransition";

type TransitionLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  href: string;
};

const MOBILE_QUERY = "(max-width: 767px)"; // below Tailwind's md breakpoint

const TransitionLink = ({ href, onClick, ...props }: TransitionLinkProps) => {
  const { navigate } = useTransition();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;

        // Let the browser handle new-tab/window clicks and non-self targets.
        const isModifiedClick =
          e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
        const opensElsewhere = props.target && props.target !== "_self";
        if (isModifiedClick || opensElsewhere) return;

        // Mobile: plain client-side navigation (no page transition animation).
        if (window.matchMedia(MOBILE_QUERY).matches) return;

        e.preventDefault();
        navigate(href);
      }}
      {...props}
    />
  );
};

export default TransitionLink;
