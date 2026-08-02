import { createEvaluationResult } from "../models/EvaluationResult";

import PromptAnalyzer from "./PromptAnalyzer";
import PromptScorer from "./PromptScorer";
import PromptComparer from "./PromptComparer";
import ImprovementService from "./ImprovementService";
import PromptConverter from "./PromptConverter";
import FrameworkEngine from "./FrameworkEngine";
import KnowledgeEngine from "../../knowledge/engine/KnowledgeEngine";

export default class PromptEngine {
  static evaluate(prompt) {
    const result = createEvaluationResult();

    result.originalPrompt = prompt;

    const analysis =
      PromptAnalyzer.analyze(prompt);

    const knowledgeContext =
      KnowledgeEngine.execute(prompt);

    result.analysis = analysis;

    const framework =
      FrameworkEngine.recommend(
        analysis.intent,
        knowledgeContext
      );

    result.framework = framework;
    result.recommendedFramework =
      framework.recommendedFramework;
    result.confidence =
      framework.confidence || 0;
    result.reason = framework.reason;
    result.relatedTechniques =
      framework.relatedTechniques;
    result.recommendedArticles =
      framework.recommendedArticles;

    const score =
      PromptScorer.score(analysis);

    result.score = {
      overall: score.overall,
      maturity: score.maturity,
      confidence:
        result.confidence || score.confidence,
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
    const normalizedFormat =
      typeof format === "string" &&
      format.trim()
        ? format
        : "poml";

    return PromptConverter.convert(
      prompt,
      normalizedFormat
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