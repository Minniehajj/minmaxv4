"use client";
import Link from "next/link";
import { useHits } from "react-instantsearch";
import { ReactNode } from "react";
export const Hits = () => {
  const { hits } = useHits();
  return (
    <div className="flex max-w-96 flex-col items-center m-auto text-center">
      {hits.map((hit) => (
        <article key={hit.objectID} className="relative mb-4">
          <Link href={hit.url as string} className="group">
            <h2 className="mt-2 text-center text-2xl font-bold">
              {hit.title as ReactNode}
            </h2>
            <p>{hit.content as ReactNode}</p>
          </Link>
        </article>
      ))}
    </div>
  );
};
