const renderList = (
  title,
  items,
  emptyMessage,
  tone = "slate"
) => {
  const toneMap = {
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-sm font-semibold text-slate-900">
        {title}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <span
              key={`${title}-${item}`}
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${toneMap[tone]}`}
            >
              {item}
            </span>
          ))
        ) : (
          <span className="text-sm text-slate-500">
            {emptyMessage}
          </span>
        )}
      </div>
    </div>
  );
};

const renderVersionPane = (label, version) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-slate-900">
        {label}
      </span>

      <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">
        {version.displayNumber}
      </span>

      <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
        {version.action}
      </span>
    </div>

    <div className="mt-2 text-xs text-slate-500">
      {new Date(version.timestamp).toLocaleString()}
    </div>

    <div className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-700">
      <div className="whitespace-pre-wrap">
        {version.content}
      </div>
    </div>
  </div>
);

export default function VersionCompareDialog({
  comparison,
  onClose,
}) {
  if (!comparison) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex flex-col gap-3 border-b p-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Compare Versions
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Review content, section changes, and version metrics side by side.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            {renderVersionPane(
              "Base Version",
              comparison.baseVersion
            )}

            {renderVersionPane(
              "Target Version",
              comparison.targetVersion
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Word Delta
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {comparison.summary.wordDelta}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Character Delta
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {comparison.summary.characterDelta}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Base Words
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {comparison.summary.baseWords}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Target Words
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">
                {comparison.summary.targetWords}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {renderList(
              "Added Sections",
              comparison.sections.added,
              "No new sections detected.",
              "emerald"
            )}

            {renderList(
              "Removed Sections",
              comparison.sections.removed,
              "No removed sections detected.",
              "rose"
            )}

            {renderList(
              "Retained Sections",
              comparison.sections.retained,
              "No retained sections detected."
            )}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {renderList(
              "Added Lines",
              comparison.lines.added,
              "No added lines found.",
              "emerald"
            )}

            {renderList(
              "Removed Lines",
              comparison.lines.removed,
              "No removed lines found.",
              "rose"
            )}

            {renderList(
              "Retained Lines",
              comparison.lines.retained,
              "No shared lines found."
            )}
          </div>
        </div>
      </div>
    </div>
  );
}