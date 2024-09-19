import browser from "webextension-polyfill";

export async function getGitHubPat() {
  const {github_pat: value} = await browser.storage.sync.get("github_pat");
  return typeof value === "string" ? value : null;
}

export async function setGitHubPat(value: string) {
  return browser.storage.sync.set({github_pat: value});
}
