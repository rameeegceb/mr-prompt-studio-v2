const truncate = (value, limit = 160) => {
  if (!value) return "";

  return value.length > limit
    ? `${value.slice(0, limit)}...`
    : value;
};

export default function VersionCard({
  version,
  isCompareSelected,
  onRestore,
  onDelete,
  onComment,
  onToggleCompare,
}) {
  const hasSourceSnapshot =
    Boolean(version.sourcePrompt) &&
    version.sourcePrompt !== version.content;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
              {version.displayNumber}
            </span>

            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
              {version.action}
            </span>

            {version.isCurrent ? (
              <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                Current Version
              </span>
            ) : null}

            {version.comment ? (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700">
                Commented
              </span>
            ) : null}
          </div>

          <div>
            <div className="text-xs text-slate-500">
              {new Date(version.timestamp).toLocaleString()}
            </div>

            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
              {truncate(version.content)}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>{version.wordCount} words</span>
            <span>{version.characterCount} characters</span>
            {hasSourceSnapshot ? (
              <span>Source prompt captured</span>
            ) : null}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
            {version.comment || "No version comment added."}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:justify-end">
          <button
            onClick={() => onRestore(version.id)}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            Restore
          </button>

          <button
            onClick={() => onToggleCompare(version.id)}
            className={`rounded-lg px-3 py-2 text-sm ${
              isCompareSelected
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            {isCompareSelected
              ? "Selected"
              : "Compare"}
          </button>

          <button
            onClick={() => onComment(version)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            {version.comment
              ? "Edit Comment"
              : "Add Comment"}
          </button>

          <button
            onClick={() => onDelete(version.id)}
            className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}