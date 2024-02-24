import Hero from "@/components/Hero/Hero";
import { MoreArticles } from "@/components/MoreArticles";
import { getAllPostSlugs, getAllPosts } from "@/lib/fetch/getPosts";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { draftMode } from "next/headers";

const PaginatedPage = async ({ params }: Params) => {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled, params.page);
  const { totalPages } = await getAllPostSlugs(isEnabled);
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col pt-2 pb-12">
      <MoreArticles
        data={allPosts}
        totalPages={totalPages}
        currentPage={params.page}
      />
    </main>
  );
};
export default PaginatedPage;
