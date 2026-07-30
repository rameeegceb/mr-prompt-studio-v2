import AIProvider from "./AIProvider";

export default class OllamaProvider extends AIProvider {
  constructor(config) {
    super();

    this.config = config;
  }

  async testConnection() {
    try {
      const response = await fetch(
        `${this.config.endpoint}/api/tags`
      );

      return response.ok;
    } catch (error) {
      console.error(
        "Ollama connection failed",
        error
      );

      return false;
    }
  }

  async getModels() {
    try {
      const response = await fetch(
        `${this.config.endpoint}/api/tags`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to retrieve models."
        );
      }

      const data = await response.json();

      return data.models || [];
    } catch (error) {
      console.error(
        "Failed to load Ollama models",
        error
      );

      return [];
    }
  }

  /**
   * Supports BOTH:
   *
   * execute(prompt)
   *
   * execute(systemPrompt, userPrompt)
   */
  async execute(systemPrompt, userPrompt = null) {
    let messages = [];

    // Backward compatibility
    if (
      userPrompt === null ||
      userPrompt === undefined
    ) {
      messages = [
        {
          role: "user",
          content: systemPrompt,
        },
      ];
    } else {
      messages = [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ];
    }

    try {
      const response = await fetch(
        `${this.config.endpoint}/api/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            model: this.config.model,

            stream: false,

            messages,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Ollama Error (${response.status})`
        );
      }

      const data = await response.json();

      /**
       * Return ONLY the generated text.
       */

      return (
        data?.message?.content?.trim() || ""
      );
    } catch (error) {
      console.error(
        "Ollama execution failed",
        error
      );

      throw error;
    }
  }
}