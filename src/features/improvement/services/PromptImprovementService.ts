import RuntimeEngine from "@/features/knowledge/runtime/RuntimeEngine";
import { ImprovementResult } from "../models/ImprovementResult";

class PromptImprovementService {

    async improve(prompt: string): Promise<ImprovementResult> {

        return await RuntimeEngine.execute({

            feature: "improve",

            prompt

        });

    }

}

export default new PromptImprovementService();