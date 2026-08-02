import { Framework } from "../models/Framework";
import { Technique } from "../models/Technique";
import { Example } from "../models/Example";

export interface RecommendationContext {

    framework?: Framework;

    techniques: Technique[];

    examples: Example[];

    systemInstructions: string;

}