const createVersionId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `version-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export default class PromptVersion {
  constructor(data = {}) {
    const sourcePrompt =
      data.sourcePrompt ??
      data.originalPrompt ??
      data.prompt ??
      "";

    const generatedPrompt =
      data.generatedPrompt ?? "";

    const content =
      data.content ??
      generatedPrompt ??
      sourcePrompt;

    const versionNumber =
      Number(data.versionNumber) || 0;

    this.id = data.id ?? createVersionId();
    this.versionNumber =
      versionNumber > 0 ? versionNumber : 0;
    this.content = content.trim();
    this.sourcePrompt = sourcePrompt.trim();
    this.originalPrompt = this.sourcePrompt;
    this.generatedPrompt = generatedPrompt.trim();
    this.action =
      data.action?.trim() || "Save";
    this.comment = data.comment?.trim() || "";
    this.timestamp =
      data.timestamp ??
      data.createdAt ??
      new Date().toISOString();
  }
}