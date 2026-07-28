export default class PromptTemplate {

    constructor(data = {}) {

        this.id =
            data.id;

        this.title =
            data.title;

        this.description =
            data.description;

        this.category =
            data.category;

        this.framework =
            data.framework;

        this.difficulty =
            data.difficulty;

        this.tags =
            data.tags ?? [];

        this.prompt =
            data.prompt;

    }

}