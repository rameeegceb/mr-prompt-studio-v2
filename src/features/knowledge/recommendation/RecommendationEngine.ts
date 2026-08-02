import KnowledgeAnalyzer from "../analysis/KnowledgeAnalyzer";
import { RecommendationContext } from "./RecommendationContext";
import { RecommendationResult } from "./RecommendationResult";

class RecommendationEngine {

    recommend(
        prompt: string,
        analysis = null
    ): RecommendationContext {

        const resolvedAnalysis =
            analysis ??
            KnowledgeAnalyzer.analyze(prompt);

        const recommendation =
            resolvedAnalysis.recommendedFramework;

        return {

            framework: recommendation,

            techniques:
                resolvedAnalysis.relatedTechniques,

            examples:
                resolvedAnalysis.relatedExamples,

            systemInstructions:
                this.buildInstructions(
                    resolvedAnalysis
                )

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