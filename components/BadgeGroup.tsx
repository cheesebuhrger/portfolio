import { Badge } from "./Badge";

interface BadgeGroupProps {
  badges: string[];
}

export const BadgeGroup = ({ badges }: BadgeGroupProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {badges.map((badge, index) => (
        <Badge key={index} text={badge} />
      ))}
    </div>
  );
};
