import Image from "next/image";

interface BaseMediaProps {
  type: "image" | "video";
  alt: string;
  className?: string;
}

interface ImageProps extends BaseMediaProps {
  type: "image";
  src: string;
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
  if (props.type === "video") {
    return (
      <video
        src={props.src}
        poster={props.poster}
        controls={props.controls ?? true}
        autoPlay={props.autoPlay ?? true}
        loop={props.loop ?? true}
        muted={props.muted ?? true}
        playsInline
        className="w-full h-full object-cover image-scale-animation"
        aria-label={props.alt}
      />
    );
  }

  return (
    <Image
      src={props.src}
      alt={props.alt}
      fill
      className="object-cover image-scale-animation"
    />
  );
};

export default MediaImage;
