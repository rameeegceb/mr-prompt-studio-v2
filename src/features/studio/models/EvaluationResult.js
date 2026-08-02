export const createEvaluationResult = () => ({
  originalPrompt: "",
  improvedPrompt: "",

  // Legacy model (kept temporarily for backward compatibility)
  analysis: {
    intent: "General",
    complexity: "Low",
    wordCount: 0,
    sentenceCount: 0,
    confidence: 0,
  },

  // New model (will gradually replace analysis)
  profile: null,

  framework: {
    name: "",
    reason: "",
  },

  recommendedFramework: null,

  confidence: 0,

  reason: "",

  relatedTechniques: [],

  recommendedArticles: [],

  score: {
    overall: 0,
    maturity: "Beginner",
    confidence: 0,
    breakdown: [],
  },

  strengths: [],

  weaknesses: [],

  recommendations: [],

  improvements: [],

  comparison: {
    originalScore: 0,
    improvedScore: 0,
    scoreIncrease: 0,
    originalFramework: null,
    improvedFramework: null,
    frameworkChanged: false,
    originalConfidence: 0,
    improvedConfidence: 0,
    confidenceChange: 0,
    originalRecommendations: [],
    improvedRecommendations: [],
    recommendationChanges: {
      added: [],
      removed: [],
      retained: [],
    },
    originalKnowledgeRecommendations: [],
    improvedKnowledgeRecommendations: [],
    knowledgeRecommendationChanges: {
      added: [],
      removed: [],
      retained: [],
    },
    added: [],
    removed: [],
    retained: [],
    changed: [],
  },
});