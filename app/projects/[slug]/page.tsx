import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/case-study/CaseStudy";
import {
  getProject,
  getProjects,
  getRelatedProjects,
  projectHref,
} from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

// Only the case studies in content exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};

  const title = `Buhr | ${project.title}`;
  const description = project.solution;
  const url = projectHref(project.slug);
  const image = project.cover.primary.src;

  return {
    title: project.title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudy project={project} related={getRelatedProjects(slug)} />;
}
