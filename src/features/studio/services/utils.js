export function normalize(text = "") {
  return text.toLowerCase().trim();
}

export function contains(text, keywords = []) {
  const value = normalize(text);

  return keywords.some((keyword) =>
    value.includes(keyword.toLowerCase())
  );
}

export function wordCount(text = "") {
  if (!text.trim()) return 0;

  return text.trim().split(/\s+/).length;
}

export function sentenceCount(text = "") {
  if (!text.trim()) return 0;

  return text
    .split(/[.!?]+/)
    .filter(Boolean).length;
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function unique(items = []) {
  return [...new Set(items)];
}