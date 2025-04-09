"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface IconSequenceProps {
  images: string[];
  interval?: number;
  className?: string;
  containerClassName?: string;
}

const IconSequence: React.FC<IconSequenceProps> = ({
  images,
  interval = 100,
  className = "object-cover",
  containerClassName = "relative w-8 h-8",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval]);

  return (
    <div className={containerClassName}>
      <Image
        src={images[currentImageIndex]}
        alt={`Icon ${currentImageIndex + 1}`}
        fill
        className={className}
        priority
      />
    </div>
  );
};

export default IconSequence;
