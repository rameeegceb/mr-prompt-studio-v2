import PromptEditor from "../components/PromptEditor";
import PromptOutput from "../components/PromptOutput";
import PromptActions from "../components/PromptActions";
import EditorStatistics from "../components/EditorStatistics";

import usePromptStudioContext from "../state/usePromptStudioContext";

export default function EditorPanel() {
  const studio = usePromptStudioContext();

  return (
    <div className="space-y-5 2xl:space-y-6">
      <EditorStatistics
        metrics={studio.metrics}
      />

      <PromptEditor
        value={studio.prompt}
        onChange={studio.setPrompt}
      />

      <PromptActions
        onOpenBuilder={studio.openBuilder}
        onImprove={studio.handleImprove}
        onEvaluate={studio.handleEvaluate}
        onConvert={studio.handleConvert}
        onClear={studio.handleClear}
        onClearError={studio.clearError}
        status={studio.status}
        error={studio.error}
        isLoading={studio.isLoading}
        isEvaluating={studio.isEvaluating}
        isImproving={studio.isImproving}
        isConverting={studio.isConverting}
        isSaving={studio.isSaving}
      />

      <PromptOutput
        value={studio.improvedPrompt}
        status={studio.status}
        error={studio.error}
      />
    </div>
  );
}