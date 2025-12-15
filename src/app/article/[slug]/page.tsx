import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { CalendarIcon, TimerIcon } from "@radix-ui/react-icons";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";

import { AuthorsGroup } from "@/components/AuthorsGroup";
import { MarkdownParser } from "@/components/MarkdownParser";
import { RichText } from "@/components/RichText";
import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";
import { formatDateTime } from "@/lib/utils";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const { post } = await getPostAndMorePosts(params.slug, isEnabled);

  if (!post) {
    return { title: "Post not found" };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    openGraph: {
      images: [...previousImages, post.heroImage.url],
    },
    authors: post.authorsCollection.items.map((author) => ({
      name: author.title,
      twitter: author.twitter,
    })),
    description: post.metaDescription,
  };
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const { post } = await getPostAndMorePosts(params.slug, isEnabled);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-2 pb-12">
      <div className="prose m-auto mb-8 flex flex-col items-center text-center dark:prose-invert lg:prose-2xl">
        <h1 className="!my-0">{post.title}</h1>
        <div className="flex gap-4">
          <p className="flex items-center gap-2 text-base !my-0">
            <CalendarIcon />
            {formatDateTime(post.publishDate)}
          </p>
          <p className="flex items-center gap-2 text-base">
            <TimerIcon />
            {post.readTime} minute read
          </p>
        </div>
        <div>
          <div className="flex gap-8">
            <AuthorsGroup
              authors={post.authorsCollection.items}
              className="flex items-center gap-4 text-sm !my-0"
            />
          </div>
        </div>
        <Image
          {...post.heroImage}
          priority
          alt={post.heroImage.alt || post.title}
          className="shadow-theme-dark -z-[1] aspect-video w-full object-cover opacity-90 shadow-sm dark:shadow-theme-blue"
        />
      </div>
      {(post?.pageBody || post.body) && (
        <div className="prose m-auto dark:prose-invert lg:prose-xl">
          <div className="mb-12" />
          {post.body && !post?.pageBody?.json ? (
            <MarkdownParser>{post.body}</MarkdownParser>
          ) : (
            documentToReactComponents(
              post.pageBody.json,
              RichText(post.pageBody)
            )
          )}
        </div>
      )}
      <div
        className="fixed top-0 left-0 -z-10 h-full min-h-[1080px] w-full bg-theme-white bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-theme-black dark:bg-blend-multiply"
        style={post.heroImage ? { backgroundImage: `url(${post.heroImage.url})` } : {}}
      />
    </main>
  );
};

export default PostPage;
