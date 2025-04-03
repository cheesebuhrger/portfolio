interface StatBlockProps {
  title: React.ReactNode;
  value: string;
  className?: string;
  footnote?: string;
}

const StatBlock: React.FC<StatBlockProps> = ({
  title,
  value,
  className,
  footnote,
}) => {
  return (
    <div
      className={`rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-4 xl:p-8 flex flex-row md:flex-col justify-between ${className}`}
    >
      <p className="font-serif-p ~text-lg/2xl md:w-full">{title}</p>

      <div>
        <p className="font-serif-ultralight-italic ~text-4xl/9xl md:w-full text-right md:text-left">
          {value}
        </p>
        {footnote && (
          <p className="font-sans text-sm md:w-full text-right mt-2 md:mt-4 md:text-left">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatBlock;
