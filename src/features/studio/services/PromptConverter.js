export default class PromptConverter {
  static convert(prompt, format) {
    switch (format.toLowerCase()) {
      case "markdown":
        return this.toMarkdown(prompt);

      case "json":
        return this.toJson(prompt);

      case "xml":
        return this.toXml(prompt);

      case "poml":
        return this.toPOML(prompt);

      default:
        return prompt;
    }
  }

  static toMarkdown(prompt) {
    return `# Prompt

${prompt}`;
  }

  static toJson(prompt) {
    return JSON.stringify(
      {
        role: "",
        objective: prompt,
        context: "",
        audience: "",
        instructions: [],
        constraints: [],
        outputFormat: "",
      },
      null,
      2
    );
  }

  static toXml(prompt) {
    return `<Prompt>
  <Objective>${prompt}</Objective>
</Prompt>`;
  }

  static toPOML(prompt) {
    return `<Prompt>
  <Role></Role>
  <Objective>${prompt}</Objective>
  <Context></Context>
  <Audience></Audience>
  <Instructions></Instructions>
  <Constraints></Constraints>
  <OutputFormat></OutputFormat>
</Prompt>`;
  }
}