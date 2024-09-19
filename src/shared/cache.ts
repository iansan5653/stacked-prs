import browser from "webextension-polyfill";

const defaultBranchKey = (owner: string, repo: string) =>
  `default-branch:${owner}/${repo}`;

export async function cacheDefaultBranch(
  owner: string,
  repo: string,
  defaultBranch: string
) {
  return browser.storage.session.set({
    [defaultBranchKey(owner, repo)]: defaultBranch,
  });
}

export async function getCachedDefaultBranch(owner: string, repo: string) {
  const key = defaultBranchKey(owner, repo);
  const {[key]: value} = await browser.storage.session.get(key);
  return typeof value === "string" ? value : null;
}
