"use client";
import Youtube from "react-youtube";
export const YoutubeRenderer = ({
  title,
  videoId,
}: {
  title: string;
  videoId: string;
}) => {
  return (
    <Youtube
      videoId={videoId}
      title={title}
      iframeClassName="w-full h-full aspect-video"
    />
  );
};
