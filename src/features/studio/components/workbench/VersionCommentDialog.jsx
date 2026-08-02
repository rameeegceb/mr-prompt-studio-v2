export default function VersionCommentDialog({
  open,
  title,
  description,
  comment,
  submitLabel,
  onChange,
  onClose,
  onSubmit,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
        <form onSubmit={onSubmit}>
          <div className="border-b p-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          </div>

          <div className="p-6">
            <label className="block text-sm font-medium text-slate-700">
              Version Comment
            </label>

            <textarea
              value={comment}
              onChange={(event) =>
                onChange(event.target.value)
              }
              rows={6}
              placeholder="Add implementation notes, context, or review comments for this version."
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex justify-end gap-3 border-t p-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}