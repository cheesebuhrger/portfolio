import Image from "next/image";

interface BaseMediaProps {
  type: "image" | "video";
  alt: string;
  className?: string;
  objectFit?: "cover" | "contain";
  imageScaleAnimation?: "subtle" | "default" | "none";
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

const getAnimationClass = (animation?: "subtle" | "default" | "none") => {
  switch (animation) {
    case "subtle":
      return "image-scale-animation-subtle";
    case "none":
      return "";
    default:
      return "image-scale-animation";
  }
};

type MediaImageProps = ImageProps | VideoProps;

const MediaImage: React.FC<MediaImageProps> = (props) => {
  if (props.type === "video") {
    return (
      <video
        src={props.src}
        poster={props.poster}
        controls={props.controls ?? false}
        autoPlay={props.autoPlay ?? true}
        loop={props.loop ?? true}
        muted={props.muted ?? true}
        playsInline
        className={`w-full h-full ${
          props.objectFit ?? "cover"
        } ${getAnimationClass(props.imageScaleAnimation)}
        }`}
        aria-label={props.alt}
      />
    );
  }

  return (
    <Image
      src={props.src}
      alt={props.alt}
      {...(props.width && props.height
        ? { width: props.width, height: props.height }
        : { fill: true })}
      className={`${props.objectFit ?? "cover"} ${getAnimationClass(
        props.imageScaleAnimation
      )}
      }`}
    />
  );
};

export default MediaImage;
