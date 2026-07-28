export default class PromptPatternDetector {
  static detect(prompt = "") {
    const value = prompt.toLowerCase();

    return {
      hasRole:
        /you are|act as|role/i.test(value),

      hasGoal:
        /goal|objective|task|create|build|generate|write|develop|explain|learn/i.test(
          value
        ),

      hasContext:
        /context|background|scenario|company|organization|project/i.test(
          value
        ),

      hasAudience:
        /audience|user|customer|stakeholder|manager|developer|executive/i.test(
          value
        ),

      hasInstructions:
        /step|instructions|follow|perform|process|workflow/i.test(
          value
        ),

      hasConstraints:
        /must|must not|only|avoid|limit|constraint|do not/i.test(
          value
        ),

      hasOutput:
        /markdown|json|xml|table|list|csv|format/i.test(
          value
        ),

      hasExamples:
        /example|sample|illustration/i.test(
          value
        ),

      hasSuccessCriteria:
        /success|acceptance|expected result|expected outcome/i.test(
          value
        ),

      hasPersona:
        /product owner|architect|developer|tester|scrum master|business analyst/i.test(
          value
        ),

      hasReasoning:
        /step by step|reason|justify|think/i.test(
          value
        ),
    };
  }
}