export default class Chapter {
  constructor({
    id,
    slug,
    title,
    summary = "",
    duration = "",
    order = 0,
    sections = [],
  }) {
    this.id = id;
    this.slug = slug;
    this.title = title;
    this.summary = summary;
    this.duration = duration;
    this.order = order;
    this.sections = sections;
  }

  addSection(section) {
    this.sections.push(section);
  }

  getSection(id) {
    return this.sections.find(s => s.id === id);
  }
}