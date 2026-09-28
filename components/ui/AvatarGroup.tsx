import { Avatar } from "./Avatar";

interface AvatarGroupProps {
  avatars: {
    src: string;
    alt: string;
    href?: string;
    primary?: string;
    secondary?: string;
  }[];
}

export const AvatarGroup = ({ avatars }: AvatarGroupProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {avatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          href={avatar.href}
          primary={avatar.primary}
          secondary={avatar.secondary}
        />
      ))}
    </div>
  );
};
