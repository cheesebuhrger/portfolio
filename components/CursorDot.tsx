"use client";

import { useCursorAnimation } from "@/hooks/useCursorAnimation";
import { useIsTouch } from "@/hooks/useIsTouch";

interface CursorDotProps {
  text?: string;
}

const CursorDot = ({ text = "VIEW MORE" }: CursorDotProps) => {
  useCursorAnimation();
  const isTouch = useIsTouch();

  if (isTouch) return null;

  return (
    <>
      <div className="cursor-text opacity-0 fixed top-0 left-0 rounded-[1000px] w-28 h-28 pointer-events-none z-[50] flex items-center justify-center bg-black text-text-primary-negative">
        <span className="font-mono text-xs uppercase text-center">{text}</span>
      </div>
      <div className="cursor-dot opacity-0 fixed top-0 left-0 rounded-[1000px] w-28 h-28 bg-surface-primary-negative pointer-events-none z-[49]"></div>
    </>
  );
};

export default CursorDot;
