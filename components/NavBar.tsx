"use client";

import { usePathname } from "next/navigation";
import TransitionLink from "./TransitionLink";
import Button from "./Button";

const NavBar = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 p-4 md:p-8 text-xs font-mono uppercase grid grid-cols-12 gap-4 md:gap-8">
      {isHome ? (
        <div className="col-span-4 cursor-pointer" onClick={scrollToTop}>
          <div>BUHR DUONG</div>
          <div>PRODUCT DESIGNER</div>
        </div>
      ) : (
        <Button label="←" href="/" size="medium" />
      )}
      {isHome && (
        <TransitionLink
          href="/about"
          className="col-span-4 col-start-10 justify-self-end"
        >
          ABOUT
        </TransitionLink>
      )}
    </nav>
  );
};

export default NavBar;
