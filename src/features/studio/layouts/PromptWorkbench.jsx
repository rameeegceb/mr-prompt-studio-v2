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
        {studio.isBuilderOpen ? (
          <BuilderPanel onClose={studio.closeBuilder} />
        ) : (
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b p-5">
              <h2 className="text-lg font-semibold">
                Guided Prompt Builder
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Build a structured enterprise prompt with a guided workflow.
              </p>
            </div>

            <div className="p-5">
              <button
                onClick={studio.openBuilder}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Open Guided Prompt Builder
              </button>
            </div>
          </div>
        )}
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