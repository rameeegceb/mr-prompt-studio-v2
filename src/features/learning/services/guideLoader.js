import { chapters } from "../data/chapters";

const GUIDE_URL = "/learning/prompt-engineering-guide.html";

let cachedHtml = null;
let cachedDocument = null;

export async function loadGuide() {
  if (cachedHtml) return cachedHtml;

  const response = await fetch(GUIDE_URL);

  if (!response.ok) {
    throw new Error("Unable to load Prompt Engineering Guide.");
  }

  cachedHtml = await response.text();

  return cachedHtml;
}

export async function getGuideDocument() {
  if (cachedDocument) return cachedDocument;

  const html = await loadGuide();

  const parser = new DOMParser();

  cachedDocument = parser.parseFromString(
    html,
    "text/html"
  );

  return cachedDocument;
}

export async function getTableOfContents() {
  const doc = await getGuideDocument();

  const headings = [
    ...doc.querySelectorAll("h1,h2,h3"),
  ];

  return headings.map((heading, index) => ({
    id:
      heading.id ||
      `section-${index + 1}`,

    level: Number(
      heading.tagName.substring(1)
    ),

    title: heading.textContent.trim(),
  }));
}

export async function searchGuide(query) {
  if (!query) return [];

  const doc = await getGuideDocument();

  const text = doc.body.innerText
    .replace(/\s+/g, " ")
    .trim();

  const lower = query.toLowerCase();

  const results = [];

  const paragraphs = text.split("\n");

  paragraphs.forEach((paragraph) => {
    if (
      paragraph
        .toLowerCase()
        .includes(lower)
    ) {
      results.push({
        text: paragraph.trim(),
      });
    }
  });

  return results.slice(0, 20);
}

export function searchChapters(query) {
  if (!query) return chapters;

  const value = query.toLowerCase();

  return chapters.filter((chapter) => {
    return (
      chapter.title
        .toLowerCase()
        .includes(value) ||
      chapter.description
        .toLowerCase()
        .includes(value) ||
      chapter.section
        .toLowerCase()
        .includes(value) ||
      chapter.keywords.some((k) =>
        k.toLowerCase().includes(value)
      )
    );
  });
}

export async function estimateReadingTime() {
  const doc = await getGuideDocument();

  const words =
    doc.body.innerText.split(/\s+/).length;

  return Math.ceil(words / 200);
}

export async function getGuideStatistics() {
  const doc = await getGuideDocument();

  const words =
    doc.body.innerText.split(/\s+/).length;

  return {
    words,
    chapters: chapters.length,
    headings:
      doc.querySelectorAll("h1,h2,h3").length,
    estimatedMinutes: Math.ceil(
      words / 200
    ),
  };
}