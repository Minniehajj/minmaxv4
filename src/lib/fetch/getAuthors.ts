import { Author } from "@/types";
import { extractAuthors } from "../extract";
import { AUTHOR_GRAPHQL_FIELDS } from "../graphQLFields";
import { fetchGraphQL } from "./fetchGraphQL";

export const getAuthors = async (
  preview: boolean
): Promise<{
  authors: Author[];
}> => {
  const response = await fetchGraphQL(
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
    authors: extractAuthors(response?.data ?? {}),
  };
};
