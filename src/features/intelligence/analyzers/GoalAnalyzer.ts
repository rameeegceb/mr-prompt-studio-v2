import BaseAnalyzer from "./BaseAnalyzer";

export default class GoalAnalyzer extends BaseAnalyzer {

    analyze(prompt: string): string | undefined {

        const match = prompt.match(

            /#?\s*Goal\s*:?\s*([\s\S]*?)(?=\n#|\n[A-Z][a-z]+:|$)/i

        );

        return match?.[1].trim();

    }

}