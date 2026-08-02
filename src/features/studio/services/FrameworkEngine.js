import frameworkRules from "../data/frameworkRules";

export default class FrameworkEngine {
  static recommend(
    intent,
    knowledgeContext = null
  ) {
    const knowledgeFramework =
      knowledgeContext?.framework;
    const knowledgeAnalysis =
      knowledgeContext?.analysis;

    if (knowledgeFramework) {
      return {
        name: knowledgeFramework.title,
        reason:
          knowledgeFramework.description ||
          `Matched ${knowledgeFramework.title} from ${knowledgeFramework.chapterTitle}.`,
        confidence:
          Math.round(
            knowledgeAnalysis?.confidence ?? 0
          ),
        relatedTechniques:
          knowledgeContext?.techniques ?? [],
        recommendedArticles:
          knowledgeContext?.examples ?? [],
        recommendedFramework:
          knowledgeFramework,
        source: "knowledge",
      };
    }

    const result =
      frameworkRules.find(
        (rule) => rule.intent === intent
      ) || frameworkRules.at(-1);

    return {
      name: result.framework,
      reason: result.reason,
      confidence: 0,
      relatedTechniques: [],
      recommendedArticles: [],
      recommendedFramework: null,
      source: "studio",
    };
  }
}