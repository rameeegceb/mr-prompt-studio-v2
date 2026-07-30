import { PromptAnalysis } from "../models/PromptAnalysis";
import { RecommendationContext } from "../recommendation/RecommendationContext";

export interface PipelineResult {

    analysis: PromptAnalysis;

    recommendation: RecommendationContext;

}