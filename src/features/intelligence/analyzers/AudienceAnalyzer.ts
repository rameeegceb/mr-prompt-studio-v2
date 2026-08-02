import BaseAnalyzer from "./BaseAnalyzer";

export default class AudienceAnalyzer extends BaseAnalyzer {

    analyze(prompt: string): string | undefined {

        const match = prompt.match(

            /#?\s*Audience\s*:?\s*([\s\S]*?)(?=\n#|\n[A-Z][A-Za-z ]*:|$)/i

        );

        return match?.[1]?.trim();

    }

}