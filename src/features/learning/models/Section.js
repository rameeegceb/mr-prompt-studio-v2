export default class Section {
  constructor({
    id,
    title,
    content = "",
    type = "content",
    frameworks = [],
    examples = [],
    outputs = [],
  }) {
    this.id = id;
    this.title = title;
    this.type = type;
    this.content = content;
    this.frameworks = frameworks;
    this.examples = examples;
    this.outputs = outputs;
  }
}