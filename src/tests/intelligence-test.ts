import PromptUnderstandingService from "../features/intelligence/services/PromptUnderstandingService";

const prompt = `
# Role
Technical Writer

# Goal
Scrum Events

# Context
Need to convey the importance and value of Scrum events.

# Audience
Executives

# Constraints
Person is not cooperative.

# Output Format
Markdown
`;

const analysis = PromptUnderstandingService.analyze(prompt);

console.log("===== PROMPT ANALYSIS =====");

console.table({
    Role: analysis.role,
    Goal: analysis.goal,
    Context: analysis.context,
    Audience: analysis.audience,
    Constraints: analysis.constraints,
    Output: analysis.outputFormat,
    Intent: analysis.intent,
    Complexity: analysis.complexity
});

console.log("Detected Sections");

console.table(analysis.detectedSections);

console.log("Missing Sections");

console.table(analysis.missingSections);

console.log("Full Analysis");

console.log(analysis);