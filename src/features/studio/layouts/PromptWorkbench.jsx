import usePromptStudioContext from "../state/usePromptStudioContext";

import BuilderPanel from "../panels/BuilderPanel";
import EditorPanel from "../panels/EditorPanel";
import AnalysisPanel from "../panels/AnalysisPanel";
import HistoryPanel from "../components/workbench/HistoryPanel";
import VersionHistoryPanel from "../components/workbench/VersionHistoryPanel";

export default function PromptWorkbench() {
  const studio = usePromptStudioContext();

  return (
    <div className="grid gap-6 xl:grid-cols-12">
      <aside className="xl:col-span-3">
        <BuilderPanel />
      </aside>

      <main className="xl:col-span-5">
        <EditorPanel />
      </main>

      <aside className="xl:col-span-4 space-y-6">
        <HistoryPanel
          history={studio.history}
          onRestore={studio.restoreHistoryItem}
          onDelete={studio.deleteHistoryItem}
          onClear={studio.clearHistory}
        />

        <VersionHistoryPanel
          versions={studio.versions}
          currentPrompt={studio.prompt}
          onSaveVersion={studio.saveCurrentVersion}
          onRestore={studio.restoreVersion}
          onDelete={studio.deleteVersion}
          onClear={studio.clearVersions}
          onSaveComment={studio.saveVersionComment}
          onCompareVersions={studio.compareVersions}
        />

        <AnalysisPanel />
      </aside>
    </div>
  );
}