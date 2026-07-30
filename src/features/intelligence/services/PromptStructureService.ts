interface StructureInput {

    role?: string;

    goal?: string;

    context?: string;

    audience?: string;

    constraints?: string;

    outputFormat?: string;

    examples?: string;

    successCriteria?: string;

}

class PromptStructureService {

    build(input: StructureInput) {

        const detectedSections: string[] = [];

        const missingSections: string[] = [];

        this.check("Role", input.role, detectedSections, missingSections);

        this.check("Goal", input.goal, detectedSections, missingSections);

        this.check("Context", input.context, detectedSections, missingSections);

        this.check("Audience", input.audience, detectedSections, missingSections);

        this.check("Constraints", input.constraints, detectedSections, missingSections);

        this.check("Output Format", input.outputFormat, detectedSections, missingSections);

        this.check("Examples", input.examples, detectedSections, missingSections);

        this.check("Success Criteria", input.successCriteria, detectedSections, missingSections);

        return {

            detectedSections,

            missingSections

        };

    }

    private check(

        name: string,

        value: string | undefined,

        detected: string[],

        missing: string[]

    ) {

        if (value && value.trim()) {

            detected.push(name);

        }
        else {

            missing.push(name);

        }

    }

}

export default new PromptStructureService();