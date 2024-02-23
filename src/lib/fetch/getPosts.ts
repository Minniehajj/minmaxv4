import { PostProps } from "@/types";
import { extractPostEntries } from "../extract";
import { POST_GRAPHQL_FIELDS } from "../graphQLFields";
import { fetchGraphQL } from "./fetchGraphQL";

export async function getAllPosts(
  isDraftMode: boolean,
  page: number = 1
): Promise<PostProps[]> {
  const queryLimit = page === 1 ? 10 : 9;
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;
  const entries = await fetchGraphQL(
    // postCollection(limit: ${queryLimit}, skip: ${
    //   page === 1 ? skip : skip + 1
    `query {
      postCollection(limit: ${queryLimit}, skip: ${
      page === 1 ? skip : skip + 1
    } where: { slug_exists: true }, order: publishDate_DESC, preview: ${
      isDraftMode ? "true" : "false"
    }) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    isDraftMode
  );
  return extractPostEntries(entries.data);
}
