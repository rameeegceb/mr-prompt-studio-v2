export default class Prompt {
    constructor(data = {}) {
        this.id = data.id ?? crypto.randomUUID();

        this.content = data.content ?? "";

        this.framework = data.framework ?? null;

        this.analysis = data.analysis ?? null;

        this.evaluation = data.evaluation ?? null;

        this.improvedPrompt = data.improvedPrompt ?? "";

        this.createdAt = data.createdAt ?? new Date();

        this.updatedAt = new Date();
    }

    update(content) {
        this.content = content;
        this.updatedAt = new Date();
    }
}