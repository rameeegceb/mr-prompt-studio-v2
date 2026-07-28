import {
  Clock3,
  ChevronRight,
} from "lucide-react";

export default function ChapterCard({
  chapter,
  active,
  onClick,
}) {
  const Icon = chapter.icon;

  return (
    <button
      onClick={() => onClick(chapter.id)}
      className={`group flex w-full items-start gap-4 rounded-xl border p-5 text-left transition-all ${
        active
          ? "border-blue-600 bg-blue-50"
          : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div className="rounded-lg bg-blue-100 p-3">
        <Icon
          size={22}
          className="text-blue-600"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">
          {chapter.title}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {chapter.description}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
          <span>{chapter.difficulty}</span>

          <span className="flex items-center gap-1">
            <Clock3 size={14} />

            {chapter.duration}
          </span>
        </div>
      </div>

      <ChevronRight
        className="text-slate-400 transition group-hover:translate-x-1"
        size={18}
      />
    </button>
  );
}