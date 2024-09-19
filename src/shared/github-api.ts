import {Octokit} from "octokit";
import type {Api} from "@octokit/plugin-rest-endpoint-methods";
import {getGitHubPat} from "./options";

export type GitHubRestClient = Api["rest"];

export async function githubClient(): Promise<GitHubRestClient> {
  const auth = (await getGitHubPat()) ?? undefined;

  return new Octokit({
    userAgent: "iansan5653/stacked-prs-extension",
    auth,
  }).rest;
}
