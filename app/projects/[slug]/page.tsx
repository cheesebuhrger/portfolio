import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/case-study/CaseStudy";
import JsonLd from "@/components/seo/JsonLd";
import { caseStudyJsonLd, ogImage, shareMetadata } from "@/lib/seo";
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

  return {
    title: project.title,
    description: project.solution,
    ...shareMetadata({
      path: projectHref(project.slug),
      title: `Buhr | ${project.title}`,
      description: project.solution,
      image: ogImage(project.cover.primary.src),
      type: "article",
      publishedTime: project.published,
      modifiedTime: project.updated ?? project.published,
    }),
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <JsonLd data={caseStudyJsonLd(project, projectHref(slug))} />
      <CaseStudy project={project} related={getRelatedProjects(slug)} />
    </>
  );
}
