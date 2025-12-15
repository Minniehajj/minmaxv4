import { PostProps } from "@/types";
import { extractPost, extractPostEntries } from "../extract";
import { POST_GRAPHQL_FIELDS } from "../graphQLFields";
import { fetchGraphQL } from "./fetchGraphQL";

export const getPostAndMorePosts = async (
  slug: string,
  preview: boolean
): Promise<{
  post: PostProps | null;
  morePosts: PostProps[];
}> => {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? "true" : "false"
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: publishDate_DESC, preview: ${
      preview ? "true" : "false"
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  );
  return {
    post: extractPost(entry?.data ?? {}),
    morePosts: extractPostEntries(entries?.data ?? {}),
  };
};
