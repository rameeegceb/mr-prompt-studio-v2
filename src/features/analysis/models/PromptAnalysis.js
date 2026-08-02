export default class PromptAnalysis {
    constructor({
        intent = null,
        domain = null,
        audience = null,
        complexity = null,
        outputType = null,
        constraints = [],
        confidence = 0,
        keywords = [],
    } = {}) {
        this.intent = intent;
        this.domain = domain;
        this.audience = audience;
        this.complexity = complexity;
        this.outputType = outputType;
        this.constraints = constraints;
        this.confidence = confidence;
        this.keywords = keywords;
    }
}