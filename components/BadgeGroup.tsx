import { Badge } from "./Badge";

interface BadgeGroupProps {
  badges: string[];
}

export const BadgeGroup = ({ badges }: BadgeGroupProps) => {
  return (
    <div className="flex flex-row flex-wrap gap-1">
      {badges.map((badge, index) => {
        const isNegative = badge.startsWith("!");
        const text = isNegative ? badge.slice(1) : badge;

        return <Badge key={index} text={text} negative={isNegative} />;
      })}
    </div>
  );
};
