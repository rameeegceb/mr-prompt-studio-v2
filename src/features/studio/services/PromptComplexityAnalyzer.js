import {
  sentenceCount,
  wordCount,
} from "./utils";

export default class PromptComplexityAnalyzer {
  static analyze(prompt = "") {
    const words = wordCount(prompt);

    const sentences =
      sentenceCount(prompt);

    let complexity = "Low";

    if (words >= 80)
      complexity = "Medium";

    if (words >= 180)
      complexity = "High";

    if (words >= 350)
      complexity = "Enterprise";

    return {
      complexity,

      wordCount: words,

      sentenceCount: sentences,

      averageWordsPerSentence:
        sentences === 0
          ? 0
          : Math.round(words / sentences),
    };
  }
}