export const fetchGraphQL = async (
  query: string,
  preview = false
): Promise<{ data: unknown; errors?: unknown }> => {
  try {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            preview
              ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
              : process.env.CONTENTFUL_ACCESS_TOKEN
          }`,
        },
        body: JSON.stringify({ query }),
        next: { tags: ["posts"] },
      }
    );

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Contentful fetchGraphQL error", error);
    return { data: null, errors: [error] };
  }
};
