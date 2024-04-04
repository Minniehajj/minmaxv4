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
      className="shadow-theme-black -z-[1] aspect-video w-full object-cover opacity-90 shadow-sm transition duration-100 ease-in-out group-hover:shadow-lg group-hover:ease-in dark:shadow-theme-blue"
    >
      <Image
        src={src}
        alt={alt || "Image"}
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
