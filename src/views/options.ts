import {brandGitHubPat} from "../shared/github-pat";
import {getGitHubPat, setGitHubPat} from "../shared/options";
import {getRequiredElement, sleep} from "../shared/utils";

const optionsForm = getRequiredElement("#options-form", HTMLFormElement);
const patInput = getRequiredElement("#pat", HTMLInputElement);
const status = getRequiredElement("#form-status", HTMLParagraphElement);

async function onLoad() {
  try {
    const pat = await getGitHubPat();
    if (pat) patInput.value = pat;
  } finally {
    patInput.disabled = false;
  }
}

async function onSubmit(event: SubmitEvent) {
  event.preventDefault();

  try {
    const pat = patInput.value;
    await setGitHubPat(brandGitHubPat(pat));

    status.textContent = "Options saved.";
    status.classList.add("success");
  } catch {
    status.textContent = "Failed to save options!";
    status.classList.add("fail");
  } finally {
    await sleep(1000);
    status.textContent = "";
    status.classList.remove("success", "fail");
  }
}

onLoad();

optionsForm.addEventListener("submit", onSubmit);
