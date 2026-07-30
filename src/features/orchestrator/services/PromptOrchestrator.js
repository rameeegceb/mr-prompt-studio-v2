import PromptRequest from "../models/PromptRequest";
import PromptResponse from "../models/PromptResponse";

import PromptEngine from "../../studio/services/PromptEngine";

export default class PromptOrchestrator {

    static async execute(request){

        if(!(request instanceof PromptRequest)){

            request =
                new PromptRequest(request);

        }

        switch(request.operation){

            case "improve":

                return await this.improve(request);

            case "evaluate":

                return this.evaluate(request);

            case "convert":

                return this.convert(request);

            default:

                throw new Error(
                    `Unsupported operation: ${request.operation}`
                );

        }

    }

    static async improve(request){

        const result =
            await PromptEngine.improve(
                request.prompt
            );

        const response =
            new PromptResponse();

        response.originalPrompt =
            result.originalPrompt;

        response.improvedPrompt =
            result.improvedPrompt;

        response.framework =
            result.framework;

        response.analysis =
            result.analysis;

        response.originalScore =
            result.comparison.originalScore;

        response.improvedScore =
            result.comparison.improvedScore;

        response.scoreIncrease =
            result.comparison.scoreIncrease;

        response.recommendations =
            result.recommendations;

        response.comparison =
            result.comparison;

        return response;

    }

    static evaluate(request){

        return PromptEngine.evaluate(
            request.prompt
        );

    }

    static convert(request){

        return PromptEngine.convert(

            request.prompt,

            request.format

        );

    }

}