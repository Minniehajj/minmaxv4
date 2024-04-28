import { PaginatedClient } from "@/components/PaginatedClient";
import {
  getAllPostsByAuthor,
  getAllPostSlugsByAuthor,
} from "@/lib/fetch/getPosts";

import { draftMode } from "next/headers";

const AuthorPosts = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const posts = await getAllPostsByAuthor(params.slug, 1, isEnabled);
  const { totalPages } = await getAllPostSlugsByAuthor(params.slug, isEnabled);
  console.log("posts", posts);
  return (
    <main className="pt-2 pb-12">
      <PaginatedClient posts={posts} totalPages={totalPages} params={params} />
    </main>
  );
};

export default AuthorPosts;
