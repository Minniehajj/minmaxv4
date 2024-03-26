"use client";
import Image from "next/image";
import { FC, useState } from "react";
import { CardGridImageProps } from ".";

export const CardGridImage: FC<CardGridImageProps> = ({
  src,
  alt,
  setBackgroundImage = () => {},
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      onClick={() => setBackgroundImage(src)}
      onMouseEnter={() => setBackgroundImage(src)}
      onFocus={() => setBackgroundImage(src)}
      className="shadow-theme-dark bg-theme-black transition duration-200 ease-in-out hover:ease-in
      rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <Image
        src={src}
      alt={alt}
        priority
        {...props}
        className={`${
          loaded ? "blur-none" : "blur-lg"
        } aspect-video h-full w-full object-cover`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};
