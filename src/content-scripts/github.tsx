import {cacheDefaultBranch, getCachedDefaultBranch} from "../shared/cache";
import {githubClient, GitHubRestClient} from "../shared/github-api";
import {parsePullPath} from "../shared/parse-pull-path";
import {createRoot} from "react-dom/client";
import {getRequiredElement} from "../shared/utils";
import {StackedPrs} from "../shared/components/StackedPrs";
import React from "react";

async function getDefaultBranch(
  github: GitHubRestClient,
  owner: string,
  repo: string
) {
  const cached = await getCachedDefaultBranch(owner, repo);
  if (cached) return cached;

  const repository = await github.repos.get({owner, repo});
  const actual = repository.data.default_branch;
  cacheDefaultBranch(owner, repo, actual);
  return actual;
}

function getBaseRef() {
  return document.querySelector(".base-ref")?.textContent;
}

(async () => {
  const pullRequest = parsePullPath();
  if (!pullRequest) return;

  const {owner, repo} = pullRequest;

  const baseRef = getBaseRef();
  if (!baseRef) return;

  const github = await githubClient();
  const defaultBranch = await getDefaultBranch(github, owner, repo);

  if (baseRef === defaultBranch) return;

  const belowPrs = await github.pulls.list({
    owner,
    repo,
    head: `${owner}:${baseRef}`,
  });

  const appContainer = document.createElement("div");
  getRequiredElement(".gh-header-meta", HTMLDivElement).insertAdjacentElement(
    "afterend",
    appContainer
  );

  createRoot(appContainer).render(
    <StackedPrs prs={belowPrs.data.map((pr) => pr.title)} />
  );
})();
