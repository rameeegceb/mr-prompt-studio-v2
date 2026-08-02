import { Framework } from "@/features/knowledge/models/Framework";

export interface ImprovementResult {

    originalPrompt: string;

    improvedPrompt: string;

    framework: Framework;

    score: number;

    confidence: number;

    analysis: string;

    improvements: string[];

    recommendations: string[];

    techniques: string[];

    explanation: string;

}