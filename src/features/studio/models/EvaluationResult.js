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
    added: [],
    removed: [],
    retained: [],
  },
});