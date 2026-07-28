import PromptEditor from "../components/PromptEditor";
import PromptOutput from "../components/PromptOutput";
import PromptActions from "../components/PromptActions";
import EditorStatistics from "../components/EditorStatistics";

import usePromptStudioContext from "../state/usePromptStudioContext";

export default function EditorPanel() {
  const studio = usePromptStudioContext();

  return (
    <div className="space-y-6">
      <EditorStatistics
        prompt={studio.prompt}
        analysis={studio.evaluation?.analysis}
      />

      <PromptEditor
        value={studio.prompt}
        onChange={studio.setPrompt}
      />

      <PromptActions
        onImprove={studio.handleImprove}
        onEvaluate={studio.handleEvaluate}
        onConvert={studio.handleConvert}
        onClear={studio.handleClear}
      />

      <PromptOutput
        value={studio.improvedPrompt}
      />
    </div>
  );
}