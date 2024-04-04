import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import React, { Key } from "react";
import { MarkdownParserProps } from "./MarkdownParser.types";
import Image from "next/image";
// import { CardToolTip } from "../CardToolTip";
import { ArticleBody, ArticleBodyProps } from "../ArticleBody";
import parseNode from "@/lib/parseNode";
import { CardToolTip } from "../CardToolTip";

export const MarkdownParser = async ({
  children = "",
}: MarkdownParserProps) => {
  const body = children.replace(/[\u2018\u2019]/g, "'");
  const data = await richTextFromMarkdown(body, async (mdNode) => {
    return parseNode(mdNode) as any;
  });

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (asset: any) => {
        return (
          <Image
            src={"https:" + asset.data.target.sys.id}
            width={asset.width || 1920}
            height={asset.height || 1080}
            alt={asset.data.target.sys.alt || "Image"}
            quality={75}
          />
        );
      },
      ["linkReference"]: (node: any) => {
        return <CardToolTip name={node.value} />;
      },
      ["iframe"]: (node: any) => {
        return (
          <div
            className="aspect-video"
            dangerouslySetInnerHTML={{ __html: node.value }}
          />
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any) => {
        const block = node.content.map(
          (
            child: JSX.IntrinsicAttributes & ArticleBodyProps,
            index: Key | null | undefined
          ) => {
            return <ArticleBody {...child} key={index} />;
          }
        );
        return <p>{block}</p>;
      },
      [BLOCKS.HEADING_1]: (node: any) => {
        const block = node.content.map(
          (
            child: JSX.IntrinsicAttributes & ArticleBodyProps,
            index: Key | null | undefined
          ) => {
            return <ArticleBody {...child} key={index} />;
          }
        );
        return <h1>{block}</h1>;
      },
      [BLOCKS.HEADING_2]: (node: any) => {
        const block = node.content.map(
          (
            child: JSX.IntrinsicAttributes & ArticleBodyProps,
            index: Key | null | undefined
          ) => {
            return <ArticleBody {...child} key={index} />;
          }
        );
        return <h2>{block}</h2>;
      },
      [BLOCKS.HEADING_3]: (node: any) => {
        const block = node.content.map(
          (
            child: JSX.IntrinsicAttributes & ArticleBodyProps,
            index: Key | null | undefined
          ) => {
            return <ArticleBody {...child} key={index} />;
          }
        );
        return <h3>{block}</h3>;
      },
    },
  };
  return (
    <article className=" prose m-auto dark:prose-invert lg:prose-xl">
      {data && documentToReactComponents(data, options)}
    </article>
  );
};
