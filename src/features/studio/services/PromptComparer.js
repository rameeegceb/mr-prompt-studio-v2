export default class PromptComparer {
  static compare(original, improved) {
    const originalSections =
      this.extractSections(original);

    const improvedSections =
      this.extractSections(improved);

    const added = improvedSections.filter(
      (section) =>
        !originalSections.includes(section)
    );

    const removed = originalSections.filter(
      (section) =>
        !improvedSections.includes(section)
    );

    const retained = originalSections.filter(
      (section) =>
        improvedSections.includes(section)
    );

    return {
      added,

      removed,

      retained,
    };
  }

  static extractSections(text) {
    if (!text) return [];

    const sections = [];

    const labels = [
      "Role",
      "Goal",
      "Objective",
      "Context",
      "Audience",
      "Instructions",
      "Constraints",
      "Output",
      "Output Format",
      "Examples",
      "Success Criteria",
    ];

    labels.forEach((label) => {
      if (
        text
          .toLowerCase()
          .includes(label.toLowerCase())
      ) {
        sections.push(label);
      }
    });

    return sections;
  }
}