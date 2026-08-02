export default class PromptComparer {
  static compare(original, improved) {
    const originalSectionMap =
      this.extractSectionMap(original);

    const improvedSectionMap =
      this.extractSectionMap(improved);

    const originalSections = [
      ...originalSectionMap.keys(),
    ];

    const improvedSections = [
      ...improvedSectionMap.keys(),
    ];

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

    const changed = retained.filter(
      (section) =>
        this.normalizeText(
          originalSectionMap.get(section)
        ) !==
        this.normalizeText(
          improvedSectionMap.get(section)
        )
    );

    return {
      added,

      removed,

      retained,

      changed,
    };
  }

  static extractSectionMap(text) {
    const sectionMap = new Map();

    if (!text) return sectionMap;

    const labels = [
      "Role",
      "Goal",
      "Objective",
      "Context",
      "Audience",
      "Task",
      "Instructions",
      "Constraints",
      "Output",
      "Output Format",
      "Examples",
      "Success Criteria",
    ];

    const normalizeLabel = (value) =>
      value
        .replace(/^#{1,6}\s*/, "")
        .replace(/^<\/?/, "")
        .replace(/>$/, "")
        .replace(/:$/, "")
        .trim()
        .toLowerCase();

    const lines = String(text).split(/\r?\n/);

    let currentLabel = null;
    let buffer = [];

    const flush = () => {
      if (!currentLabel) return;

      sectionMap.set(
        currentLabel,
        buffer.join("\n").trim()
      );

      buffer = [];
    };

    lines.forEach((line) => {
      const normalizedLine =
        normalizeLabel(line);

      const matchedLabel = labels.find(
        (label) =>
          normalizedLine ===
          label.toLowerCase()
      );

      if (matchedLabel) {
        flush();
        currentLabel = matchedLabel;
        return;
      }

      if (currentLabel) {
        buffer.push(line.trim());
      }
    });

    flush();

    if (sectionMap.size > 0) {
      return sectionMap;
    }

    labels.forEach((label) => {
      if (
        text
          .toLowerCase()
          .includes(label.toLowerCase())
      ) {
        sectionMap.set(label, label);
      }
    });

    return sectionMap;
  }

  static extractSections(text) {
    return [
      ...this.extractSectionMap(text).keys(),
    ];
  }

  static normalizeText(value = "") {
    return String(value)
      .trim()
      .replace(/\s+/g, " ");
  }
}