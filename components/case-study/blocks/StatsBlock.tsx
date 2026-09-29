import type { Block } from "@/lib/types";
import MediaImage from "@/components/MediaImage";
import RichText from "../RichText";
import StatCard from "./StatCard";
import { mediaProps } from "./MediaBlock";

type StatsBlockProps = { block: Extract<Block, { type: "stats" }> };

/** Half-width media beside a 2×2 grid of stats. */
export default function StatsBlock({ block }: StatsBlockProps) {
  const { media, stats, position } = block;

  const statGrid = (
    <div className="grid grid-rows md:grid-cols-2 w-full md:w-1/2 md:aspect-16/9-half gap-4 md:gap-2">
      {[0, 1, 2, 3].map((index) => {
        const stat = stats[index];
        return (
          <div key={index} className={`${!stat ? "hidden md:block" : ""}`}>
            {stat && (
              <StatCard
                title={<RichText text={stat.title} />}
                value={stat.value}
                footnote={stat.footnote}
                direction={stat.direction}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  const mediaPanel = (
    <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9-half w-full md:w-1/2">
      <MediaImage {...mediaProps(media)} />
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
      {position === "left" ? (
        <>
          {statGrid}
          {mediaPanel}
        </>
      ) : (
        <>
          {mediaPanel}
          {statGrid}
        </>
      )}
    </div>
  );
}
