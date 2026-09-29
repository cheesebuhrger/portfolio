import type { Block, Media as MediaContent } from "@/lib/types";
import Media from "@/components/ui/Media";
import RichText from "../RichText";

type MediaBlockProps = { block: Extract<Block, { type: "media" }> };

/** Media props minus content-only fields like caption. */
export function mediaProps({ caption: _caption, ...media }: MediaContent) {
  return media;
}

function Caption({ media }: { media: MediaContent }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
      <p className="col-span-1 col-start-1 md:col-span-1 md:col-start-2 xl:col-start-4 xl:col-span-3 xl:text-right text-xs text-text-secondary mt-2">
        {media.caption ? <RichText text={media.caption} /> : null}
      </p>
    </div>
  );
}

export default function MediaBlock({ block }: MediaBlockProps) {
  const { layout, media, background } = block;

  if (layout === "full") {
    return (
      <div>
        <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9">
          <Media {...mediaProps(media[0])} />
        </div>
        <Caption media={media[0]} />
      </div>
    );
  }

  if (layout === "mockup") {
    // Colours come from content as hex values, so they're applied inline:
    // Tailwind can't generate classes for values it never sees in source.
    const style: React.CSSProperties = {
      ...(background?.color && { backgroundColor: background.color }),
      ...(background?.image && {
        backgroundImage: `url(${background.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }),
    };

    return (
      <div>
        <div
          className={`relative ${background?.color ? "" : "bg-surface-secondary"} overflow-hidden rounded-md w-full lg:h-[calc(100vh-4rem)]`}
          style={style}
        >
          <div className="relative flex w-full h-full items-center justify-center p-4 py-20 sm:p-8 sm:py-24 md:p-12 md:py-24">
            <Media
              imageScaleAnimation="subtle"
              objectFit="object-contain"
              {...(media[0].type === "image" ? { width: 1440, height: 900 } : {})}
              {...mediaProps(media[0])}
            />
          </div>
        </div>
        <Caption media={media[0]} />
      </div>
    );
  }

  // double
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
      {media.map((item, index) => (
        <div key={index} className="w-full md:w-1/2">
          <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9-half">
            <Media {...mediaProps(item)} />
          </div>
          {item.caption && (
            <div className="grid grid-cols-1 mb-2 md:mb-4 lg:mb-0 xl:grid-cols-6 gap-4 md:gap-6 lg:gap-8">
              <p className="xl:col-span-3 xl:col-start-4 xl:text-right text-xs text-text-secondary mt-2">
                <RichText text={item.caption} />
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
