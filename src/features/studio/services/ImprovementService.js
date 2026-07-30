import AIService from "../../ai/services/AIService";
import StorageService from "../../../core/services/StorageService";
import defaultConfig from "../../ai/config/defaultConfig";
import improvePromptTemplate from "../../ai/prompts/ImprovePrompt";

export default class ImprovementService {
  static async improve(prompt) {
    if (!prompt?.trim()) {
      return "";
    }

    // Load saved AI configuration
    const config =
      StorageService.get("ai-config") ||
      defaultConfig;

    const ai = new AIService(config);

    // Build system prompt
    const systemPrompt =
      improvePromptTemplate;

    // Execute AI request
    const response =
      await ai.execute(
        systemPrompt,
        prompt
      );

    return response?.trim() || prompt;
  }
}