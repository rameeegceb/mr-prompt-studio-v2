import { PromptAnalysis } from "../models/PromptAnalysis";
import { RecommendationContext } from "../recommendation/RecommendationContext";

class ContextBuilder {

    build(
        prompt: string,
        analysis: PromptAnalysis,
        recommendation: RecommendationContext
    ) {

        return {

            userPrompt: prompt,

            analysis,

            framework: recommendation.framework,

            techniques: recommendation.techniques,

            examples: recommendation.examples,

            systemPrompt: this.buildSystemPrompt(
                recommendation
            )

        };

    }

    private buildSystemPrompt(
        recommendation: RecommendationContext
    ) {

        let prompt = "";

        if (recommendation.framework) {

            prompt +=
`You are an Enterprise Prompt Engineering Assistant.

Apply the following framework:

${recommendation.framework.title}

${recommendation.framework.content}

`;

        }

        return prompt;

    }

}

export default new ContextBuilder();