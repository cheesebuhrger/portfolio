import { AnimatedIcon } from "./icons";

interface StatBlockProps {
  title: React.ReactNode;
  value: string;
  direction?: "up" | "down" | "unknown" | "none";
  className?: string;
  footnote?: string;
}

const StatBlock: React.FC<StatBlockProps> = ({
  title,
  value,
  direction = "none",
  className,
  footnote,
}) => {
  return (
    <div
      className={`rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-4 xl:p-8 flex flex-row md:flex-col items-center md:items-start justify-between ${className}`}
    >
      <div className="flex flex-row items-top gap-1">
        {direction !== "none" && (
          <div className="relative opacity-80 mt-1">
            <AnimatedIcon type={direction} size="24" interval={250} />
          </div>
        )}
        <p className="font-serif-ultralight-italic ~text-4xl/9xl md:w-full">
          {value}
        </p>
      </div>

      <div>
        <p className="font-serif-p ~text-lg/2xl md:w-full text-right md:text-left">
          {title}
        </p>
        {footnote && (
          <p className="font-sans text-text-secondary ~text-xs/sm md:w-full text-right mt-2 lg:mt-3 md:text-left">
            {footnote}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatBlock;
