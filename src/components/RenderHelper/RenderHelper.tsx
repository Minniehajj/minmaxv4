/* eslint-disable react/display-name */
import Youtube from "react-youtube";
import Image from "next/image";

// import { Decklist } from "../../organisms/Decklist";
// import TweetEmbed from "../TweetEmbed/TweetEmbed";
import { Key } from "react";
import getYoutubeId from "@/lib/getYoutubeId";
import { ArticleBody, ArticleBodyProps } from "../ArticleBody";
import { YoutubeRenderer } from "../YoutubeRenderer";

export const RenderAsset =
  (assetMap: any): any =>
  (node: { data: { target: { sys: { id: number } } } }) => {
    const asset = assetMap.get(node.data.target.sys.id);
    if (!asset) {
      return <></>;
    }
    switch (asset.contentType) {
      case "image/png":
      case "image/jpeg":
        return (
          <Image
            src={asset.url}
            width={asset.width}
            height={asset.height}
            alt={asset.title}
            quality={75}
          />
        );
      default:
        return <></>;
    }
  };

export const RenderEntry =
  (entryMap: any): any =>
  (node: { data: { target: { sys: { id: number } } } }) => {
    const entry = entryMap.get(node.data.target.sys.id);
    if (!entry) {
      return <></>;
    }
    switch (entry.__typename) {
      case "Video":
        const videoId = getYoutubeId(entry.url);
        if (!videoId) return null;
        return <YoutubeRenderer videoId={videoId} title={entry.title} />;
      // case "Decklist":
      // return <Decklist list={entry.list} title={entry.title} />;
      // case "TwitterEmbed":
      //   return <TweetEmbed tweetId={entry.tweetId} />;
      default:
        return <></>;
    }
  };

export const RenderBlock = (): any => (node: any) => {
  const asset = node;
  if (!asset) {
    return <></>;
  }
  switch (asset.nodeType) {
    case "paragraph":
      const block = asset.content.map(
        (
          child: JSX.IntrinsicAttributes & ArticleBodyProps,
          index: Key | null | undefined
        ) => {
          return <ArticleBody {...child} key={index} />;
        }
      );
      return <p>{block}</p>;
    default:
      return <></>;
  }
};
