import domainRules from "../data/domainRules";
import { contains } from "./utils";

export default class DomainDetector {

    static detect(prompt) {

        for (const rule of domainRules) {

            if (contains(prompt, rule.keywords)) {

                return {

                    domain: rule.domain,

                    confidence: 95,

                    keywords: rule.keywords

                };

            }

        }

        return {

            domain: "General",

            confidence: 60,

            keywords: []

        };

    }

}