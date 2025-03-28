interface ProjectSectionMediaBinderProps {
  children: React.ReactNode;
  className?: string;
}

const ProjectSectionMediaBinder: React.FC<ProjectSectionMediaBinderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-4 md:gap-6 lg:gap-8 ${className}`}>
      {children}
    </div>
  );
};

export default ProjectSectionMediaBinder;
