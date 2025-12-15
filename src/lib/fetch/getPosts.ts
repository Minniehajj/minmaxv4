import { PostProps } from "@/types";
import { extractPostEntries, extractPostEntriesFromAuthors } from "../extract";
import { POST_GRAPHQL_FIELDS } from "../graphQLFields";
import { fetchGraphQL } from "./fetchGraphQL";

type SlugTotals = {
  totalPosts: number;
  totalPages: number;
  paths: { params: { slug: string } }[];
  slugs: { slug: string }[];
};

const emptyTotals: SlugTotals = {
  totalPosts: 0,
  totalPages: 0,
  paths: [],
  slugs: [],
};

export async function getAllPostSlugs(isDraftMode: boolean): Promise<SlugTotals> {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, preview: ${
        isDraftMode ? "true" : "false"
      }) {
        items {
          slug
        }
      }
    }`,
    isDraftMode
  );

  const items = entries?.data?.postCollection?.items ?? [];
  const totalPosts = items.length;
  const totalPages = totalPosts > 0 ? Math.ceil(totalPosts / 6) : 0;
  const paths: { params: { slug: string } }[] = [];
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { slug: page.toString() } });
  }

  return {
    totalPosts,
    totalPages,
    paths,
    slugs: items,
  };
}

export async function getAllPosts(
  isDraftMode: boolean,
  page: number = 1
): Promise<PostProps[]> {
  const queryLimit = page === 1 ? 7 : 6;
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;
  const entries = await fetchGraphQL(
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
  return extractPostEntries(entries?.data ?? {});
}

export async function getAllPostsByAuthor(
  authorSlug: string,
  page: number,
  isDraftMode: boolean
): Promise<PostProps[]> {
  const queryLimit = 6;
  const skipMultiplier = page === 1 ? 0 : page - 1;
  const skip = skipMultiplier > 0 ? queryLimit * skipMultiplier : 0;
  const entries = await fetchGraphQL(
    `query {
      authorCollection(limit: 1, where: { slug: "${authorSlug}" }, preview: ${
      isDraftMode ? "true" : "false"
    }) {
        items {
          linkedFrom {
            postCollection(limit: 6, skip: ${
              page === 1 ? skip : skip + 1
            }, preview: ${isDraftMode ? "true" : "false"}) {
              items{
                heroImage{
                  url
                  height
                  width
                }
                slug
                title
                publishDate
              }
            }
          }
        }
      }
    }`,
    isDraftMode
  );

  return extractPostEntriesFromAuthors(entries?.data ?? {});
}

export async function getAllPostSlugsByAuthor(
  authorSlug: string,
  isDraftMode: boolean
): Promise<{
  totalPosts: number;
  totalPages: number;
  paths: { params: { slug: string } }[];
}> {
  const entries = await fetchGraphQL(
    `query {
      authorCollection(limit: 1, where: { slug: "${authorSlug}" }, preview: ${
      isDraftMode ? "true" : "false"
    }) {
        items {
          linkedFrom {
            postCollection(preview: ${isDraftMode ? "true" : "false"}) {
              items{
                slug
              }
            }
          }
        }
      }
    }`,
    isDraftMode
  );
  const items =
    entries?.data?.authorCollection?.items?.[0]?.linkedFrom?.postCollection
      ?.items ?? [];
  const totalPosts = items.length;
  const totalPages = totalPosts > 0 ? Math.ceil(totalPosts / 6) : 0;
  const paths: { params: { slug: string } }[] = [];
  for (let page = 2; page <= totalPages; page++) {
    paths.push({ params: { slug: page.toString() } });
  }
  return {
    totalPosts,
    totalPages,
    paths,
  };
}
