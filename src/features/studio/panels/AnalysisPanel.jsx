import EnterpriseScoreCard from "../components/EnterpriseScoreCard";
import PromptHealthIndicator from "../components/PromptHealthIndicator";
import ConfidenceMeter from "../components/ConfidenceMeter";
import FrameworkReason from "../components/FrameworkReason";
import PromptMetadata from "../components/PromptMetadata";
import StrengthsPanel from "../components/StrengthsPanel";
import WeaknessesPanel from "../components/WeaknessesPanel";
import Recommendations from "../components/Recommendations";

import usePromptStudioContext from "../state/usePromptStudioContext";

const mapTechniqueLabels = (
  techniques = []
) =>
  techniques.map((technique) =>
    technique.description
      ? `${technique.title}: ${technique.description}`
      : technique.title
  );

const mapArticleLabels = (
  articles = []
) =>
  articles.map((article) => {
    if (article.title?.trim()) {
      return article.title;
    }

    return article.content;
  });

export default function AnalysisPanel() {
  const studio = usePromptStudioContext();

  const comparison =
    studio.evaluation?.comparison;

  const relatedTechniques =
    mapTechniqueLabels(
      studio.evaluation?.relatedTechniques
    );

  const knowledgeRecommendations =
    mapArticleLabels(
      studio.evaluation?.recommendedArticles
    );

  if (!studio.evaluation) {
    return (
      <div className="rounded-xl border border-dashed bg-slate-50 p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          Enterprise Analysis
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Start typing or generate a prompt to view the analysis dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comparison ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
            Comparison Analysis Summary
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Runtime comparison between the original and improved prompt.
          </p>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Score Improvement
              </div>

              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {comparison.scoreIncrease >= 0
                  ? `+${comparison.scoreIncrease}`
                  : comparison.scoreIncrease}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {comparison.originalScore} to {comparison.improvedScore}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Framework Change
              </div>

              <div className="mt-2 text-sm text-slate-700">
                {comparison.frameworkChanged
                  ? "Changed"
                  : "Unchanged"}
              </div>

              <div className="mt-2 text-xs text-slate-500">
                {(comparison.originalFramework?.name || "-") + " -> " + (comparison.improvedFramework?.name || "-")}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Confidence Change
              </div>

              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {comparison.confidenceChange >= 0
                  ? `+${comparison.confidenceChange}`
                  : comparison.confidenceChange}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {comparison.originalConfidence}% to {comparison.improvedConfidence}%
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Knowledge Recommendation Changes
              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-xs">
                {(comparison.knowledgeRecommendationChanges?.added || []).map((item) => (
                  <span
                    key={`knowledge-added-${item}`}
                    className="rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700"
                  >
                    + {item}
                  </span>
                ))}

                {(comparison.knowledgeRecommendationChanges?.removed || []).map((item) => (
                  <span
                    key={`knowledge-removed-${item}`}
                    className="rounded-full bg-rose-50 px-2.5 py-1 font-medium text-rose-700"
                  >
                    - {item}
                  </span>
                ))}

                {(comparison.knowledgeRecommendationChanges?.added || []).length === 0 &&
                (comparison.knowledgeRecommendationChanges?.removed || []).length === 0 ? (
                  <span className="text-slate-500">
                    No changes
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <EnterpriseScoreCard
        score={studio.evaluation.score}
      />

      <PromptHealthIndicator
        score={studio.evaluation.score}
      />

      <ConfidenceMeter
        confidence={studio.evaluation.confidence}
        description="Based on the strongest knowledge match returned by the Knowledge Engine."
      />

      <FrameworkReason
        framework={studio.evaluation.framework}
        subtitle="Selected by the Knowledge Engine when a repository framework match is available."
      />

      <PromptMetadata
        analysis={studio.evaluation.analysis}
      />

      <StrengthsPanel
        strengths={studio.evaluation.strengths}
      />

      <WeaknessesPanel
        weaknesses={studio.evaluation.weaknesses}
      />

      <Recommendations
        items={
          studio.evaluation.recommendations
        }
        title="Prompt Recommendations"
      />

      <Recommendations
        items={relatedTechniques}
        title="Related Techniques"
        emptyMessage="No related techniques were returned by the Knowledge Engine for this prompt."
      />

      <Recommendations
        items={knowledgeRecommendations}
        title="Knowledge Recommendations"
        emptyMessage="No repository-backed knowledge recommendations were returned for this prompt."
      />
    </div>
  );
}