import Image from "next/image";
import { ReactNode, useState } from "react";

interface QuoteProps {
  image: string;
  name: string;
  role?: string;
  preview: ReactNode;
  fullQuote: ReactNode;
}

const Quote: React.FC<QuoteProps> = ({
  image,
  name,
  role,
  preview,
  fullQuote,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 gap-y-8 md:gap-y-12 lg:gap-y-16">
      <div className="col-span-1 lg:col-start-2 flex flex-row gap-6">
        <div className="flex flex-col gap-6 md:gap-4">
          <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden flex-shrink-0">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
          <div className="font-serif ~text-8xl/10xl">“</div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col h-14 md:h-16 justify-center font-sans text-base">
            <div>{name}</div>
            <div className="text-text-secondary">{role}</div>
          </div>
          <p
            className={`${
              isExpanded
                ? "font-sans ~text-base/lg-p"
                : "font-serif-p ~text-2xl-p/4xl-p"
            }`}
          >
            {isExpanded ? fullQuote : preview}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-fit text-text-secondary hover:text-text-primary transition-colors text-xs font-mono uppercase border border-text-secondary rounded-md px-2 py-1"
          >
            {isExpanded ? "View less" : "View more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quote;
