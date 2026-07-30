const domains = [

    "banking",

    "finance",

    "insurance",

    "healthcare",

    "retail",

    "cloud",

    "ai",

    "agile",

    "security"

];

class DomainDetector {

    detect(prompt: string) {

        const text = prompt.toLowerCase();

        return domains.find(d => text.includes(d)) ?? "";

    }

}

export default new DomainDetector();