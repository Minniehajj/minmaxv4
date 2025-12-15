"use client";
import { liteClient as algoliasearch } from "algoliasearch/lite";

import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useHits } from "react-instantsearch";
import AlgoliaSVG from "@/public/algolia.svg";
import { Hits } from "./Hits";

import { SearchBox } from "./SearchBox";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
  {}
);

export const Search = () => {
  return (
    <div className="">
      <InstantSearchNext
        indexName="articles"
        searchClient={searchClient}
        routing
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <SearchBox />
        <div className="h-4"></div>
        <div className="flex gap-2 items-center">
          Powered by <AlgoliaSVG className="w-4 h-4" />
          Algolia
          <span className="sr-only">Algolia</span>
        </div>
        <Hits />
      </InstantSearchNext>
    </div>
  );
};
