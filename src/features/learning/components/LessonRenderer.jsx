import SectionRenderer from "./renderers/SectionRenderer";

export default function LessonRenderer({ chapter }) {
  if (!chapter) return null;

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="mx-auto max-w-5xl p-10">

        <h1 className="text-4xl font-bold text-slate-900">
          {chapter.title}
        </h1>

        {chapter.summary && (
          <p className="mt-3 text-slate-600">
            {chapter.summary}
          </p>
        )}

        <div className="mt-10 space-y-10">
          {chapter.sections.map(section => (
            <SectionRenderer
              key={section.id}
              section={section}
            />
          ))}
        </div>

      </div>
    </div>
  );
}