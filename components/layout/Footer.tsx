"use client";

import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/seo";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer
      className={`grid md:grid-cols-4 p-4 pt-24 md:p-8 md:pt-48 text-xs font-mono uppercase gap-8 items-end ${
        !isHomePage
          ? "bg-surface-primary-negative text-text-primary-negative"
          : ""
      }`}
    >
      {/* <div
        className={`col-span-2 h-96 border
          ${
            !isHomePage
              ? "border-border-primary-negative"
              : "border-border-primary"
          }`}
      ></div> */}

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
            {/* <li>
              <TransitionLink
                href="/#prototypes"
                className="hover:text-text-action"
              >
                Prototypes
              </TransitionLink>
            </li> */}
            <li>
              <TransitionLink
                href="/#playground"
                className="hover:text-text-action"
              >
                Playground
              </TransitionLink>
            </li>
            {/* <li className="mt-4">
              <TransitionLink
                href="/about"
                className="hover:text-text-action mb-4"
              >
                About
              </TransitionLink>
            </li> */}
          </>
        )}
        <li>
          <a
            href={SITE.profiles.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-action"
          >
            Github
          </a>
        </li>
        <li className={!isHomePage ? "mt-4" : ""}>
          <a
            href={SITE.profiles.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-action"
          >
            LinkedIn
          </a>
        </li>

        <li>
          <a
            href={SITE.profiles.arena}
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
