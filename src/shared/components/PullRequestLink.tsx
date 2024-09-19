import {Link} from "@primer/react";
import React from "react";

interface PullRequestLinkProps {
  title: string;
  url: string;
}

export function PullRequestLink({title, url}: PullRequestLinkProps) {
 return (
    <Link href={url} sx={{fontWeight: "bold"}} className="markdown-title">
      {title
        .split("`")
        .map((text, index, arr) =>
          index % 2 === 0 ? (
            text
          ) : index === arr.length - 1 ? (
            <>`{text}</>
          ) : (
            <code>{text}</code>
          )
        )}
    </Link>
  );
}
