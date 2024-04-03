import { MoreArticles } from "@/components/MoreArticles";
import {
  getAllPostsByAuthor,
  getAllPostSlugsByAuthor,
} from "@/lib/fetch/getPosts";

import { draftMode } from "next/headers";

const AuthorPostsPaginated = async ({
  params,
}: {
  params: { slug: string; page: number };
}) => {
  const { isEnabled } = draftMode();
  const posts = await getAllPostsByAuthor(params.slug, params.page, isEnabled);
  const { totalPages } = await getAllPostSlugsByAuthor(params.slug, isEnabled);
  return (
    <main className="pt-2 pb-12">
      <MoreArticles
        data={posts}
        currentPage={params.page}
        totalPages={totalPages}
        authorSlug={params.slug}
      />
    </main>
  );
};

export default AuthorPostsPaginated;
