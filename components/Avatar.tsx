import Image from "next/image";
import { Tooltip } from "./Tooltip";

interface AvatarProps {
  src: string;
  alt: string;
  href?: string;
  primary?: string;
  secondary?: string;
}

const AvatarImage = ({ src, alt, href }: AvatarProps) => (
  <div
    className={`relative w-8 h-8 bg-surface-secondary rounded-sm overflow-hidden ${
      href ? "cursor-pointer" : ""
    }`}
    onClick={() => {
      if (href) {
        window.open(href, "_blank");
      }
    }}
  >
    <Image src={src} alt={alt} fill className="object-cover" />
  </div>
);

export const Avatar = ({ src, alt, href, primary, secondary }: AvatarProps) => {
  if (primary) {
    return (
      <Tooltip primary={primary} secondary={secondary}>
        <AvatarImage src={src} alt={alt} href={href} />
      </Tooltip>
    );
  }

  return <AvatarImage src={src} alt={alt} href={href} />;
};
