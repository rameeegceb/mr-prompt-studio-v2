export default class AIOutput {
  constructor({
    id,
    title,
    content = "",
  }) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}