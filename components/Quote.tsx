import Image from "next/image";
import { ReactNode, useState } from "react";

interface Writer {
  image?: string;
  name: string;
  role?: string;
}

interface QuoteContent {
  snippet: ReactNode;
  full?: ReactNode;
}

interface QuoteProps {
  writer?: Writer;
  content: QuoteContent;
}

const Quote: React.FC<QuoteProps> = ({ writer, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 gap-y-8 md:gap-y-12 lg:gap-y-16">
      <div className="col-span-1 lg:col-start-2 flex flex-row gap-6">
        <div className={`flex flex-col ${writer?.image ? "gap-8" : "gap-2"}`}>
          {writer && (
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0">
              {writer.image && (
                <Image
                  src={writer.image}
                  alt={writer.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          )}
          <div className="font-serif w-14 h-8 md:w-16 ~text-8xl/10xl -mt-1 md:-mt-2 lg:-mt-3 xl:-mt-4">
            &ldquo;
          </div>
        </div>
        <div className={`flex flex-col ${writer?.image ? "gap-8" : "gap-2"}`}>
          {writer && (
            <div className="flex flex-col h-14 md:h-16 justify-center font-sans text-base">
              <div>{writer.name}</div>
              {writer.role && (
                <div className="text-text-secondary">{writer.role}</div>
              )}
            </div>
          )}
          <p
            className={`${
              isExpanded && content.full
                ? "font-sans ~text-sm/base"
                : "font-serif-p ~text-2xl-p/4xl-p"
            }`}
          >
            {isExpanded && content.full ? content.full : content.snippet}
          </p>
          {content.full && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-fit text-text-secondary hover:text-text-primary transition-colors text-xs font-mono uppercase border border-text-secondary rounded-md px-2 py-1"
            >
              {isExpanded ? "View less" : "View more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quote;
