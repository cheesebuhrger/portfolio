/**
 * URL builders. Kept free of content imports so client components can use
 * them without bundling the content data.
 */
export const projectHref = (slug: string) => `/projects/${slug}`;
export const frameHref = (slug: string) => `/frames/${slug}`;

/**
 * Pages that use the homepage's Nav (name + Projects/Frames) and light
 * Footer: the homepage itself and each frame's page. Case studies use the
 * back-button Nav and dark Footer.
 */
export const usesHomeChrome = (pathname: string) =>
  pathname === "/" || pathname.startsWith("/frames/");
