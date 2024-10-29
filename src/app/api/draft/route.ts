import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") as string;

  const { post } = await getPostAndMorePosts(slug, true);

  if (!post) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();

  redirect(`/article/${post.slug}`);
}
