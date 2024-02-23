import reactStringReplace from "react-string-replace";
// import { CardToolTip } from "../CardToolTip";

import Link from "next/link";
import { ArticleBodyProps } from ".";
export const ArticleBody = ({ ...props }: ArticleBodyProps) => {
  let parsedBody;
  const p = /\[([\s\w\d-+_/,'’&]*)\]/g;

  if (props.nodeType === "text") {
    const body = props?.value?.replace(/[\u2018\u2019]/g, "'");

    parsedBody = reactStringReplace(body, p, (match, i) => (
      <span key={`index-${i}`} className={match}>
        {match}
      </span>
    ));
  }
  if (props.nodeType === "hyperlink" && props?.data?.uri && props.content) {
    return <Link href={props?.data.uri}>{props?.content[0]?.value}</Link>;
  }

  return <>{parsedBody}</>;
};
