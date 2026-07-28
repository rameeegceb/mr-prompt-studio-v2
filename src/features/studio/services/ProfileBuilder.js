import PromptProfile from "../domain/PromptProfile";

import PromptAnalyzer from "./PromptAnalyzer";
import DomainDetector from "./DomainDetector";
import RoleRecommender from "./RoleRecommender";
import AudienceDetector from "./AudienceDetector";
import FrameworkEngine from "./FrameworkEngine";

export default class ProfileBuilder {
  static build(prompt) {
    const analysis = PromptAnalyzer.analyze(prompt);

    const profile = new PromptProfile();

    profile.originalPrompt = prompt;

    profile.intent = {
      name: analysis.intent,
      confidence: analysis.confidence,
    };

    profile.domain = DomainDetector.detect(prompt);

    profile.role = RoleRecommender.recommend(
      profile.domain.domain
    );

    profile.audience = AudienceDetector.detect(
      profile.domain.domain
    );

    // FrameworkEngine already returns { name, reason }
    profile.framework =
      FrameworkEngine.recommend(
        analysis.intent
      );

    // Preserve the complete analysis during migration.
    // Individual properties will be migrated in later sprints.
    profile.analysis = analysis;

    return profile;
  }
}