import PromptVersion from "../models/PromptVersion";
import PromptEngine from "./PromptEngine";

const normalizeText = (value = "") =>
  value.trim();

const countWords = (value = "") => {
  const text = normalizeText(value);

  if (!text) return 0;

  return text.split(/\s+/).length;
};

const extractLines = (value = "") => {
  const lines = normalizeText(value)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return [...new Set(lines)];
};

export default class VersionHistoryService {
  static createVersion({
    versions = [],
    prompt = "",
    generatedPrompt = "",
    action = "Save",
    comment = "",
  }) {
    const sourcePrompt =
      normalizeText(prompt);
    const nextGeneratedPrompt =
      normalizeText(generatedPrompt);
    const content =
      nextGeneratedPrompt || sourcePrompt;

    if (!content || !action?.trim()) {
      return null;
    }

    const highestVersionNumber =
      versions.reduce(
        (highest, version) =>
          Math.max(
            highest,
            Number(version.versionNumber) || 0
          ),
        0
      );

    const latestVersion =
      versions.find(Boolean) ?? null;

    if (
      latestVersion &&
      normalizeText(latestVersion.content) ===
        content &&
      normalizeText(
        latestVersion.sourcePrompt
      ) === (sourcePrompt || content) &&
      normalizeText(
        latestVersion.generatedPrompt
      ) === nextGeneratedPrompt &&
      latestVersion.action === action.trim()
    ) {
      return null;
    }

    return new PromptVersion({
      versionNumber:
        highestVersionNumber + 1,
      content,
      sourcePrompt:
        sourcePrompt || content,
      generatedPrompt:
        nextGeneratedPrompt,
      action,
      comment,
      timestamp: new Date().toISOString(),
    });
  }

  static decorateVersions(
    versions = [],
    currentPrompt = ""
  ) {
    const normalizedCurrentPrompt =
      normalizeText(currentPrompt);

    return versions.map((version) => {
      const content = normalizeText(
        version.content
      );

      return {
        ...version,
        content,
        displayNumber:
          this.formatVersionNumber(
            version.versionNumber
          ),
        isCurrent:
          Boolean(normalizedCurrentPrompt) &&
          content === normalizedCurrentPrompt,
        wordCount: countWords(content),
        characterCount: content.length,
      };
    });
  }

  static getCurrentVersion(
    versions = [],
    currentPrompt = ""
  ) {
    return (
      this.decorateVersions(
        versions,
        currentPrompt
      ).find((version) => version.isCurrent) ??
      null
    );
  }

  static compareVersions(
    baseVersion,
    targetVersion
  ) {
    if (!baseVersion || !targetVersion) {
      return null;
    }

    const baseContent = normalizeText(
      baseVersion.content
    );
    const targetContent = normalizeText(
      targetVersion.content
    );

    const baseLines = extractLines(baseContent);
    const targetLines = extractLines(
      targetContent
    );
    const baseLineSet = new Set(baseLines);
    const targetLineSet = new Set(targetLines);

    return {
      baseVersion: {
        ...baseVersion,
        displayNumber:
          this.formatVersionNumber(
            baseVersion.versionNumber
          ),
      },
      targetVersion: {
        ...targetVersion,
        displayNumber:
          this.formatVersionNumber(
            targetVersion.versionNumber
          ),
      },
      summary: {
        baseWords: countWords(baseContent),
        targetWords: countWords(targetContent),
        baseCharacters: baseContent.length,
        targetCharacters:
          targetContent.length,
        wordDelta:
          countWords(targetContent) -
          countWords(baseContent),
        characterDelta:
          targetContent.length -
          baseContent.length,
      },
      sections: PromptEngine.compare(
        baseContent,
        targetContent
      ),
      lines: {
        added: targetLines.filter(
          (line) => !baseLineSet.has(line)
        ),
        removed: baseLines.filter(
          (line) => !targetLineSet.has(line)
        ),
        retained: baseLines.filter((line) =>
          targetLineSet.has(line)
        ),
      },
    };
  }

  static formatVersionNumber(versionNumber) {
    return `v${String(versionNumber).padStart(
      3,
      "0"
    )}`;
  }
}