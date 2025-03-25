// components/MediaItem.tsx

import React, { useRef, useEffect } from "react";

interface GridItem {
  type: "image" | "video" | "experiment";
  src: string;
  title?: string;
  date?: string;
  url?: string;
  description?: string;
}

interface MediaItemProps {
  item: GridItem;
  isModal?: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({ item, isModal = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  if (item.type === "video") {
    return (
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={item.src}
          className={`w-full h-full object-cover ${
            isModal ? "rounded-md" : ""
          }`}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-full bg-cover bg-center ${
        isModal ? "rounded-md" : ""
      }`}
      style={{ backgroundImage: `url(${item.src})` }}
    />
  );
};

export default MediaItem;
