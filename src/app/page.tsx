import { HomeClient } from "@/components/HomeClient";
import { getAllPostSlugs, getAllPosts } from "@/lib/fetch/getPosts";
import { Metadata } from "next";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
  title: "Welcome to MinMaxBlog.com",
  description:
    "Check out the latest in hard hitting articles about Magic: The Gathering!",
  
};

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
