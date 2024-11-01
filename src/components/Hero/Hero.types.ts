import { ImageProps } from "@/types";

export type HeroProps = {
  title: string;
  description: string;
  image: ImageProps;
  slug: string;
  setBackgroundImage?: (image: string) => void;
  readTime?: string;
  authors: {
    title: string;
    twitter: string;
    slug: string;
    image: {
      url: string;
    };
  }[];
  publishDate: string;
};
