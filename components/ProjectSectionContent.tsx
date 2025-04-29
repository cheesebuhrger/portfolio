import { ReactNode } from "react";
import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";

interface ProjectSectionContentProps {
  headline?: ReactNode;
  body?: ReactNode;
  animateHeadline?: boolean;
}

const ProjectSectionContent: React.FC<ProjectSectionContentProps> = ({
  headline,
  body,
  animateHeadline = false,
}) => {
  useSplitTypeAnimation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-6 lg:gap-8 gap-y-8 md:gap-y-12 lg:gap-y-16 overflow-hidden">
      <h2
        className={`col-span-1 col-start-1 md:col-span-1 md:col-start-2 xl:col-start-7 xl:col-span-6 ~text-4xl/6xl font-serif-p text-pretty ${
          animateHeadline ? "split-type-animation" : ""
        }`}
      >
        {headline}
      </h2>
      <div className="col-span-1 col-start-1 md:col-span-1 md:col-start-2 xl:col-start-7 xl:col-span-4 row-start-2 text-base indent-16 text-pretty">
        {body}
      </div>
    </div>
  );
};

export default ProjectSectionContent;
