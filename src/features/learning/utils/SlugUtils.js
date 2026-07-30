/**
 * Slug utility functions for the Learning Hub.
 * Provides consistent, URL-safe identifiers.
 */
export default class SlugUtils {
  /**
   * Converts a string into a URL-friendly slug.
   *
   * Example:
   * "Prompt Engineering Basics"
   * ->
   * "prompt-engineering-basics"
   */
  static slugify(value = "") {
    return value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  /**
   * Generates a unique slug.
   */
  static uniqueSlug(value, existing = new Set()) {
    let slug = this.slugify(value);

    if (!existing.has(slug)) {
      existing.add(slug);
      return slug;
    }

    let counter = 2;

    while (existing.has(`${slug}-${counter}`)) {
      counter++;
    }

    const unique = `${slug}-${counter}`;

    existing.add(unique);

    return unique;
  }

  /**
   * Generates an identifier.
   */
  static createId(prefix, value) {
    return `${prefix}-${this.slugify(value)}`;
  }

  /**
   * Creates sequential identifiers.
   */
  static sequence(prefix, index) {
    return `${prefix}-${index}`;
  }
}