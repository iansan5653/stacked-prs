import React from "react";

interface StackedPrsProps {
  prs: string[];
}

export function StackedPrs(props: StackedPrsProps) {
  return (
    <ul>
      {props.prs.map((name) => (
        <ul key={name}>{name}</ul>
      ))}
    </ul>
  );
}
