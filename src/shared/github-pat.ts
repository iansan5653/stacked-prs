declare const GitHubPatBrand: unique symbol;

export type GitHubPat = string & {[GitHubPatBrand]: never};

export function brandGitHubPat(value: string) {
  return value as GitHubPat;
}
