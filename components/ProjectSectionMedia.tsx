import MediaImage from "./MediaImage";
import { ReactNode } from "react";
import StatBlock from "./StatBlock";

type MediaData = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: ReactNode;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
};

type StatBlock = {
  title: ReactNode;
  value: string;
  footnote?: string;
} | null;

type ProjectSectionMediaProps = {
  layout: {
    type: "full" | "double" | "stats" | "mockup";
    statsPosition?: "left" | "right";
  };
  media: MediaData[];
  stats?: [StatBlock, StatBlock, StatBlock, StatBlock];
};

const ProjectSectionMedia: React.FC<ProjectSectionMediaProps> = ({
  layout,
  media,
  stats,
}) => {
  if (layout.type === "full") {
    return (
      <div>
        <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9">
          <MediaImage {...media[0]} />
        </div>
        <p className="text-sm text-text-secondary mt-2 w-1/2">
          {media[0].caption}
        </p>
      </div>
    );
  }

  if (layout.type === "mockup") {
    return (
      <div>
        <div className="relative bg-surface-secondary overflow-hidden rounded-md w-full lg:h-[calc(100vh-4rem)]">
          <div className="relative flex border border-[red] w-full h-full items-center justify-center p-4 py-20 sm:p-8 sm:py-24 md:p-12 md:py-24">
            <MediaImage
              imageScaleAnimation="subtle"
              objectFit="contain"
              {...(media[0].type === "image"
                ? { width: 1440, height: 900 }
                : {})}
              {...media[0]}
            />
          </div>
        </div>
        <p className="text-sm text-text-secondary mt-2 w-1/2">
          {media[0].caption}
        </p>
      </div>
    );
  }

  if (layout.type === "double") {
    return (
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
        {media.map((item, index) => (
          <div key={index} className="w-full md:w-1/2">
            <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9-half">
              <MediaImage {...item} />
            </div>
            {item.caption && (
              <div className="grid grid-cols-1 mb-2 md:mb-4 lg:mb-0 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <p className="xl:col-span-2 text-xs text-text-secondary mt-2">
                  {item.caption}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Stats layout
  const StatBlocks = () => (
    <div className="grid grid-rows md:grid-cols-2 w-full md:w-1/2 md:aspect-16/9-half gap-4 md:gap-2">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`${!stats?.[index] ? "hidden md:block" : ""}`}
        >
          {stats?.[index] && (
            <StatBlock
              title={stats[index]!.title}
              value={stats[index]!.value}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
      {layout.statsPosition === "left" ? (
        <>
          <StatBlocks />
          <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9-half w-full md:w-1/2">
            <MediaImage {...media[0]} />
          </div>
        </>
      ) : (
        <>
          <div className="relative bg-surface-secondary overflow-hidden rounded-md aspect-16/9-half w-full md:w-1/2">
            <MediaImage {...media[0]} />
          </div>
          <StatBlocks />
        </>
      )}
    </div>
  );
};

export default ProjectSectionMedia;
