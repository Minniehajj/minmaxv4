import { Author, PostProps } from "@/types";
import getReadTime from "./getReadTime";

const FALLBACK_HERO_IMAGE: PostProps["heroImage"] = {
  title: "Placeholder image",
  description: "Fallback hero image",
  contentType: "image/png",
  fileName: "placeholder.png",
  url: "https://minmaxblog.com/placeholder.png",
  width: 1200,
  height: 630,
  src: "https://minmaxblog.com/placeholder.png",
  alt: "Placeholder image",
};

const mapHeroImage = (heroImage?: PostProps["heroImage"]) => {
  if (!heroImage) return FALLBACK_HERO_IMAGE;
  return {
    ...heroImage,
    alt: heroImage.alt ?? heroImage.title,
    src: heroImage.url,
  };
};

const addReadTime = (post: PostProps) => {
  if (post?.pageBody?.json) {
    post.readTime = getReadTime(JSON.stringify(post.pageBody.json));
  }
  if (post?.body) {
    post.readTime = getReadTime(JSON.stringify(post.body));
  }
  if (!post.readTime) {
    post.readTime = "0";
  }
  return post;
};

export function extractPost(fetchResponse: {
  postCollection?: { items?: PostProps[] };
}) {
  const post = fetchResponse?.postCollection?.items?.[0];
  if (!post) return null;
  post.heroImage = mapHeroImage(post.heroImage);
  return addReadTime(post);
}

export function extractAuthors(fetchResponse: {
  authorCollection?: {
    items?: Author[];
  };
}) {
  return fetchResponse?.authorCollection?.items ?? [];
}

export function extractPostEntries(fetchResponse: {
  postCollection?: { items?: PostProps[] };
}) {
  const posts = fetchResponse?.postCollection?.items ?? [];
  return posts.map((post) => {
    post.heroImage = mapHeroImage(post.heroImage);
    return addReadTime(post);
  });
}

export function extractPostEntriesFromAuthors(fetchResponse: {
  authorCollection?: {
    items?: { linkedFrom?: { postCollection?: { items?: PostProps[] } } }[];
  };
}) {
  const posts =
    fetchResponse?.authorCollection?.items?.[0]?.linkedFrom?.postCollection
      ?.items ?? [];
  return posts.map((post) => {
    post.heroImage = mapHeroImage(post.heroImage);
    return addReadTime(post);
  });
}

export function extractPostSlugs(fetchResponse: {
  postCollection?: { items?: PostProps[] };
}) {
  const posts = fetchResponse?.postCollection?.items ?? [];
  return posts.map((post) => {
    return {
      params: { slug: [post.slug] },
    };
  });
}
export function extractAuthorSlugs(fetchResponse: {
  authorCollection?: { items?: PostProps[] };
}) {
  const posts = fetchResponse?.authorCollection?.items ?? [];
  return posts.map((post) => {
    return {
      params: { slug: [post.slug] },
    };
  });
}

export function extractTagEntries(fetchResponse: {
  data?: { tagCollection?: { items?: { title: string; slug: string }[] } };
}) {
  return fetchResponse?.data?.tagCollection?.items;
}

export function extractImage(fetchResponse: {
  data?: { assetCollection?: { items?: { width: number; height: number }[] } };
}) {
  return fetchResponse?.data;
}
