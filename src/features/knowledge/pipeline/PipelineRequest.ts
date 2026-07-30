export interface PipelineRequest {

    prompt: string;

    feature:
        | "learn"
        | "create"
        | "improve"
        | "evaluate"
        | "compare"
        | "convert";

}