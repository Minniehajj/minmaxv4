import { AuthorsGroup } from "@/components/AuthorsGroup";
import { MarkdownParser } from "@/components/MarkdownParser";
import { PrimaryAuthors } from "@/components/PrimaryAuthors";
import { RichText } from "@/components/RichText";
import { SecondaryAuthors } from "@/components/SecondaryAuthors";
import { getAuthors } from "@/lib/fetch/getAuthors";
import { getPostAndMorePosts } from "@/lib/fetch/getPostAndMorePosts";
import { Author } from "@/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { TimerIcon } from "@radix-ui/react-icons";
import { draftMode } from "next/headers";
import Image from "next/image";

const AuthorsPage = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const { authors } = await getAuthors(isEnabled);
  const primaryAuthors: Author[] = [];
  const secondaryAuthors: Author[] = [];
  authors.forEach((author) => {
    if (author.authorType) {
      primaryAuthors.push(author);
    } else {
      secondaryAuthors.push(author);
    }
  });
  return (
    <main className="pt-2 pb-12">
      {primaryAuthors.length > 0 && <PrimaryAuthors authors={primaryAuthors} />}
      <div className="h-12" />
      {secondaryAuthors.length > 0 && (
        <SecondaryAuthors authors={secondaryAuthors} />
      )}
    </main>
  );
};

export default AuthorsPage;
