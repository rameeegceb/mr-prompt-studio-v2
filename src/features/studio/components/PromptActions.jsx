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
  onOpenBuilder,
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
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Actions
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${statusTone[status] ?? statusTone.Idle}`}
          title="Current runtime status"
        >
          Runtime: {status}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">

        <Button
          onClick={onOpenBuilder}
          variant="outline"
          size="sm"
          title="Open the guided prompt builder"
        >
          Guided Prompt Builder
        </Button>

        <Button
          onClick={onImprove}
          loading={isImproving}
          disabled={isLoading && !isImproving}
          size="sm"
          title="Generate an improved prompt"
        >
          Improve
        </Button>

        <Button
          onClick={onEvaluate}
          variant="secondary"
          loading={isEvaluating}
          disabled={isLoading && !isEvaluating}
          className="bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500"
          size="sm"
          title="Evaluate prompt quality"
        >
          Evaluate
        </Button>

        <Button
          onClick={onConvert}
          variant="secondary"
          loading={isConverting}
          disabled={isLoading && !isConverting}
          className="bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500"
          size="sm"
          title="Convert prompt format"
        >
          Convert
        </Button>

        <Button
          onClick={onClear}
          variant="outline"
          disabled={isSaving}
          size="sm"
          title="Clear current prompt and output"
        >
          Clear
        </Button>
      </div>

      {error ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-sm text-rose-700">
          <span>{error}</span>
          <Button
            onClick={onClearError}
            variant="ghost"
            size="sm"
            className="text-rose-700"
            title="Dismiss error message"
          >
            Dismiss
          </Button>
        </div>
      ) : null}
    </section>
  );
}