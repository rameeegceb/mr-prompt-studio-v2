import TemplateCard from "../components/TemplateCard";

export default function GalleryPanel({
  templates,
  selected,
  onSelect,
  onFavorite,
}) {
  return (
    <div className="space-y-4">

      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          selected={
            selected?.id === template.id
          }
          onClick={() =>
            onSelect(template)
          }
          onFavorite={() =>
            onFavorite(template.id)
          }
        />
      ))}

      {!templates.length && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h3 className="font-semibold">
            No prompts found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your filters.
          </p>
        </div>
      )}

    </div>
  );
}