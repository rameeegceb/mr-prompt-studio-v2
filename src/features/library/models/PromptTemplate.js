export default class PromptTemplate {
  constructor({
    id,
    title,
    description,
    department,
    category,
    framework,
    difficulty,
    tags = [],
    estimatedScore = 0,
    prompt,
    examples = [],
    bestPractices = [],
    commonMistakes = [],
    version = "1.0",
    author = "Mr. Prompt Studio",
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.department = department;
    this.category = category;
    this.framework = framework;
    this.difficulty = difficulty;
    this.tags = tags;
    this.estimatedScore = estimatedScore;
    this.prompt = prompt;
    this.examples = examples;
    this.bestPractices = bestPractices;
    this.commonMistakes = commonMistakes;
    this.version = version;
    this.author = author;
  }
}