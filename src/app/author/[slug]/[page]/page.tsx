import { PaginatedClient } from "@/components/PaginatedClient";
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
      <PaginatedClient posts={posts} totalPages={totalPages} params={params} />
    </main>
  );
};

export default AuthorPostsPaginated;
