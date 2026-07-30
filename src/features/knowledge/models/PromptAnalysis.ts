import { Framework } from "./Framework";
import { FrameworkMatch } from "./FrameworkMatch";
import { Technique } from "./Technique";
import { Example } from "./Example";

export interface PromptAnalysis {

    originalPrompt: string;

    intent: string;

    complexity: number;

    keywords: string[];

    frameworkMatches: FrameworkMatch[];

    recommendedFramework?: Framework;

    relatedTechniques: Technique[];

    relatedExamples: Example[];

    confidence: number;

}