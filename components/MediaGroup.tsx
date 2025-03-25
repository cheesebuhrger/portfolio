interface MediaGroupProps {
  children: React.ReactNode;
  className?: string;
}

const MediaGroup: React.FC<MediaGroupProps> = ({ children, className }) => {
  return (
    <div className={`flex flex-col gap-4 md:gap-6 lg:gap-8 ${className}`}>
      {children}
    </div>
  );
};

export default MediaGroup;
