import KnowledgeRepository from "../repository/KnowledgeRepository";
import KnowledgeAnalyzer from "../analysis/KnowledgeAnalyzer";
import RecommendationEngine from "../recommendation/RecommendationEngine";
import ContextBuilder from "../context/ContextBuilder";

class KnowledgeEngine {

    initialize() {

        KnowledgeRepository.initialize();

    }

    execute(prompt: string) {

        const analysis =
            KnowledgeAnalyzer.analyze(prompt);

        const recommendation =
            RecommendationEngine.recommend(prompt);

        return ContextBuilder.build(

            prompt,

            analysis,

            recommendation

        );

    }

}

export default new KnowledgeEngine();