import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

gsap.ticker.lagSmoothing(0);

export const animationPageIn = () => {
  const swiper = document.getElementById("swiper-1");

  if (swiper) {
    gsap.fromTo(
      swiper,
      { yPercent: 0 },
      {
        yPercent: 100,
        duration: 0.8,
        ease: "power3.inOut",
      }
    );
  }
};

export const animationPageOut = (href: string, router: AppRouterInstance) => {
  const swiper = document.getElementById("swiper-1");

  if (swiper) {
    gsap.fromTo(
      swiper,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(href);
        },
      }
    );
  }
};
