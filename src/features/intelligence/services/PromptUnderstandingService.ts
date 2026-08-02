import { PromptAnalysis } from "../models/PromptAnalysis";

import TextUtils from "../utils/TextUtils";

import RoleAnalyzer from "../analyzers/RoleAnalyzer";
import GoalAnalyzer from "../analyzers/GoalAnalyzer";
import ContextAnalyzer from "../analyzers/ContextAnalyzer";
import AudienceAnalyzer from "../analyzers/AudienceAnalyzer";
import ConstraintAnalyzer from "../analyzers/ConstraintAnalyzer";
import OutputAnalyzer from "../analyzers/OutputAnalyzer";
import ExampleAnalyzer from "../analyzers/ExampleAnalyzer";
import SuccessCriteriaAnalyzer from "../analyzers/SuccessCriteriaAnalyzer";

import PromptMetadataService from "./PromptMetadataService";
import PromptStructureService from "./PromptStructureService";

class PromptUnderstandingService {

    private readonly roleAnalyzer = new RoleAnalyzer();

    private readonly goalAnalyzer = new GoalAnalyzer();

    private readonly contextAnalyzer = new ContextAnalyzer();

    private readonly audienceAnalyzer = new AudienceAnalyzer();

    private readonly constraintAnalyzer = new ConstraintAnalyzer();

    private readonly outputAnalyzer = new OutputAnalyzer();

    private readonly exampleAnalyzer = new ExampleAnalyzer();

    private readonly successCriteriaAnalyzer =
        new SuccessCriteriaAnalyzer();

    private readonly metadataService =
        PromptMetadataService;

    private readonly structureService =
        PromptStructureService;

    analyze(prompt: string): PromptAnalysis {

        const normalized =
            TextUtils.normalize(prompt);

        const metadata =
            this.metadataService.build(normalized);

        const role =
            this.roleAnalyzer.analyze(normalized);

        const goal =
            this.goalAnalyzer.analyze(normalized);

        const context =
            this.contextAnalyzer.analyze(normalized);

        const audience =
            this.audienceAnalyzer.analyze(normalized);

        const constraints =
            this.constraintAnalyzer.analyze(normalized);

        const outputFormat =
            this.outputAnalyzer.analyze(normalized);

        const examples =
            this.exampleAnalyzer.analyze(normalized);

        const successCriteria =
            this.successCriteriaAnalyzer.analyze(normalized);

        const structure =
            this.structureService.build({

                role,

                goal,

                context,

                audience,

                constraints,

                outputFormat,

                examples,

                successCriteria

            });

        return {

            originalPrompt: normalized,

            role,

            goal,

            context,

            audience,

            constraints,

            outputFormat,

            examples,

            successCriteria,

            wordCount:
                metadata.wordCount,

            characterCount:
                metadata.characterCount,

            sentenceCount:
                metadata.sentenceCount,

            estimatedTokens:
                metadata.estimatedTokens,

            readingTime:
                metadata.readingTime,

            detectedSections:
                structure.detectedSections,

            missingSections:
                structure.missingSections,

            keywords: [],

            complexity: "Low",

            intent: "Unknown"

        };

    }

}

export default new PromptUnderstandingService();