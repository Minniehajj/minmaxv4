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

const SecondaryAuthors = ({ authors }: { authors: Author[] }) => {
  return (
    <div className="flex flex-wrap justify-between gap-2">
      {authors.map((author) => (
        <div
          key={author.slug}
          className="flex items-center gap-2 prose text-center min-w-[300px] mb-12"
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
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SecondaryAuthors;
