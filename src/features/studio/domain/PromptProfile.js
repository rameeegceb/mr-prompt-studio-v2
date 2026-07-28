export default class PromptProfile {
  constructor() {
    this.originalPrompt = "";

    this.intent = {
      name: "General",
      confidence: 0,
    };

    this.domain = {
      name: "General",
      confidence: 0,
      keywords: [],
    };

    this.role = "";

    this.audience = "";

    this.framework = {
      name: "",
      reason: "",
    };

    this.complexity = {
      level: "Simple",
      score: 0,
    };

    this.quality = {
      score: 0,
      grade: "C",
    };

    this.statistics = {
      characters: 0,
      words: 0,
      sentences: 0,
    };

    this.patterns = [];

    this.strengths = [];

    this.weaknesses = [];

    this.recommendations = [];

    this.missing = [];

    this.improvedPrompt = "";

    this.score = 0;
  }
}