export default class Course {
  constructor({
    id = "prompt-engineering",
    title = "",
    description = "",
    version = "1.0",
    chapters = [],
  } = {}) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.version = version;
    this.chapters = chapters;
  }

  addChapter(chapter) {
    this.chapters.push(chapter);
  }

  getChapter(id) {
    return this.chapters.find(c => c.id === id);
  }

  getChapterBySlug(slug) {
    return this.chapters.find(c => c.slug === slug);
  }

  get totalChapters() {
    return this.chapters.length;
  }
}