import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") as string;

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const { post } = await getPostAndMorePosts(slug, true);

  if (!post) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();
  redirect(`/article/${post.slug}`);
}
