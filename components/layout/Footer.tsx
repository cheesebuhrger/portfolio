"use client";

import TransitionLink from "./TransitionLink";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/seo";
import { usesHomeChrome } from "@/lib/routes";

const Footer = () => {
  const pathname = usePathname();
  // Light footer without section links (the Nav has them) on home-style pages.
  const homeStyle = usesHomeChrome(pathname);

  return (
    <footer
      className={`grid md:grid-cols-4 p-4 pt-24 md:p-8 md:pt-48 text-xs font-mono uppercase gap-8 items-end ${
        !homeStyle
          ? "bg-surface-primary-negative text-text-primary-negative"
          : ""
      }`}
    >
      {/* <div
        className={`col-span-2 h-96 border
          ${
            !homeStyle
              ? "border-border-primary-negative"
              : "border-border-primary"
          }`}
      ></div> */}

      <ul className="col-span-1 md:col-start-3">
        {!homeStyle && (
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
                href="/#frames"
                className="hover:text-text-action"
              >
                Frames
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
        <li className={!homeStyle ? "mt-4" : ""}>
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
