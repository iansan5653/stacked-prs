import {cacheDefaultBranch, getCachedDefaultBranch} from "../shared/cache";
import {githubClient, GitHubRestClient} from "../shared/github-api";
import {parsePullPath} from "../shared/parse-pull-path";
import {createRoot} from "react-dom/client";
import {getRequiredElement} from "../shared/utils";
import {StackedPrs} from "../shared/components/StackedPrs";
import React from "react";
import {ThemeProvider} from "@primer/react";

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

(async () => {
  const pullRequest = parsePullPath();
  if (!pullRequest) return;

  const {owner, repo} = pullRequest;

  const baseRefElement = document.querySelector(".base-ref");
  const baseRef = baseRefElement?.textContent;
  if (!baseRefElement || !baseRef) return;

  const headRefElement = document.querySelector(".head-ref");
  const headRef = headRefElement?.textContent;
  const headRefCopy = document.querySelector<HTMLElement>(
    `clipboard-copy[value="${headRef}"]`
  );

  const baseRefCopy = headRefCopy?.cloneNode(true) as typeof headRefCopy;
  baseRefCopy?.setAttribute("value", baseRef);
  console.log(baseRefElement, baseRefCopy);
  if (baseRefCopy) {
    baseRefElement.insertAdjacentElement("afterend", baseRefCopy);
    baseRefElement.insertAdjacentText("afterend", " ");
  }

  const github = await githubClient();
  const defaultBranch = await getDefaultBranch(github, owner, repo);

  if (baseRef === defaultBranch) return;

  const belowPrs = await github.pulls.list({
    owner,
    repo,
    head: `${owner}:${baseRef}`,
  });

  belowPrs.data[0]?.html_url;

  const appContainer = document.createElement("div");
  getRequiredElement(".gh-header-meta", HTMLDivElement).insertAdjacentElement(
    "afterend",
    appContainer
  );

  createRoot(appContainer).render(
    <ThemeProvider>
      <StackedPrs prs={belowPrs.data} />
    </ThemeProvider>
  );
})();
