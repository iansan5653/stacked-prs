export function getRequiredElement<T extends HTMLElement>(
  selector: string,
  expectedElementType: new () => T
): T {
  const result = document.querySelector(selector);
  const filtered =
    result && result instanceof expectedElementType ? result : null;
  if (!filtered) throw new Error(`Element not found: ${selector}`);

  return filtered;
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
