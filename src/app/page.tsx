import { HomeClient } from "@/components/HomeClient";
import { getAllPostSlugs, getAllPosts } from "@/lib/fetch/getPosts";
import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const allPosts = await getAllPosts(false);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  const firstImage = allPosts[0].heroImage.url;

  return {
    title: "Welcome to MinMaxBlog.com",
    openGraph: {
      images: [...previousImages, firstImage],
    },

    description:
      "Check out the latest in hard hitting articles about Magic: The Gathering!",
  };
}

const Home = async () => {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const { totalPages } = await getAllPostSlugs(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col pt-2 pb-12">
      <HomeClient
        heroPost={heroPost}
        morePosts={morePosts}
        totalPages={totalPages}
      />
    </main>
  );
};
export default Home;
