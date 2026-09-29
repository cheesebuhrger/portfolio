/**
 * The content seam: the only place the site reads content from.
 * Components never import content files directly, so swapping the source
 * (e.g. to Sanity) means changing this file, not the UI.
 */
import projects from "@/content/projects";
import playgroundItems from "@/content/playground";
import type { PlaygroundItem, Project } from "./types";
import { projectHref } from "./routes";

export { playgroundHref, projectHref } from "./routes";

/** What cards and lists need; keeps full case-study bodies out of client bundles. */
export type ProjectSummary = Pick<
  Project,
  "slug" | "title" | "company" | "role" | "year" | "cover"
> & { href: string };


const toSummary = ({ slug, title, company, role, year, cover }: Project): ProjectSummary => ({
  slug,
  title,
  company,
  role,
  year,
  cover,
  href: projectHref(slug),
});

export function getProjects(): Project[] {
  return projects;
}

export function getProjectSummaries(): ProjectSummary[] {
  return projects.map(toSummary);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** The next `count` projects after `slug`, wrapping around the list. */
export function getRelatedProjects(slug: string, count = 2): ProjectSummary[] {
  const index = projects.findIndex((project) => project.slug === slug);
  return Array.from({ length: Math.min(count, projects.length - 1) }, (_, i) =>
    toSummary(projects[(index + 1 + i) % projects.length]),
  );
}

export function getPlaygroundItems(): PlaygroundItem[] {
  return playgroundItems;
}

export function getPlaygroundItem(slug: string): PlaygroundItem | undefined {
  return playgroundItems.find((item) => item.slug === slug);
}

/** Previous and next items around `slug`, wrapping at the ends. */
export function getAdjacentPlaygroundItems(slug: string) {
  const index = playgroundItems.findIndex((item) => item.slug === slug);
  const count = playgroundItems.length;
  return {
    prev: playgroundItems[(index - 1 + count) % count],
    next: playgroundItems[(index + 1) % count],
  };
}

/** Description for metadata; falls back to a factual line when none is written. */
export function playgroundDescription(item: PlaygroundItem): string {
  return (
    item.description ??
    `${item.title} (${item.date}), from Buhr Duong’s playground.`
  );
}
