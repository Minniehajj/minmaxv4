import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { PaginationProps } from ".";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export const Pagination = ({
  pages,
  currentPage,
  authorSlug,
}: PaginationProps) => {
  const nextPage = currentPage * 1 + 1;
  const prevPage = currentPage * 1 - 1;
  const pageURL = authorSlug ? `/author/${authorSlug}/` : `/page/`;
  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 && (
            <PaginationPrevious
              href={currentPage * 1 === 2 ? `/` : `${pageURL + prevPage}`}
            >
              <ChevronLeftIcon />
              Previous
            </PaginationPrevious>
          )}
        </PaginationItem>
        {currentPage < pages && (
          <PaginationNext href={`${pageURL + nextPage}`}>
            Next
            <ChevronRightIcon />
          </PaginationNext>
        )}
      </PaginationContent>
    </PaginationComponent>
  );
};
