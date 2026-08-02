import PromptBuilder from "../components/builder/PromptBuilder";
import usePromptStudioContext from "../state/usePromptStudioContext";
import Button from "../../../components/ui/Button";

export default function BuilderPanel({ onClose }) {
  const studio = usePromptStudioContext();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-start justify-between gap-4 border-b p-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Guided Prompt Builder
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Build a structured enterprise prompt.
          </p>
        </div>

        {onClose ? (
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
          >
            Close
          </Button>
        ) : null}
      </div>

      <div className="p-5">
        <PromptBuilder
          onGenerate={(prompt) =>
            studio.setPrompt(prompt)
          }
        />
      </div>
    </div>
  );
}