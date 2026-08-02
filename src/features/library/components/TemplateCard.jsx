export default function TemplateCard({
  template,
  selected,
  onClick,
  onFavorite,
  onUseInStudio,
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition hover:shadow-lg ${
        selected ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">
            {template.title}
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {template.description}
          </p>
        </div>

        <button
          onClick={(event) => {
            event.stopPropagation();
            onFavorite();
          }}
          className="rounded-lg border px-3 py-1 text-sm text-slate-700"
        >
          Favorite
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          onClick={onClick}
          className="w-full rounded-lg bg-slate-100 px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-200"
        >
          View prompt
        </button>

        <button
          onClick={onUseInStudio}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Use in Studio
        </button>
      </div>
    </div>
  );
}
