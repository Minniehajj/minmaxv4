import React from "react";

export type ArticleBodyProps = {
  children: React.ReactNode;
  nodeType?: string;
  data?: {
    uri?: string;
  };
  value?: string;
  content?: {
    value?: string;
  }[];
};
