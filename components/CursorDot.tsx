"use client";

import { useCursorAnimation } from "@/hooks/useCursorAnimation";

interface CursorDotProps {
  text?: string;
}

const CursorDot = ({ text = "VIEW MORE" }: CursorDotProps) => {
  useCursorAnimation();

  return (
    <>
      <div className="cursor-text fixed top-0 left-0 rounded-[1000px] w-24 h-24 pointer-events-none z-[50] flex items-center justify-center bg-black text-text-primary-negative">
        <span className="font-mono text-xs uppercase">{text}</span>
      </div>
      <div className="cursor-dot fixed top-0 left-0 rounded-[1000px] w-28 h-28 bg-surface-primary-negative pointer-events-none z-[49]"></div>
    </>
  );
};

export default CursorDot;
