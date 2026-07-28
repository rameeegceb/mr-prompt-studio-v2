export default class PromptEvaluation {

    constructor(data = {}) {

        this.score = data.score;

        this.analysis = data.analysis;

        this.framework = data.framework;

        this.recommendations =
            data.recommendations ?? [];

        this.improvements =
            data.improvements ?? [];

        this.comparison =
            data.comparison ?? null;

    }

}