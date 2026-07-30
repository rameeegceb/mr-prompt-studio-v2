import BaseAnalyzer from "./BaseAnalyzer";

export default class ExampleAnalyzer extends BaseAnalyzer {

    analyze(prompt: string): string | undefined {

        const match = prompt.match(

            /#?\s*Examples?\s*:?\s*([\s\S]*?)(?=\n#|\n[A-Z][A-Za-z ]*:|$)/i

        );

        return match?.[1]?.trim();

    }

}