import { chapters } from "../data/chapters";

export default function LearningSidebar({
  selectedChapter,
  onSelectChapter,
}) {
  return (
    <aside className="w-72 border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-semibold">
          Learning Hub
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Prompt Engineering Guide
        </p>
      </div>

      <nav className="p-3">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onSelectChapter(chapter.id)}
            className={`mb-2 w-full rounded-lg px-4 py-3 text-left transition ${
              selectedChapter === chapter.id
                ? "bg-blue-600 text-white"
                : "hover:bg-slate-100"
            }`}
          >
            <div className="font-medium">
              {chapter.title}
            </div>

            <div className="text-xs opacity-80">
              {chapter.description}
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}