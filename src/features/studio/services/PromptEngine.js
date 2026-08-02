import { createEvaluationResult } from "../models/EvaluationResult";

import PromptAnalyzer from "./PromptAnalyzer";
import PromptScorer from "./PromptScorer";
import PromptComparer from "./PromptComparer";
import ImprovementService from "./ImprovementService";
import PromptConverter from "./PromptConverter";
import FrameworkEngine from "./FrameworkEngine";

export default class PromptEngine {
  static evaluate(prompt) {
    const result = createEvaluationResult();

    result.originalPrompt = prompt;

    const analysis =
      PromptAnalyzer.analyze(prompt);

    result.analysis = analysis;

    const framework =
      FrameworkEngine.recommend(
        analysis.intent
      );

    result.framework = framework;

    const score =
      PromptScorer.score(analysis);

    result.score = {
      overall: score.overall,
      maturity: score.maturity,
      confidence: score.confidence,
      breakdown: score.breakdown,
    };

    result.strengths =
      score.strengths;

    result.weaknesses =
      score.weaknesses;

    result.recommendations =
      score.recommendations;

    result.improvements =
      score.improvements;

    return result;
  }

  static async improve(prompt) {
    const improved = await ImprovementService.improve(prompt);

    const evaluation =
      this.evaluate(improved);

    evaluation.originalPrompt =
      prompt;

    evaluation.improvedPrompt =
      improved;

    const original =
      this.evaluate(prompt);

    evaluation.comparison = {
      ...PromptComparer.compare(
        prompt,
        improved
      ),

      originalScore:
        original.score.overall,

      improvedScore:
        evaluation.score.overall,

      scoreIncrease:
        evaluation.score.overall -
        original.score.overall,
    };

    return evaluation;
  }

  static convert(
    prompt,
    format = "poml"
  ) {
    return PromptConverter.convert(
      prompt,
      format
    );
  }

  static compare(
    original,
    improved
  ) {
    return PromptComparer.compare(
      original,
      improved
    );
  }
}