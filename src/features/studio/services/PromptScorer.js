import PromptPatternDetector from "./PromptPatternDetector";

export default class PromptScorer {
  static score(analysis) {
    let score = 0;

    const breakdown = [];

    const checks = [
      [
        "Role",
        analysis.hasRole,
        15,
      ],

      [
        "Goal",
        analysis.hasGoal,
        20,
      ],

      [
        "Context",
        analysis.hasContext,
        15,
      ],

      [
        "Audience",
        analysis.hasAudience,
        10,
      ],

      [
        "Instructions",
        analysis.hasInstructions,
        10,
      ],

      [
        "Constraints",
        analysis.hasConstraints,
        10,
      ],

      [
        "Output",
        analysis.hasOutput,
        10,
      ],

      [
        "Examples",
        analysis.hasExamples,
        5,
      ],

      [
        "Success Criteria",
        analysis.hasSuccessCriteria,
        5,
      ],
    ];

    checks.forEach(
      ([title, passed, weight]) => {
        if (passed)
          score += weight;

        breakdown.push({
          id: title,
          title,
          passed,
          score: passed
            ? weight
            : 0,
          max: weight,
        });
      }
    );

    return {
      overall: score,

      maturity:
        this.getMaturity(score),

      confidence: Math.min(
        score +
          Math.round(
            analysis.wordCount /
              10
          ),
        100
      ),

      strengths:
        analysis.strengths,

      weaknesses:
        analysis.weaknesses,

      recommendations:
        this.buildRecommendations(
          analysis
        ),

      improvements:
        this.buildImprovements(
          analysis
        ),

      breakdown,
    };
  }

  static getMaturity(score) {
    if (score >= 90)
      return "Expert";

    if (score >= 80)
      return "Advanced";

    if (score >= 60)
      return "Intermediate";

    if (score >= 40)
      return "Developing";

    return "Beginner";
  }

  static buildRecommendations(
    analysis
  ) {
    const items = [];

    if (!analysis.hasRole)
      items.push(
        "Assign a clear AI role."
      );

    if (!analysis.hasContext)
      items.push(
        "Provide additional context."
      );

    if (!analysis.hasAudience)
      items.push(
        "Define the intended audience."
      );

    if (!analysis.hasConstraints)
      items.push(
        "Specify constraints."
      );

    if (!analysis.hasOutput)
      items.push(
        "Define the output format."
      );

    if (!analysis.hasExamples)
      items.push(
        "Include one or more examples."
      );

    return items;
  }

  static buildImprovements(
    analysis
  ) {
    const items = [];

    if (!analysis.hasRole)
      items.push({
        category:
          "Structure",
        item: "Role",
      });

    if (!analysis.hasContext)
      items.push({
        category:
          "Structure",
        item: "Context",
      });

    if (!analysis.hasAudience)
      items.push({
        category:
          "Structure",
        item: "Audience",
      });

    if (!analysis.hasConstraints)
      items.push({
        category:
          "Quality",
        item: "Constraints",
      });

    if (!analysis.hasOutput)
      items.push({
        category:
          "Output",
        item: "Output Format",
      });

    return items;
  }
}