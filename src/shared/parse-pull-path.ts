export function parsePullPath() {
  const [, owner, repo, pullIndicator, pull, ...rest] =
    window.location.pathname.split("/");

  if (owner && repo && pullIndicator === "pull" && pull && rest.length === 0)
    return {owner, repo, pull};
}
