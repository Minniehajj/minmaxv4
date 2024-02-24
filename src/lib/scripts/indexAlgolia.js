import algoliasearch from "algoliasearch";
import { createClient } from "contentful";
import removeMd from "remove-markdown";

const indexAlgolia = async () => {
  const {
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_ADMIN_KEY,
    ALGOLIA_INDEX,
    CONTENTFUL_SPACE_ID: space,
    CONTENTFUL_ACCESS_TOKEN: accessToken,
  } = process.env;

  const algoliaClient = algoliasearch(
    NEXT_PUBLIC_ALGOLIA_APP_ID,
    ALGOLIA_ADMIN_KEY
  );
  const algoliaIndex = algoliaClient.initIndex(ALGOLIA_INDEX);

  const ctfClient = createClient({
    space,
    accessToken,
  });

  try {
    const { items } = await ctfClient.getEntries({
      content_type: "post",
      limit: 1000,
    });
    console.log(items.length, "posts found");
    const posts = items.map(post => ({
      url: `/blog/${post.fields.slug}/`,
      // content: `${removeMd(post.fields.body)}`,
      // we want content to be only the first two paragraphs
      content: `${removeMd(post.fields.body).split("\n").slice(0, 2).join(" ")}`,
      title: post.fields.title,
      objectID: post.sys.id
    }));

    const indexedContent = await algoliaIndex.saveObjects(posts);

    console.log("Indexed Content:", indexedContent);
  } catch (err) {
    console.error(err);
  }
}

export default indexAlgolia;