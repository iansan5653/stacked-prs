import browser from "webextension-polyfill";

const timestampKey = (valueKey: string) => `timestamp:${valueKey}`;

async function writeValue(key: string, value: string) {
  const now = new Date();
  try {
    await browser.storage.local.set({
      [key]: value,
      [timestampKey(key)]: now.toISOString(),
    });
  } catch (e) {
    console.warn("Failed to cache value: ", e);
  }
}

async function readValue(key: string, maxAgeMs: number) {
  const {[key]: value, [timestampKey(key)]: isoTimestamp} =
    await browser.storage.local.get([key, timestampKey(key)]);

  if (typeof value !== "string" || typeof isoTimestamp !== "string")
    return null;

  const timestampMs = new Date(isoTimestamp).valueOf();
  const nowMs = new Date().valueOf();
  if (isNaN(timestampMs) || nowMs - timestampMs > maxAgeMs) return null;

  return value;
}

const defaultBranchKey = (owner: string, repo: string) =>
  `default-branch:${owner}/${repo}`;

export async function cacheDefaultBranch(
  owner: string,
  repo: string,
  defaultBranch: string
) {
  try {
    await writeValue(defaultBranchKey(owner, repo), defaultBranch);
  } catch (e) {
    console.warn("Failed to cache default branch name for this repo: ", e);
  }
}

export function getCachedDefaultBranch(owner: string, repo: string) {
  return readValue(defaultBranchKey(owner, repo), 24 * 60 * 60 * 1000);
}
