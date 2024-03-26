import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { PaginationProps } from ".";
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
export const Pagination = ({ pages, currentPage }: PaginationProps) => {
  const nextPage = currentPage * 1 + 1;
  const prevPage = currentPage * 1 - 1;
  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          {currentPage > 1 && (
            <PaginationPrevious
              href={currentPage * 1 === 2 ? `/` : `/page/${prevPage}`}
            >
              <ChevronLeftIcon />
              Previous
            </PaginationPrevious>
          )}
        </PaginationItem>
        {currentPage < pages && (
          <PaginationNext href={`/page/${nextPage}`}>
            Next
            <ChevronRightIcon />
          </PaginationNext>
        )}
      </PaginationContent>
    </PaginationComponent>
  );
};
