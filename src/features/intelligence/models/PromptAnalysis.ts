export interface PromptAnalysis {

    originalPrompt: string;

    role?: string;

    goal?: string;

    context?: string;

    audience?: string;

    constraints?: string;

    outputFormat?: string;

    examples?: string;

    successCriteria?: string;

    wordCount: number;

    characterCount: number;

    sentenceCount: number;

    estimatedTokens: number;

    readingTime: number;

    detectedSections: string[];

    missingSections: string[];

    keywords: string[];

    complexity: "Low" | "Medium" | "High";

    intent: string;

}