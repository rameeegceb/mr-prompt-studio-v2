import FrameworkEngine from "./FrameworkEngine";
import PromptAnalyzer from "./PromptAnalyzer";

export default class PromptImprover {
  static improve(prompt) {
    if (!prompt?.trim()) return "";

    const analysis = PromptAnalyzer.analyze(prompt);

    const framework = FrameworkEngine.recommend(
      analysis.intent
    );

    return `# Role
You are an experienced ${analysis.intent.toLowerCase()} specialist.

# Goal
${prompt}

# Context
Provide all relevant background before answering.

# Audience
Business professionals and enterprise users.

# Instructions

- Think step-by-step.
- Use best practices.
- Explain your reasoning.
- Organize the response using headings.
- Use tables whenever appropriate.
- Include practical examples.

# Constraints

- Do not invent facts.
- Be concise.
- Be accurate.
- State assumptions.
- Highlight risks if applicable.

# Output Format

Markdown

# Success Criteria

Deliver a complete, actionable, enterprise-quality response.

# Recommended Framework

${framework.name}

# Framework Reason

${framework.reason}`;
  }
}