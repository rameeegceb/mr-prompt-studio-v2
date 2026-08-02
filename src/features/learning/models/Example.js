export default class Example {
  constructor({
    id,
    title,
    prompt = "",
    output = "",
  }) {
    this.id = id;
    this.title = title;
    this.prompt = prompt;
    this.output = output;
  }
}