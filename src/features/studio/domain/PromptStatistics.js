export default class PromptStatistics {
    constructor(prompt = "") {

        const words =
            prompt.trim().length === 0
                ? 0
                : prompt.trim().split(/\s+/).length;

        this.words = words;

        this.characters = prompt.length;

        this.tokens = Math.ceil(words * 1.3);

        this.sentences =
            prompt
                .split(/[.!?]/)
                .filter(Boolean).length;

        this.readingTime =
            Math.max(1, Math.ceil(words / 200));
    }
}