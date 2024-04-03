import { Author, PostProps } from "@/types";
import { extractAuthors, extractPost, extractPostEntries } from "../extract";
import { AUTHOR_GRAPHQL_FIELDS, POST_GRAPHQL_FIELDS } from "../graphQLFields";
import { fetchGraphQL } from "./fetchGraphQL";

export const getAuthors = async (
  preview: boolean
): Promise<{
  authors: Author[];
}> => {
  const authors = await fetchGraphQL(
    `query {
      authorCollection(preview: ${preview ? "true" : "false"}) {
        items {
          ${AUTHOR_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );

  return {
    authors: extractAuthors(authors.data),
  };
};
