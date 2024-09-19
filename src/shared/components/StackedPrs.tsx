import {
  GitMergeIcon,
  GitMergeQueueIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import {BranchName, Link, Stack, Text, Token} from "@primer/react";
import React, {ReactElement} from "react";
import {PullRequestLink} from "./PullRequestLink";

interface StackedPR {
  id: number;
  title: string;
  html_url: string;
  state: string;
  number: number;
  base: {
    label: string;
    ref: string;
  };
}

interface StackedPrsProps {
  prs: StackedPR[];
}

const StateIcon: Record<string, React.ElementType> = {
  open: () => (
    <span style={{color: "var(--fgColor-open)"}}>
      <GitPullRequestIcon />
    </span>
  ),
  closed: () => (
    <span style={{color: "var(--fgColor-closed)"}}>
      <GitPullRequestClosedIcon />
    </span>
  ),
  draft: () => (
    <span style={{color: "var(--fgColor-neutral)"}}>
      <GitPullRequestDraftIcon />
    </span>
  ),
  merged: () => (
    <span style={{color: "var(--fgColor-done)"}}>
      <GitMergeIcon />
    </span>
  ),
  queued: () => (
    <span style={{color: "var(--fgColor-attention)"}}>
      <GitMergeQueueIcon />
    </span>
  ),
};

export function StackedPrs(props: StackedPrsProps) {
  return (
    <Stack direction="vertical">
      {props.prs.map(({id, title, html_url: url, base, state}) => (
        <Token
          key={id}
          size="xlarge"
          leadingVisual={StateIcon[state] ?? GitPullRequestIcon}
          sx={{
            background: "transparent",
            fontWeight: "normal",
            maxWidth: "900px",
            whiteSpace: "nowrap",
            p: "5px var(--control-medium-paddingInline-normal)",
          }}
          text={
            <>
              Stacks on <PullRequestLink url={url} title={title} /> into{" "}
              <BranchName as="span">{base.ref}</BranchName>
            </>
          }
        />
      ))}
    </Stack>
  );
}
