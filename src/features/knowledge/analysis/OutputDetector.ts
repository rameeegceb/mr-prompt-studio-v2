class OutputDetector {

    detect(prompt: string) {

        const text = prompt.toLowerCase();

        if (text.includes("table"))
            return "Table";

        if (text.includes("json"))
            return "JSON";

        if (text.includes("markdown"))
            return "Markdown";

        if (text.includes("list"))
            return "List";

        return "";

    }

}

export default new OutputDetector();