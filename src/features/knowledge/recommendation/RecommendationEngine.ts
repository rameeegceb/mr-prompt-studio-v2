import KnowledgeAnalyzer from "../analysis/KnowledgeAnalyzer";
import { RecommendationContext } from "./RecommendationContext";
import { RecommendationResult } from "./RecommendationResult";

class RecommendationEngine {

    recommend(prompt: string): RecommendationContext {

        const analysis = KnowledgeAnalyzer.analyze(prompt);

        const recommendation = analysis.recommendedFramework;

        return {

            framework: recommendation,

            techniques: analysis.relatedTechniques,

            examples: analysis.relatedExamples,

            systemInstructions: this.buildInstructions(analysis)

        };

    }

    private buildInstructions(analysis: any): string {

        let instructions = "";

        if (analysis.recommendedFramework) {

            instructions +=
                `Recommended Framework: ${analysis.recommendedFramework.title}\n\n`;

            instructions +=
                analysis.recommendedFramework.content;

        }

        return instructions;

    }

}

export default new RecommendationEngine();