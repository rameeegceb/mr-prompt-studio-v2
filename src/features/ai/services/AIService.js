import ProviderFactory from "../providers/ProviderFactory";

export default class AIService {
  constructor(config) {
    this.provider = ProviderFactory.create(config);
  }

  /**
   * Execute an AI request.
   *
   * Supports:
   * execute(prompt)
   * execute(systemPrompt, userPrompt)
   */
  async execute(systemPrompt, userPrompt = null) {
    if (userPrompt === null || userPrompt === undefined) {
      return this.provider.execute(systemPrompt);
    }

    return this.provider.execute(
      systemPrompt,
      userPrompt
    );
  }

  async getModels() {
    return this.provider.getModels();
  }

  async testConnection() {
    return this.provider.testConnection();
  }
}