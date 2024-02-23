"use client";
import { Author } from "@/types";
import * as Avatar from "@radix-ui/react-avatar";
import { FC } from "react";
export const AuthorImage: FC<Author> = (author) => {
  return (
    <>
      <Avatar.Root>
        <Avatar.Image
          className="my-0 aspect-square w-12 rounded-full object-cover object-top"
          src={author?.image?.url ? author.image.url : "placeholder.png"}
        ></Avatar.Image>
      </Avatar.Root>
      {author.title}
    </>
  );
};
