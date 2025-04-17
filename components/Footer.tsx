"use client";

import Link from "next/link";
import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="grid md:grid-cols-4 p-4 pt-24 md:p-8 md:pt-48 text-xs font-mono uppercase gap-8 items-end">
      <div className="col-span-2 border border-border-primary h-96"></div>

      <ul className="col-span-1 md:col-start-3">
        {!isHomePage && (
          <>
            <li>
              <TransitionLink
                href="/#projects"
                className="hover:text-text-action"
              >
                Projects
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/#prototypes"
                className="hover:text-text-action"
              >
                Prototypes
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/#playground"
                className="hover:text-text-action"
              >
                Playground
              </TransitionLink>
            </li>
            <li className="mt-4">
              <TransitionLink
                href="/about"
                className="hover:text-text-action mb-4"
              >
                About
              </TransitionLink>
            </li>
          </>
        )}

        <li className={!isHomePage ? "mt-4" : ""}>
          <a
            href="https://linkedin.com/in/buhrduong"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-action"
          >
            LinkedIn [Contact]
          </a>
        </li>
        <li>
          <a
            href="https://are.na/buhr-duong/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-action"
          >
            Are.na
          </a>
        </li>
      </ul>

      <div className="col-span-1 md:col-start-4 text-right justify-self-end">
        <p>&copy;{new Date().getFullYear()}</p>
        <p>Made w/♥ by Buhr</p>
      </div>
    </footer>
  );
};

export default Footer;
