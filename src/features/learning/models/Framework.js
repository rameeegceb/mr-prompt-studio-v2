export default class Framework {
  constructor({
    id,
    name,
    description = "",
    syntax = "",
    examples = [],
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.syntax = syntax;
    this.examples = examples;
  }
}