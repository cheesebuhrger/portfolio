"use client";

import { useEffect, useState } from "react";

export default function InitialLoadTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return <div className={isLoaded ? "" : "initial-load"}>{children}</div>;
}
