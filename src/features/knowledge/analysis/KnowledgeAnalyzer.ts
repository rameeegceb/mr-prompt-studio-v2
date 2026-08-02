import KnowledgeSearchService from "../search/KnowledgeSearchService";
import { PromptAnalysis } from "../models/PromptAnalysis";

class KnowledgeAnalyzer {

    analyze(prompt: string): PromptAnalysis {

        const results = KnowledgeSearchService.search(prompt);

        const best = results.length
            ? results[0]
            : undefined;

        return {

            originalPrompt: prompt,

            intent: this.detectIntent(prompt),

            complexity: this.calculateComplexity(prompt),

            keywords: this.extractKeywords(prompt),

            frameworkMatches: results,

            recommendedFramework: best?.item,

            relatedTechniques:
                best?.item?.techniques ?? [],

            relatedExamples:
                best?.item?.examples ?? [],

            confidence: best?.confidence ?? 0

        };

    }

    private detectIntent(prompt: string): string {

        const text = prompt.toLowerCase();

        if (text.includes("improve")) return "Improve";

        if (text.includes("evaluate")) return "Evaluate";

        if (text.includes("compare")) return "Compare";

        if (text.includes("convert")) return "Convert";

        if (text.includes("create")) return "Create";

        return "General";

    }

    private extractKeywords(prompt: string): string[] {

        return [...new Set(

            prompt
                .toLowerCase()
                .replace(/[^\w\s]/g, " ")
                .split(/\s+/)
                .filter(w => w.length > 3)

        )];

    }

    private calculateComplexity(prompt: string): number {

        if (prompt.length < 80)
            return 1;

        if (prompt.length < 200)
            return 2;

        return 3;

    }

}

export default new KnowledgeAnalyzer();