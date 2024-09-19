import {Octokit} from "octokit";
import type {Api} from "@octokit/plugin-rest-endpoint-methods";
import {getGitHubPat} from "./options";

export async function githubClient(): Promise<Api["rest"]> {
  const auth = (await getGitHubPat()) ?? undefined;

  return new Octokit({
    userAgent: "iansan5653/stacked-prs-extension",
    auth,
  }).rest;
}
