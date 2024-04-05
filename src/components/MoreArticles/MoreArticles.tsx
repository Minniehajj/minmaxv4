"use client";
import { PostProps } from "@/types";
import * as Avatar from "@radix-ui/react-avatar";
import { ArrowRightIcon, CalendarIcon, TimerIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Key } from "react";
import { CardGridImage } from "../CardGridImage";
import { AuthorsGroup } from "../AuthorsGroup";
import { Pagination } from "../Pagination";
import { formatDateTime } from "@/lib/utils";

export const MoreArticles = ({
  data,
  setBackgroundImage,
  currentPage,
  totalPages,
  authorSlug,
}: {
  data: PostProps[];
  setBackgroundImage?: (image: string) => void;
  currentPage: number;
  totalPages: number;
  authorSlug?: string;
}) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((post: PostProps, index: number) => (
          <article key={index} className="relative mb-4">
            <Link href={`/article/${post.slug}`} className="group">
              <CardGridImage
                {...post.heroImage}
                setBackgroundImage={setBackgroundImage}
              />
              <h2 className="mt-2 text-center text-2xl font-bold">
                {post.title}
              </h2>
              <div className=" flex flex-col items-center gap-2">
                <p className="flex items-center gap-2 text-sm">
                  <CalendarIcon />
                  {formatDateTime(post.publishDate)}
                </p>
                {post.readTime ? (
                  <p className="flex items-center justify-center gap-2 text-center text-sm">
                    <TimerIcon />
                    {post.readTime} minute read
                  </p>
                ) : null}
                <div className="flex gap-8">
                  {post?.authorsCollection?.items && (
                    <AuthorsGroup
                      className="flex items-center justify-center gap-4 text-sm"
                      authors={post.authorsCollection.items}
                    />
                  )}
                </div>
                <div className="mt-4"></div>
                <div className="flex gap-2 items-center">
                  Read More{" "}
                  <span className="transform transition-all  group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <Pagination
        pages={totalPages}
        currentPage={currentPage}
        authorSlug={authorSlug}
      />
    </>
  );
};
