import EnterpriseScoreCard from "../components/EnterpriseScoreCard";
import PromptHealthIndicator from "../components/PromptHealthIndicator";
import ConfidenceMeter from "../components/ConfidenceMeter";
import FrameworkReason from "../components/FrameworkReason";
import PromptMetadata from "../components/PromptMetadata";
import StrengthsPanel from "../components/StrengthsPanel";
import WeaknessesPanel from "../components/WeaknessesPanel";
import Recommendations from "../components/Recommendations";

import usePromptStudioContext from "../state/usePromptStudioContext";

export default function AnalysisPanel() {
  const studio = usePromptStudioContext();

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
      <EnterpriseScoreCard
        score={studio.evaluation.score}
      />

      <PromptHealthIndicator
        score={studio.evaluation.score}
      />

      <ConfidenceMeter
        confidence={
          studio.evaluation.score?.confidence
        }
      />

      <FrameworkReason
        framework={studio.evaluation.framework}
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
      />
    </div>
  );
}