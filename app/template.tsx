"use client";

import { animationPageIn } from "@/utils/animations";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset swiper position before animation
    const swiper = document.getElementById("swiper-1");
    if (swiper) {
      gsap.set(swiper, { yPercent: 0 });
    }
    animationPageIn();
  }, [pathname]);

  return (
    <div>
      <div
        id="swiper-1"
        className="bg-surface-swiper z-[100] fixed top-0 left-0 w-screen h-screen"
      />
      {children}
    </div>
  );
}
