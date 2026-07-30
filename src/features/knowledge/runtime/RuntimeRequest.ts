export interface RuntimeRequest {

    feature:

        | "improve"
        | "evaluate"
        | "compare"
        | "convert";

    prompt: string;

}