"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

const IndexHero3 = () => {
  return (
    <div className="relative w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="h-[400px] bg-[green] flex items-center justify-center text-[white] text-[40px] snap-always snap-center">
        1
      </div>
      <div className="h-[400px] bg-[blue] flex items-center justify-center text-[white] text-[40px] snap-always snap-center">
        2
      </div>
      <div className="h-[400px] bg-[red] flex items-center justify-center text-[white] text-[40px] snap-always snap-center">
        3
      </div>
      <div className="h-[400px] bg-[yellow] flex items-center justify-center text-[white] text-[40px] snap-always snap-center">
        4
      </div>
      <div className="h-[400px] bg-[purple] flex items-center justify-center text-[white] text-[40px] snap-always snap-center">
        5
      </div>
    </div>
  );
};

export default IndexHero3;
