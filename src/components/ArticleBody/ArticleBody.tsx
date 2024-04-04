import reactStringReplace from "react-string-replace";
// import { CardToolTip } from "../CardToolTip";

import Link from "next/link";
import { ArticleBodyProps } from ".";
import { CardToolTip } from "../CardToolTip";
import { FC, PropsWithChildren } from "react";
export const ArticleBody = ({ ...props }: ArticleBodyProps) => {
  let parsedBody;
  const p = /\[([\s\w\d-+_/,'’&À-ÿ]*)\]/g;

  if (props.nodeType === "text") {
    const body = props?.value?.replace(/[\u2018\u2019]/g, "'");

    parsedBody = reactStringReplace(body, p, (match, i) => (
      <CardToolTip key={`index-${i}`} name={match} />
    ));
  }
  if (props.nodeType === "hyperlink" && props?.data?.uri && props.content) {
    return (
      <Link href={props?.data.uri} target="_blank">
        {props?.content[0]?.value}
      </Link>
    );
  }

  return <>{parsedBody}</>;
};

export const ArticleBodyFromJSON: FC<PropsWithChildren> = ({ children }) => {
  const stringifiedChildren = JSON.stringify(children);
  let parsedBody;
  const p = /\[([\s\w\d-+_/,'’&À-ÿ]*)\]/g;
  const body = stringifiedChildren
    .replace(/[\u2018\u2019]/g, "'")
    // this will be enclosed with [" and "] and we need to remove them, and the square brackets
    .slice(2, -2)
    .replace(/\\n/g, "");

  parsedBody = reactStringReplace(body, p, (match, i) => (
    <CardToolTip key={`index-${i}`} name={match} />
  ));
  return <>{parsedBody}</>;
};
