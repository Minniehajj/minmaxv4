import { getAuthors } from "@/lib/fetch/getAuthors";
import { getAllPostSlugs } from "@/lib/fetch/getPosts";
import { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const { slugs } = await getAllPostSlugs(false);
  const { authors } = await getAuthors(false);
  const articleUrls = slugs.map((slug) => ({
    url: `https://minmaxblog.com/article/${slug.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));
  const authorUrls = authors.map((author) => ({
    url: `https://minmaxblog.com/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://minmaxblog.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...articleUrls,
    ...authorUrls,
  ];
};

export default sitemap;
