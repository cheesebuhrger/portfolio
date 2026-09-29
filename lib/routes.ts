/**
 * URL builders. Kept free of content imports so client components can use
 * them without bundling the content data.
 */
export const projectHref = (slug: string) => `/projects/${slug}`;
export const frameHref = (slug: string) => `/frames/${slug}`;
