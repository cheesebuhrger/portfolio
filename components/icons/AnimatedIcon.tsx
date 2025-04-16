"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatedIconType, animatedIcons } from "./animatedIcons";

interface AnimatedIconProps {
  type: AnimatedIconType;
  size?: "24" | "32";
  interval?: number;
  className?: string;
  containerClassName?: string;
  label?: string;
}

const sizeClasses = {
  "24": "w-6 h-6",
  "32": "w-8 h-8",
};

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  type,
  size = "32",
  interval,
  className = "object-cover w-full h-full",
  containerClassName = "",
  label,
}) => {
  const sequence = animatedIcons[type];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % sequence.urls.length
      );
    }, interval ?? sequence.defaultInterval ?? 100);

    return () => clearInterval(intervalId);
  }, [sequence.urls.length, interval, sequence.defaultInterval]);

  return (
    <div
      className={`relative ${sizeClasses[size]} ${containerClassName}`}
      aria-label={label ?? sequence.label}
    >
      <Image
        src={sequence.urls[currentImageIndex]}
        alt={`${label ?? sequence.label} - frame ${currentImageIndex + 1} of ${
          sequence.urls.length
        }`}
        fill
        className={className}
        priority
      />
    </div>
  );
};

export default AnimatedIcon;
