"use client";

import type { NextPage } from "next";

import IndexProjects from "@/components/IndexProjects";
import IndexPlayground from "../components/IndexPlayground";

import CursorDot from "@/components/CursorDot";

import { ReactLenis } from "lenis/react";

import { useSplitTypeAnimation } from "@/hooks/useSplitTypeAnimation";

const Home: NextPage = () => {
  useSplitTypeAnimation();
  return (
    <ReactLenis root>
      <div className="min-h-screen bg-surface-background">
        <CursorDot />
        <IndexProjects />
        <IndexPlayground />
      </div>
    </ReactLenis>
  );
};

export default Home;
