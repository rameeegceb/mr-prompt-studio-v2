export default class PromptEnhancer {
  /**
   * New API
   * Used by the future PromptProfile pipeline.
   */
  static build(profile) {
    if (!profile) {
      return "";
    }

    const sections = [];

    const role = this.buildRole(profile);
    if (role) sections.push(role);

    const goal = this.buildGoal(profile);
    if (goal) sections.push(goal);

    const context = this.buildContext(profile);
    if (context) sections.push(context);

    const audience = this.buildAudience(profile);
    if (audience) sections.push(audience);

    const instructions = this.buildInstructions(profile);
    if (instructions) sections.push(instructions);

    const constraints = this.buildConstraints(profile);
    if (constraints) sections.push(constraints);

    const output = this.buildOutput(profile);
    if (output) sections.push(output);

    const success = this.buildSuccessCriteria(profile);
    if (success) sections.push(success);

    return sections.join("\n\n").trim();
  }

  /**
   * Compatibility API.
   * Allows PromptEngine to migrate later without breaking.
   */
  static improve(profile) {
    return this.build(profile);
  }

  static buildRole(profile) {
    if (!profile.role) {
      return "";
    }

    return [
      "## Role",
      `Act as ${profile.role}.`
    ].join("\n");
  }

  static buildGoal(profile) {
    return [
      "## Goal",
      profile.originalPrompt?.trim() || ""
    ].join("\n");
  }

  static buildContext(profile) {
    const items = [];

    if (profile.intent?.name) {
      items.push(
        `Primary Intent: ${profile.intent.name}`
      );
    }

    if (profile.domain?.domain) {
      items.push(
        `Domain: ${profile.domain.domain}`
      );
    }

    if (profile.framework?.name) {
      items.push(
        `Framework: ${profile.framework.name}`
      );
    }

    if (!items.length) {
      return "";
    }

    return [
      "## Context",
      ...items.map(x => `- ${x}`)
    ].join("\n");
  }

  static buildAudience(profile) {
    if (!profile.audience) {
      return "";
    }

    return [
      "## Audience",
      profile.audience
    ].join("\n");
  }

  static buildInstructions(profile) {
    const instructions = [
      "Analyze the request before responding.",
      "Use structured reasoning.",
      "Explain recommendations.",
      "Provide actionable guidance."
    ];

    switch (profile.domain?.domain) {

      case "Cloud":
        instructions.push(
          "Consider security, scalability, governance and cost."
        );
        break;

      case "Agile":
        instructions.push(
          "Follow Scrum and Agile best practices."
        );
        break;

      case "Architecture":
        instructions.push(
          "Evaluate trade-offs and architectural decisions."
        );
        break;

      default:
        break;
    }

    return [
      "## Instructions",
      ...instructions.map(x => `- ${x}`)
    ].join("\n");
  }

  static buildConstraints() {

    return [
      "## Constraints",
      "- Do not invent facts.",
      "- State assumptions clearly.",
      "- Use professional language.",
      "- Be concise where appropriate."
    ].join("\n");
  }

  static buildOutput(profile) {

    const sections = [
      "Executive Summary",
      "Analysis",
      "Recommendations"
    ];

    switch (profile.domain?.domain) {

      case "Cloud":
        sections.push("Migration Roadmap");
        break;

      case "Architecture":
        sections.push("Architecture Assessment");
        break;

      case "Testing":
        sections.push("Test Strategy");
        break;

      default:
        break;
    }

    return [
      "## Output Format",
      ...sections.map((x, i) => `${i + 1}. ${x}`)
    ].join("\n");
  }

  static buildSuccessCriteria() {

    return [
      "## Success Criteria",
      "The response should be accurate, complete, actionable and aligned with the intended audience."
    ].join("\n");
  }
}