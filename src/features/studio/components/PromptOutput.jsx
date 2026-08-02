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
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold">
          Improved Prompt
        </h3>

        <span className="text-xs text-slate-500">
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
            className="mb-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            📋 Copy Improved Prompt
          </button>

          <div className="min-h-48 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-slate-700">
            {improvedText}
          </div>
        </div>
      )}
    </div>
  );
}