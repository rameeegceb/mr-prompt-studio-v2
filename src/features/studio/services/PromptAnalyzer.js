import PromptPatternDetector from "./PromptPatternDetector";
import PromptComplexityAnalyzer from "./PromptComplexityAnalyzer";
import PromptQualityAnalyzer from "./PromptQualityAnalyzer";
import IntentDetector from "./IntentDetector";

export default class PromptAnalyzer {
  static analyze(prompt) {
    const patterns =
      PromptPatternDetector.detect(
        prompt
      );

    const complexity =
      PromptComplexityAnalyzer.analyze(
        prompt
      );

    const quality =
      PromptQualityAnalyzer.analyze(
        patterns,
        complexity
      );

    const intent =
      IntentDetector.detect(prompt);

    return {
      ...patterns,

      ...complexity,

      ...quality,

      intent: intent.intent,

      confidence:
        intent.confidence,
    };
  }
}