import PageHeader from "../../../components/ui/PageHeader";

import PromptWorkbench from "../layouts/PromptWorkbench";

import PromptStudioProvider from "../state/PromptStudioProvider";

export default function PromptStudio() {
  return (
    <PromptStudioProvider>
      <div className="space-y-6">
        <PageHeader
          title="Prompt Studio"
          description="Enterprise Prompt Engineering Platform"
        />

        <PromptWorkbench />
      </div>
    </PromptStudioProvider>
  );
}