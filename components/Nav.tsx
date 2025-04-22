"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTransition } from "../hooks/useTransition";
import Button from "./Button";

const Nav = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { navigate } = useTransition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 p-4 md:p-8 text-xs font-mono uppercase grid grid-cols-12 gap-4 md:gap-8 mix-blend-difference">
      {isHome ? (
        <div
          className="col-span-4 text-text-primary-negative cursor-pointer"
          onClick={scrollToTop}
        >
          <div>BUHR DUONG</div>
          <div>PRODUCT DESIGNER</div>
        </div>
      ) : (
        <Button
          href="/"
          label="←"
          className="border border-border-primary-negative hover:border-border-tertiary-negative text-text-primary-negative"
        />
      )}

      {isHome && (
        <>
          <ul className="group col-span-3 col-start-7 text-text-primary-negative w-fit">
            <li className="group-hover:pb-1 hover:underline transition-all duration-300 w-fit">
              Projects
            </li>
            <li className="group-hover:py-1 hover:underline transition-all duration-300 w-fit">
              Prototypes
            </li>
            <li className="group-hover:py-1 hover:underline transition-all duration-300 w-fit">
              Playground
            </li>
          </ul>
          <ul className="col-span-3 col-start-10 text-text-primary-negative">
            <li>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/about");
                }}
                href="/about"
              >
                ABOUT
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Nav;
