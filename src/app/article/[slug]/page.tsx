import { AuthorsGroup } from "@/components/AuthorsGroup";
import { MarkdownParser } from "@/components/MarkdownParser";
import { RichText } from "@/components/RichText";
import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { TimerIcon } from "@radix-ui/react-icons";
import { draftMode } from "next/headers";
import Image from "next/image";

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);

  return (
    <main className="pt-2 pb-12">
      <div className="prose m-auto mb-8 text-center dark:prose-invert lg:prose-2xl">
        <h1>{post.title}</h1>
        <Image
          {...post.heroImage}
          priority
          alt={post.heroImage.alt}
          className="shadow-theme-dark -z-[1] aspect-video w-full object-cover opacity-90 shadow-sm dark:shadow-theme-blue"
        />
      </div>
      {(post?.pageBody || post.body) && (
        <div className="prose m-auto dark:prose-invert lg:prose-xl">
          <p className="flex items-center gap-2 text-sm">
            <TimerIcon />
            {post.readTime} minute read
          </p>
          <div className="flex gap-8">
            <AuthorsGroup
              authors={post.authorsCollection.items}
              className="flex items-center gap-4 text-sm"
            />
          </div>
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
    </main>
  );
};

export default PostPage;
