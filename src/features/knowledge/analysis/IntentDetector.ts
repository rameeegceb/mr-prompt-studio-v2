class IntentDetector {

    detect(prompt: string): string {

        const text = prompt.toLowerCase();

        if (text.includes("create"))
            return "Create";

        if (text.includes("improve"))
            return "Improve";

        if (text.includes("evaluate"))
            return "Evaluate";

        if (text.includes("compare"))
            return "Compare";

        if (text.includes("convert"))
            return "Convert";

        if (text.includes("generate"))
            return "Generate";

        return "Unknown";

    }

}

export default new IntentDetector();