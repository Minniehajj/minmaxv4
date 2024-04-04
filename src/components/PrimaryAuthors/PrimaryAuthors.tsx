import { Author } from "@/types";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { TwitterLogoIcon } from "@radix-ui/react-icons";

const PrimaryAuthors = ({ authors }: { authors: Author[] }) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row items-center justify-between">
      {authors.map((author) => (
        <Card
          key={author.slug}
          className="flex items-center gap-2 prose text-center flex-col"
        >
          <CardHeader className="items-center">
            <CardTitle className="text-theme-black dark:text-theme-white">
              {author.title}
            </CardTitle>
            {author?.image?.url && (
              <CardDescription>
                <Image
                  src={author.image.url}
                  alt={author.title}
                  width={250}
                  height={250}
                  className="rounded-full aspect-square object-cover object-top"
                />
              </CardDescription>
            )}
          </CardHeader>
          {author.bio && (
            <CardContent className="flex flex-col items-center">
              <p className="font-serif">{author.bio}</p>
              {author.twitter && (
                <Link
                  className="text-theme-black dark:text-theme-white"
                  href={"https://twitter.com/" + `${author.twitter}`}
                  target="_blank"
                >
                  <p className="text-theme-primary flex items-center gap-2">
                    <TwitterLogoIcon className="" />@{author.twitter}
                  </p>
                </Link>
              )}
              <Link
                className="text-theme-black dark:text-theme-white"
                href={`/author/${author.slug}`}
              >
                <p className="text-theme-primary">
                  Read more by {author.title}
                </p>
              </Link>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

export default PrimaryAuthors;
