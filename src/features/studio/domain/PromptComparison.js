export default class PromptComparison {

    constructor(data = {}) {

        this.added =
            data.added ?? [];

        this.removed =
            data.removed ?? [];

        this.retained =
            data.retained ?? [];

    }

}