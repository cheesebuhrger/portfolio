import type { MetadataRoute } from "next";
import { getProjects, projectHref } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/** Every public page. Unfinished pages (e.g. /about) stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects().map((project) => ({
    url: absoluteUrl(projectHref(project.slug)),
    lastModified: project.updated ?? project.published,
  }));
  const latest = projects.map((p) => p.lastModified).sort().at(-1);

  return [{ url: absoluteUrl("/"), lastModified: latest }, ...projects];
}
