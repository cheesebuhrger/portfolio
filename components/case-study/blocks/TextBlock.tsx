import type { Block } from "@/lib/types";
import SplitReveal from "@/components/motion/SplitReveal";
import RichText from "../RichText";

type TextBlockProps = { block: Extract<Block, { type: "text" }> };

/** Headline + indented body, right-aligned on the case-study grid. */
export default function TextBlock({ block }: TextBlockProps) {
  const { headline, body, animateHeadline = false } = block;
  const headlineClassName =
    "col-span-1 col-start-1 md:col-span-1 md:col-start-2 xl:col-start-7 xl:col-span-6 ~text-4xl/6xl font-serif-p text-pretty";
  const headlineContent = headline ? <RichText text={headline} /> : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-6 lg:gap-8 gap-y-8 md:gap-y-12 lg:gap-y-16 overflow-hidden">
      {animateHeadline ? (
        <SplitReveal as="h2" className={headlineClassName}>
          {headlineContent}
        </SplitReveal>
      ) : (
        <h2 className={headlineClassName}>{headlineContent}</h2>
      )}
      <div className="col-span-1 col-start-1 md:col-span-1 md:col-start-2 xl:col-start-7 xl:col-span-4 row-start-2 text-base indent-16 text-pretty">
        {body ? <RichText text={body} /> : null}
      </div>
    </div>
  );
}
