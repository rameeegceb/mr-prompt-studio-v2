import usePromptStudioContext from "../state/usePromptStudioContext";
import PromptComparison from "./PromptComparison";
import ComparisonDashboard from "./ComparisonDashboard";
import toast from "react-hot-toast";

export default function PromptOutput({
  value,
  status,
  error,
}) {
  const studio = usePromptStudioContext();

  const comparison =
    studio.evaluation?.comparison || null;

  const placeholder = error
    ? error
    : status === "Improving"
      ? "Improving prompt..."
      : status === "Converting"
        ? "Converting prompt..."
        : "Improved prompt will appear here.";

  const improvedText =
    value || placeholder;

  const copyImprovedPrompt = async () => {
    try {
      await navigator.clipboard.writeText(
        improvedText
      );
      toast.success(
        "Improved Prompt copied"
      );
    } catch {
      toast.error(
        "Unable to copy improved prompt."
      );
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Prompt Output
        </h3>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {status}
        </span>
      </div>

      {comparison ? (
        <div className="space-y-6">
          <PromptComparison
            original={studio.prompt}
            improved={value}
            comparison={comparison}
          />

          <ComparisonDashboard
            comparison={comparison}
          />
        </div>
      ) : (
        <div>
          <button
            onClick={copyImprovedPrompt}
            className="mb-2 inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            title="Copy improved prompt"
          >
            📋 Copy Improved Prompt
          </button>

          <div className="min-h-48 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            {improvedText}
          </div>
        </div>
      )}
    </section>
  );
}