import Course from "../models/Course";
import courseData from "../../../content/course.json";

class CourseRepository {
  constructor() {
    // Convert the JSON into a Course domain object
    this.course = new Course(courseData);
  }

  async loadCourse() {
    return this.course;
  }

  async load() {
    return this.loadCourse();
  }

  async getCourse() {
    return this.course;
  }

  async getChapters() {
    return this.course.chapters ?? [];
  }

  async getChapter(idOrSlug) {
    return (
      this.course.chapters.find(
        (chapter) =>
          chapter.id === idOrSlug ||
          chapter.slug === idOrSlug
      ) ?? null
    );
  }

  async getSection(idOrSlug) {
    for (const chapter of this.course.chapters) {
      const section = (chapter.sections ?? []).find(
        (section) =>
          section.id === idOrSlug ||
          section.slug === idOrSlug
      );

      if (section) {
        return section;
      }
    }

    return null;
  }

  async search(query) {
    if (!query) return [];

    const keyword = query.toLowerCase();
    const results = [];

    for (const chapter of this.course.chapters) {
      if (chapter.title?.toLowerCase().includes(keyword)) {
        results.push({
          type: "chapter",
          chapter,
          score: 100,
        });
      }

      for (const section of chapter.sections ?? []) {
        const title = section.title?.toLowerCase() ?? "";
        const content = section.content?.toLowerCase() ?? "";

        if (
          title.includes(keyword) ||
          content.includes(keyword)
        ) {
          results.push({
            type: "section",
            chapter,
            section,
            score: 90,
          });
        }
      }
    }

    return results;
  }

  clearCache() {
    // Reserved for future API implementation
  }
}

export default new CourseRepository();