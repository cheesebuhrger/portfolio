import type { Block } from "@/lib/types";
import RichText from "./RichText";
import TextBlock from "./blocks/TextBlock";
import MediaBlock from "./blocks/MediaBlock";
import StatsBlock from "./blocks/StatsBlock";
import QuoteBlock from "./blocks/QuoteBlock";
import CalloutsBlock from "./blocks/CalloutsBlock";
import GroupBlock from "./blocks/GroupBlock";

/** Renders a list of content blocks with the matching component for each type. */
export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return <TextBlock block={block} />;
    case "media":
      return <MediaBlock block={block} />;
    case "stats":
      return <StatsBlock block={block} />;
    case "quote":
      return (
        <QuoteBlock
          writer={block.writer}
          content={{
            snippet: <RichText text={block.snippet} />,
            full: block.full ? <RichText text={block.full} /> : undefined,
          }}
        />
      );
    case "callouts":
      return <CalloutsBlock block={block} />;
    case "group":
      return (
        <GroupBlock>
          <BlockRenderer blocks={block.blocks} />
        </GroupBlock>
      );
  }
}
