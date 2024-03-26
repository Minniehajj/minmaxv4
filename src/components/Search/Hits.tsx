"use client";
import Link from "next/link";
import { useHits } from "react-instantsearch";
import { ReactNode } from "react";
import { CardToolTip } from "../CardToolTip";
import reactStringReplace from "react-string-replace";

const filterText = (text: string) => {
  const parsedtext = text.replace(/[\u2018\u2019]/g, "'");
  const p = /\[([\s\w\d-+_/,'’&À-ÿ]*)\]/g;

  const parsedBody = reactStringReplace(parsedtext, p, (match, i) => (
    <CardToolTip key={`index-${i}`} name={match} />
  ));
  return parsedBody;
};
export const Hits = () => {
  const { hits } = useHits();

  return (
    <div className="flex max-w-96 flex-col items-center m-auto text-center gap-4">
      {hits.map((hit) => (
        <article key={hit.objectID}>
          <Link href={hit.url as string} className="group">
            <h2 className="mt-2 text-center text-2xl font-bold">
              {hit.title as ReactNode}
            </h2>
            <p>{filterText(hit.content as string)}</p>
          </Link>
        </article>
      ))}
    </div>
  );
};
