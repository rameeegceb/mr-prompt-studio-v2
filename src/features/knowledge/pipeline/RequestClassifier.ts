class RequestClassifier {

    classify(prompt: string) {

        const text = prompt.toLowerCase();

        if (text.includes("improve"))
            return "improve";

        if (text.includes("evaluate"))
            return "evaluate";

        if (text.includes("compare"))
            return "compare";

        if (text.includes("convert"))
            return "convert";

        if (text.includes("learn"))
            return "learn";

        return "create";

    }

}

export default new RequestClassifier();