export async function loadGuide() {
  const response = await fetch("/learning/prompt-engineering-guide.html");

  if (!response.ok) {
    throw new Error("Unable to load Prompt Engineering Guide.");
  }

  return await response.text();
}