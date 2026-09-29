import type { Project } from "@/lib/types";
import type { ProjectSummary } from "@/lib/content";
import Hero from "./Hero";
import Section from "./Section";
import BlockRenderer from "./BlockRenderer";
import End from "./End";

type CaseStudyProps = {
  project: Project;
  related: ProjectSummary[];
};

/** A full case-study page, rendered from content. */
export default function CaseStudy({ project, related }: CaseStudyProps) {
  return (
    <div>
      <Hero
        headline={project.title}
        problem={project.problem}
        solution={project.solution}
        skills={project.skills}
        duration={{ length: project.duration, year: project.year }}
        team={project.team}
        images={project.cover}
        stack={project.stackHero}
      />

      {project.sections.map((section) => (
        <Section
          key={section.number}
          sectionNumber={section.number}
          sectionLabel={section.label}
          iconType={section.icon}
          stack={section.stack}
        >
          <BlockRenderer blocks={section.blocks} />
        </Section>
      ))}

      <End
        image={project.end.image}
        process={project.end.process}
        related={related}
      />
    </div>
  );
}
