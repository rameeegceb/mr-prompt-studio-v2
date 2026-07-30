export default class PromptResponse {

    constructor(){

        this.originalPrompt = "";

        this.improvedPrompt = "";

        this.framework = null;

        this.analysis = null;

        this.originalScore = 0;

        this.improvedScore = 0;

        this.scoreIncrease = 0;

        this.recommendations = [];

        this.comparison = null;

    }

}