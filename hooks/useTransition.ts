"use client";

import { useTransitionRouter } from "next-view-transitions";

export const useTransition = () => {
  const router = useTransitionRouter();
  const ease =
    // "cubic-bezier(0.87, 0, 0.13, 1)" original
    // "cubic-bezier(0.46,0.03,0.52,0.96)" contender
    "cubic-bezier(0.65,0.05,0.36,1)";

  const duration = 1000;

  const slideInOut = () => {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
        },
      ],
      {
        duration: duration,
        easing: ease,
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: duration,
        easing: ease,
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const navigate = (href: string) => {
    router.push(href, {
      onTransitionReady: slideInOut,
    });
  };

  return { navigate };
};
