export default class PromptRequest {
    constructor({
        operation = "improve",
        prompt = "",
        format = "nl"
    } = {}) {

        this.operation = operation;
        this.prompt = prompt;
        this.format = format;

    }
}