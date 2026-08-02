import IntentDetector from "./IntentDetector";
import RoleDetector from "./RoleDetector";
import TaskDetector from "./TaskDetector";
import DomainDetector from "./DomainDetector";
import OutputDetector from "./OutputDetector";
import ConstraintDetector from "./ConstraintDetector";

import { PromptAnalysis } from "../models/PromptAnalysis";

class PromptAnalyzer {

    analyze(prompt: string): PromptAnalysis {

        return {

            intent: IntentDetector.detect(prompt),

            task: TaskDetector.detect(prompt),

            role: RoleDetector.detect(prompt),

            audience: "",

            domain: DomainDetector.detect(prompt),

            outputFormat: OutputDetector.detect(prompt),

            constraints: ConstraintDetector.detect(prompt),

            keywords: [],

            complexity: this.calculateComplexity(prompt)

        };

    }

    private calculateComplexity(prompt: string): number {

        if (prompt.length < 80)
            return 1;

        if (prompt.length < 200)
            return 2;

        return 3;

    }

}

export default new PromptAnalyzer();