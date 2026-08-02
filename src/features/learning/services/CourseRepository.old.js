import { loadGuide } from "./guideLoader";
import CourseParser from "./CourseParser";
import ContentExtractor from "./ContentExtractor";

class CourseRepository {
  constructor() {
    this.course = null;

    this.parser = new CourseParser();
    this.extractor = new ContentExtractor();
  }

  async loadCourse(forceRefresh = false) {
    if (this.course && !forceRefresh) {
      return this.course;
    }

    const html = await loadGuide();

    const course = this.parser.parse(html);

    this.course =
      this.extractor.enrichCourse(course);

    return this.course;
  }

  async getCourse() {
    return this.loadCourse();
  }

  async getChapters() {
    const course =
      await this.loadCourse();

    return course.chapters;
  }

  async getChapter(id) {
    const course =
      await this.loadCourse();

    return (
      course.chapters.find(
        (c) =>
          c.id === id ||
          c.slug === id
      ) ?? null
    );
  }

  async getSection(sectionId) {
    const course =
      await this.loadCourse();

    for (const chapter of course.chapters) {
      const section =
        chapter.sections.find(
          (s) => s.id === sectionId
        );

      if (section) {
        return section;
      }
    }

    return null;
  }

  async search(text) {
    const course =
      await this.loadCourse();

    const keyword =
      text.toLowerCase();

    const results = [];

    course.chapters.forEach(
      (chapter) => {
        chapter.sections.forEach(
          (section) => {
            if (
              section.title
                .toLowerCase()
                .includes(keyword) ||
              section.content
                .toLowerCase()
                .includes(keyword)
            ) {
              results.push({
                chapter,
                section,
              });
            }
          }
        );
      }
    );

    return results;
  }

  clearCache() {
    this.course = null;
  }
}

export default new CourseRepository();