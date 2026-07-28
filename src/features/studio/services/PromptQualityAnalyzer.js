export default class PromptQualityAnalyzer {
  static analyze(
    pattern,
    complexity
  ) {
    const strengths = [];

    const weaknesses = [];

    if (pattern.hasRole)
      strengths.push(
        "Defines an AI role."
      );
    else
      weaknesses.push(
        "No AI role defined."
      );

    if (pattern.hasGoal)
      strengths.push(
        "Clear objective."
      );
    else
      weaknesses.push(
        "Goal is missing."
      );

    if (pattern.hasContext)
      strengths.push(
        "Provides useful context."
      );
    else
      weaknesses.push(
        "Context is missing."
      );

    if (pattern.hasAudience)
      strengths.push(
        "Audience identified."
      );
    else
      weaknesses.push(
        "Audience not specified."
      );

    if (pattern.hasConstraints)
      strengths.push(
        "Constraints detected."
      );
    else
      weaknesses.push(
        "No constraints defined."
      );

    if (pattern.hasOutput)
      strengths.push(
        "Output format specified."
      );
    else
      weaknesses.push(
        "Output format missing."
      );

    if (
      complexity.complexity ===
      "Enterprise"
    ) {
      strengths.push(
        "Enterprise-level detail."
      );
    }

    return {
      strengths,
      weaknesses,
    };
  }
}