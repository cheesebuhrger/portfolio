import type { Block } from "@/lib/types";
import RichText from "../RichText";

type CalloutsBlockProps = { block: Extract<Block, { type: "callouts" }> };

/** Row of bordered cards, each a short serif statement. */
export default function CalloutsBlock({ block }: CalloutsBlockProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-2">
      {block.items.map((item, index) => (
        <div
          key={index}
          className="rounded-md border border-border-primary w-full h-full p-4 md:p-6 lg:p-8 flex flex-row md:flex-col"
        >
          <p className="font-serif-p ~text-lg-p/2xl-p md:w-full">
            <RichText text={item} />
          </p>
        </div>
      ))}
    </div>
  );
}
