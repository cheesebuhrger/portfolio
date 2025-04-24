interface BadgeProps {
  label: string;
  negative?: boolean;
}

export const Badge = ({ label, negative = false }: BadgeProps) => {
  return (
    <div
      className={`w-fit h-5 px-1 border rounded-[4px] text-xs font-mono flex items-center justify-center ${
        negative
          ? "border-border-primary rounded-md"
          : "border-border-secondary text-text-primary"
      }`}
    >
      {label}
    </div>
  );
};
