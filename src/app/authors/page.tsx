import { PrimaryAuthors } from "@/components/PrimaryAuthors";
import { SecondaryAuthors } from "@/components/SecondaryAuthors";
import { getAuthors } from "@/lib/fetch/getAuthors";
import { Author } from "@/types";
import { Metadata } from "next";
import { draftMode } from "next/headers";

export const metadata: Metadata = {
  title: "",
  description: "...",
};

const AuthorsPage = async () => {
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
      <div className="prose">
        <h1 className="text-theme-black dark:text-theme-white">
          Meet the Authors
        </h1>
      </div>
      <div className="h-12" />
      {primaryAuthors.length > 0 && <PrimaryAuthors authors={primaryAuthors} />}
      <div className="h-12" />
      {secondaryAuthors.length > 0 && (
        <SecondaryAuthors authors={secondaryAuthors} />
      )}
    </main>
  );
};

export default AuthorsPage;
