import { FC } from "react";
import { AuthorGroupProps } from "./AuthorsGroup.types";
import { AuthorImage } from "../AuthorImage";

export const AuthorsGroup: FC<AuthorGroupProps> = ({ authors, className }) => {
  return authors?.map((author, index) => {
    return (
      <p className={className} key={index}>
        <AuthorImage {...author} />
      </p>
    );
  });
};
