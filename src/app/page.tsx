import Hero from "@/components/Hero/Hero";
import { MoreArticles } from "@/components/MoreArticles";
import { getAllPostSlugs, getAllPosts } from "@/lib/fetch/getPosts";
import getStuff from "@/lib/scripts/indexAlgolia";
import { draftMode } from "next/headers";

const Home = async () => {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const { totalPages } = await getAllPostSlugs(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col pt-2 pb-12">
      <Hero
        title={heroPost.title}
        slug={heroPost.slug}
        // setBackgroundImage={heroPost.setBackgroundImage}
        image={{
          ...heroPost.heroImage,
        }}
        description={heroPost.metaDescription}
        readTime={heroPost.readTime}
        authors={heroPost.authorsCollection.items}
      />

      <MoreArticles data={morePosts} totalPages={totalPages} currentPage={1} />
    </main>
  );
};
export default Home;
