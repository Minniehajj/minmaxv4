import { AuthorsGroup } from "@/components/AuthorsGroup";
import { MarkdownParser } from "@/components/MarkdownParser";
import { RichText } from "@/components/RichText";
import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { TimerIcon } from "@radix-ui/react-icons";
import { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const { isEnabled } = draftMode();

  const { post } = await getPostAndMorePosts(params.slug, isEnabled);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    openGraph: {
      images: [...previousImages, post.heroImage.url],
    },
    authors: [
      ...post.authorsCollection.items.map((author) => {
        return {
          name: author.title,
          twitter: author.twitter,
        };
      }),
    ],
    description: post.metaDescription,
  };
}

const PostPage = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const { post } = await getPostAndMorePosts(params.slug, isEnabled);

  return (
    <main className="pt-2 pb-12">
      <div className="prose m-auto mb-8 text-center dark:prose-invert lg:prose-2xl">
        <h1>{post.title}</h1>
        <Image
          {...post.heroImage}
          priority
          alt={post.heroImage.alt || post.title}
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
      <div
        className="fixed top-0 left-0 -z-10 h-full min-h-[1080px] w-full bg-theme-white bg-cover bg-center bg-no-repeat bg-blend-screen dark:bg-theme-black dark:bg-blend-multiply"
        style={
          post.heroImage && { backgroundImage: `url(${post.heroImage.url})` }
        }
      />
    </main>
  );
};

export default PostPage;
