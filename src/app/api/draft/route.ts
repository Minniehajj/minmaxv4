import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("path") as string;
  // slug is prefixed with a slash like %2Fhow-to-prepare-for-eternal-weekend-when-you-havent-played-magic-in-months
  // so we need to remove it
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
  // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

  const parsedSlug = searchParams.get("path")?.replace(/^\/+/, "") as string;

  const { post } = await getPostAndMorePosts(parsedSlug, true);

  if (!post) {
    return new Response("Invalid slug", { status: 401 });
  }

  draftMode().enable();

  redirect(`/article/${post.slug}`);
}
