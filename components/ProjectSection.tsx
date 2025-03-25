import React from "react";

interface ProjectSectionProps {
  sectionNumber?: string;
  sectionLabel: string;
  className?: string; // Add this line to accept additional classes
  children?: React.ReactNode;
}

const ProjectSection: React.FC<ProjectSectionProps> = ({
  sectionNumber,
  sectionLabel,
  className = "",
  children,
}) => {
  return (
    <section
      className={`bg-surface-primary border-t border-border-primary relative grid grid-flow-row gap-32 px-4 pt-4 pb-32 md:gap-48 md:px-6 md:pt-6 md:pb-40 lg:px-8 lg:pt-8 lg:pb-48 ${className}`}
    >
      <div className="flex gap-4 md:gap-6 lg:gap-8">
        <p className="text-xs font-mono uppercase md:w-1/2">
          [{sectionNumber}]
        </p>
        <p className="text-xs font-mono uppercase md:w-1/2">{sectionLabel}</p>
      </div>

      {children}
    </section>
  );
};

export default ProjectSection;
