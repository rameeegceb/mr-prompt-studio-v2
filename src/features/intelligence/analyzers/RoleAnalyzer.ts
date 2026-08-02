import BaseAnalyzer from "./BaseAnalyzer";

export default class RoleAnalyzer extends BaseAnalyzer {

    analyze(prompt: string): string | undefined {

        const match = prompt.match(

            /#?\s*Role\s*:?\s*([\s\S]*?)(?=\n#|\n[A-Z][a-z]+:|$)/i

        );

        return match?.[1].trim();

    }

}