"use client";
import algoliasearch from "algoliasearch/lite";
import { SearchBox } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import AlgoliaSVG from "@/public/algolia.svg";
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string,
  {}
);

export const Search = () => {
  return (
    <>
      <InstantSearchNext
        indexName="articles"
        searchClient={searchClient}
        routing
        future={{
          preserveSharedStateOnUnmount: true,
        }}
      >
        <SearchBox className="text-theme-black" />
      </InstantSearchNext>
      <div className="flex gap-4">
        Powered by <AlgoliaSVG className="w-4 h-4" />
      </div>
    </>
  );
};
