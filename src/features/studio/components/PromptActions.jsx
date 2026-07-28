export default function PromptActions({
  onImprove,
  onEvaluate,
  onConvert,
  onClear,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      <button
        onClick={onImprove}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Improve
      </button>

      <button
        onClick={onEvaluate}
        className="rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700"
      >
        Evaluate
      </button>

      <button
        onClick={onConvert}
        className="rounded-lg bg-emerald-600 px-5 py-2 text-white hover:bg-emerald-700"
      >
        Convert
      </button>

      <button
        onClick={onClear}
        className="rounded-lg border border-slate-300 bg-white px-5 py-2 hover:bg-slate-50"
      >
        Clear
      </button>

    </div>
  );
}