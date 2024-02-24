"use client";
import algoliasearch from "algoliasearch/lite";
import { SearchBox } from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import Image from "next/image";
const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);

const client = algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
export const Search = () => {
  console.log(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );
  return (
    <>
      <InstantSearchNext
        indexName="articles"
        searchClient={searchClient}
        routing
      >
        <SearchBox className="text-theme-black" />
      </InstantSearchNext>
      Powered by{" "}
      <Image src="algolia.svg" alt="Algolia" width={100} height={20} />
    </>
  );
};
