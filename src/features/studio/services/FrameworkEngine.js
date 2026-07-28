import frameworkRules from "../data/frameworkRules";

export default class FrameworkEngine {
  static recommend(intent) {
    const result =
      frameworkRules.find(
        (rule) => rule.intent === intent
      ) || frameworkRules.at(-1);

    return {
      name: result.framework,
      reason: result.reason,
    };
  }
}