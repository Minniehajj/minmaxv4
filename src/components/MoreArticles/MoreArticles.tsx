"use client";
import { PostProps } from "@/types";
import * as Avatar from "@radix-ui/react-avatar";
import { TimerIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Key } from "react";
import { CardGridImage } from "../CardGridImage";

export const MoreArticles = ({
  data,
  props,
}: {
  data: PostProps[];
  props?: {
    setBackgroundImage: (image: string) => void;
  };
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((post: PostProps, index: number) => (
        <div key={index} className="relative mb-4">
          <Link href={post.slug} className="group">
            <CardGridImage
              {...post.heroImage}
              // setBackgroundImage={props.setBackgroundImage}
            />
            <h2 className="mt-2 text-center text-2xl font-bold">
              {post.title}
            </h2>
            {post.readTime ? (
              <p className="flex items-center justify-center gap-2 text-center">
                <TimerIcon />
                {post.readTime} minute read
              </p>
            ) : null}

            <div className="mt-4"></div>
            {post.authorsCollection.items?.map(
              (
                author: {
                  image: { url: string | undefined };
                  title: string;
                },
                index: Key
              ) => {
                return (
                  <p
                    className="flex items-center justify-center gap-4 text-sm"
                    key={index}
                  >
                    <Avatar.Root>
                      <Avatar.Image
                        className="my-0 aspect-square w-12 rounded-full object-cover object-top"
                        src={
                          author?.image?.url
                            ? author.image.url
                            : "placeholder.png"
                        }
                      ></Avatar.Image>
                    </Avatar.Root>

                    {author.title}
                  </p>
                );
              }
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};
