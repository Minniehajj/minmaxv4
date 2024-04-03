import { MoreArticles } from "@/components/MoreArticles";
import {
  getAllPostsByAuthor,
  getAllPostSlugsByAuthor,
} from "@/lib/fetch/getPosts";

import { draftMode } from "next/headers";

const AuthorPosts = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const posts = await getAllPostsByAuthor(params.slug, 1, isEnabled);
  const { totalPages } = await getAllPostSlugsByAuthor(params.slug, isEnabled);
  return (
    <main className="pt-2 pb-12">
      <MoreArticles
        data={posts}
        authorSlug={params.slug}
        currentPage={1}
        totalPages={totalPages}
      />
    </main>
  );
};

export default AuthorPosts;
