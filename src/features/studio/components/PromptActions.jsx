import Button from "../../../components/ui/Button";

const statusTone = {
  Idle: "bg-slate-100 text-slate-600",
  Evaluating: "bg-violet-100 text-violet-700",
  Improving: "bg-blue-100 text-blue-700",
  Converting: "bg-emerald-100 text-emerald-700",
  Saving: "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Error: "bg-rose-100 text-rose-700",
};

export default function PromptActions({
  onImprove,
  onEvaluate,
  onConvert,
  onClear,
  onClearError,
  status,
  error,
  isLoading,
  isEvaluating,
  isImproving,
  isConverting,
  isSaving,
}) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">

        <Button
          onClick={onImprove}
          loading={isImproving}
          disabled={isLoading && !isImproving}
        >
          Improve
        </Button>

        <Button
          onClick={onEvaluate}
          variant="secondary"
          loading={isEvaluating}
          disabled={isLoading && !isEvaluating}
          className="bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500"
        >
          Evaluate
        </Button>

        <Button
          onClick={onConvert}
          variant="secondary"
          loading={isConverting}
          disabled={isLoading && !isConverting}
          className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
        >
          Convert
        </Button>

        <Button
          onClick={onClear}
          variant="outline"
          disabled={isSaving}
        >
          Clear
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone[status] ?? statusTone.Idle}`}
        >
          Runtime: {status}
        </span>

        {error ? (
          <div className="flex flex-wrap items-center gap-2 text-sm text-rose-600">
            <span>{error}</span>
            <Button
              onClick={onClearError}
              variant="ghost"
              size="sm"
              className="text-rose-600"
            >
              Dismiss
            </Button>
          </div>
        ) : null}
      </div>

    </div>
  );
}