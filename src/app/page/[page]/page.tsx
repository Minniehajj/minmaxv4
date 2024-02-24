import { MoreArticles } from "@/components/MoreArticles";
import { getAllPostSlugs, getAllPosts } from "@/lib/fetch/getPosts";
import { draftMode } from "next/headers";

const PaginatedPage = async ({ params }: { params: { page: number } }) => {
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
