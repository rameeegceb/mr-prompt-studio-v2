import { Framework } from "../models/Framework";

export interface RecommendationResult {

    framework: Framework;

    confidence: number;

    score: number;

    reason: string;

}