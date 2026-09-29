"use client";

import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { useLenis } from "lenis/react";

const Nav = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const lenis = useLenis();

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 2 });
  };

  // Real links (keyboard + no-JS friendly), smooth-scrolled by Lenis.
  const scrollToSection =
    (target: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      lenis?.scrollTo(target, { duration: 2 });
    };

  return (
    <nav className="fixed top-0 w-full z-50 p-4 md:p-6 lg:p-8 text-xs font-mono uppercase grid grid-cols-12 items-start gap-4 md:gap-6 lg:gap-8 mix-blend-difference">
      {isHome ? (
        <button
          type="button"
          className="col-span-4 text-text-primary-negative cursor-pointer text-left"
          onClick={scrollToTop}
        >
          <div>BUHR DUONG</div>
          <div>DESIGN ENGINEER</div>
        </button>
      ) : (
        <Button
          href="/"
          label="←"
          className="border border-border-primary-negative hover:border-border-tertiary-negative text-text-primary-negative"
        />
      )}

      {isHome && (
        <>
          <ul className="group col-span-3 col-start-7 text-text-primary-negative w-fit hidden md:block">
            <li className="group-hover:pb-1 hover:underline transition-all duration-300 w-fit cursor-pointer">
              <a href="#projects" onClick={scrollToSection("#projects")}>
                Projects
              </a>
            </li>
            {/* <li
              onClick={() => {
                lenis?.scrollTo("#code", { duration: 2 });
              }}
              className="group-hover:py-1 hover:underline transition-all duration-300 w-fit cursor-pointer"
            >
              Code
            </li> */}
            <li className="group-hover:py-1 hover:underline transition-all duration-300 w-fit cursor-pointer">
              <a href="#playground" onClick={scrollToSection("#playground")}>
                Playground
              </a>
            </li>
          </ul>
          {/* <ul className="col-span-3 col-start-10 text-text-primary-negative">
            <li
              onClick={() => {
                lenis?.scrollTo("#about", { duration: 2 });
              }}
              className="group-hover:py-1 hover:underline transition-all duration-300 w-fit cursor-pointer"
            >
              About
            </li>
          </ul> */}
        </>
      )}
    </nav>
  );
};

export default Nav;
