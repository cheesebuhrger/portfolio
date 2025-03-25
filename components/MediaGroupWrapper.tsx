interface MediaGroupWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const MediaGroupWrapper: React.FC<MediaGroupWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`flex flex-col gap-4 md:gap-6 lg:gap-8 ${className}`}>
      {children}
    </div>
  );
};

export default MediaGroupWrapper;
