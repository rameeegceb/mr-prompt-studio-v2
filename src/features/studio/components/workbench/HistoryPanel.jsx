export default function HistoryPanel({ history, onRestore, onDelete, onClear }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Prompt History
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Recall recent prompts and restore them into the editor.
          </p>
        </div>

        <button
          onClick={onClear}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Clear History
        </button>
      </div>

      {history.length === 0 ? (
        <div className="p-6 text-sm text-slate-500">
          No prompt history available yet.
        </div>
      ) : (
        <div className="divide-y divide-slate-200 p-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-slate-900">
                    {item.prompt.length > 120
                      ? `${item.prompt.slice(0, 120)}...`
                      : item.prompt}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {new Date(item.timestamp).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onRestore(item.id)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Restore
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
