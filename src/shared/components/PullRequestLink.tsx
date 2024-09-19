import {Link} from "@primer/react";
import React from "react";

interface PullRequestLinkProps {
  title: string;
  url: string;
}

export function PullRequestLink({title, url}: PullRequestLinkProps) {
  return (
    <Link
      href={url}
      sx={{fontWeight: "bold"}}
      className="markdown-title"
      data-hovercard-type="pull_request"
      data-hovercard-url={`${url}/hovercard`}
    >
      {title.split("`").map((text, index, arr) => (
        <React.Fragment key={index}>
          {index % 2 === 0 ? (
            text
          ) : index === arr.length - 1 ? (
            <>`{text}</>
          ) : (
            <code>{text}</code>
          )}
        </React.Fragment>
      ))}
    </Link>
  );
}
