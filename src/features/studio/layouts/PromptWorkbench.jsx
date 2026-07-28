import usePromptStudioContext from "../state/usePromptStudioContext";

import BuilderPanel from "../panels/BuilderPanel";
import EditorPanel from "../panels/EditorPanel";
import AnalysisPanel from "../panels/AnalysisPanel";

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

      <aside className="xl:col-span-4">
        <AnalysisPanel />
      </aside>
    </div>
  );
}