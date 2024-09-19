import {githubClient} from "../shared/github-api";
import {parsePullPath} from "../shared/parse-pull-path";

(async () => {
  const pullRequest = parsePullPath();
  console.log(pullRequest);
  if (!pullRequest) return;

  const {owner, repo} = pullRequest;

  const baseRef = document.querySelector(".base-ref")?.textContent;
  console.log(baseRef);
  if (!baseRef) return;

  const github = await githubClient();
  const repository = await github.repos.get({owner, repo});

  if (baseRef === repository.data.default_branch) return;

  const belowPrs = await github.pulls.list({owner, repo, head: baseRef});

  console.log(belowPrs.data.map((pr) => pr.title));
})();
