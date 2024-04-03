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

const PrimaryAuthors = ({ authors }: { authors: Author[] }) => {
  return (
    <div className="flex justify-between">
      {authors.map((author) => (
        <div
          key={author.slug}
          className="flex items-center gap-2 prose text-center"
        >
          <Card>
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
              <CardContent>
                <p className="font-serif">{author.bio}</p>
              </CardContent>
            )}
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PrimaryAuthors;
