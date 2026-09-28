"use client";

import { useRef } from "react";
import Image from "next/image";
import { ScaleReveal, useScaleReveal } from "./motion/useScaleReveal";

interface BaseMediaProps {
  type: "image" | "video";
  alt: string;
  className?: string;
  objectFit?: "object-cover" | "object-contain";
  /** Zoom-out reveal as the media scrolls into view. */
  imageScaleAnimation?: ScaleReveal;
}

interface ImageProps extends BaseMediaProps {
  type: "image";
  src: string;
  width?: number;
  height?: number;
}

interface VideoProps extends BaseMediaProps {
  type: "video";
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
}

type MediaImageProps = ImageProps | VideoProps;

const MediaImage: React.FC<MediaImageProps> = (props) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaClassName = `w-full h-full ${props.objectFit ?? "object-cover"}`;

  useScaleReveal(
    props.type === "video" ? videoRef : imageRef,
    props.imageScaleAnimation,
  );

  if (props.type === "video") {
    return (
      <video
        ref={videoRef}
        src={props.src}
        poster={props.poster}
        controls={props.controls ?? false}
        autoPlay={props.autoPlay ?? true}
        loop={props.loop ?? true}
        muted={props.muted ?? true}
        playsInline
        className={mediaClassName}
        aria-label={props.alt}
      />
    );
  }

  return (
    <Image
      ref={imageRef}
      src={props.src}
      alt={props.alt}
      {...(props.width && props.height
        ? { width: props.width, height: props.height }
        : { fill: true })}
      className={mediaClassName}
    />
  );
};

export default MediaImage;
