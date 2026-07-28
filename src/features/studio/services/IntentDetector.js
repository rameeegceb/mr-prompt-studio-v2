import intentRules from "../data/intentRules";
import { contains } from "./utils";

export default class IntentDetector {
  static detect(prompt) {
    for (const rule of intentRules) {
      if (contains(prompt, rule.keywords)) {
        return {
          intent: rule.intent,
          confidence: 90,
        };
      }
    }

    return {
      intent: "General",
      confidence: 60,
    };
  }
}