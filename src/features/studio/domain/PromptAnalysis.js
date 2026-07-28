export default class PromptAnalysis {

    constructor(data = {}) {

        this.intent = data.intent;

        this.complexity = data.complexity;

        this.wordCount = data.wordCount;

        this.sentenceCount = data.sentenceCount;

        this.strengths = data.strengths ?? [];

        this.weaknesses = data.weaknesses ?? [];
    }

}