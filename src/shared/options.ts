import browser from "webextension-polyfill";
import {brandGitHubPat, GitHubPat} from "./github-pat";

export async function getGitHubPat() {
  const value = browser.storage.sync.get("github_pat");
  return typeof value === "string" ? brandGitHubPat(value) : null;
}

export async function setGitHubPat(value: GitHubPat) {
  return browser.storage.sync.set({github_pat: value});
}
