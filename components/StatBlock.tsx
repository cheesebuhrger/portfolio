interface StatBlockProps {
  title: React.ReactNode;
  value: string;
  className?: string;
}

const StatBlock: React.FC<StatBlockProps> = ({ title, value, className }) => {
  return (
    <div
      className={`rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col justify-between ${className}`}
    >
      <p className="font-serif ~text-lg/2xl md:w-full">{title}</p>
      <p className="font-serif-ultralight-italic ~text-4xl/9xl md:w-full text-right md:text-left">
        {value}
      </p>
    </div>
  );
};

export default StatBlock;
