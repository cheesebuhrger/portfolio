import type { MetadataRoute } from "next";
import {
  getFrames,
  getProjects,
  frameHref,
  projectHref,
} from "@/lib/content";
import { absoluteUrl, cloudinaryUploadDate } from "@/lib/seo";

/** Every public page. Unfinished pages (e.g. /about) stay out. */
export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects().map((project) => ({
    url: absoluteUrl(projectHref(project.slug)),
    lastModified: project.updated ?? project.published,
  }));
  const frames = getFrames().map((item) => ({
    url: absoluteUrl(frameHref(item.slug)),
    lastModified: cloudinaryUploadDate(item.src),
  }));
  const latest = [...projects, ...frames]
    .map((p) => p.lastModified)
    .filter(Boolean)
    .sort()
    .at(-1);

  return [{ url: absoluteUrl("/"), lastModified: latest }, ...projects, ...frames];
}
