interface BadgeProps {
  text: string;
}

export const Badge = ({ text }: BadgeProps) => {
  return (
    <div className="w-fit h-5 px-1 border border-border-secondary rounded-[4px] text-xs font-mono flex items-center justify-center">
      {text}
    </div>
  );
};
