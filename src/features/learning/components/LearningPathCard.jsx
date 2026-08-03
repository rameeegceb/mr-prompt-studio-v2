import { ArrowRight, CheckCircle2, Clock3 } from "lucide-react";

export default function LearningPathCard({
  path,
  active,
  onSelect,
  onContinue,
}) {
  return (
    <article
      className={`rounded-2xl border bg-white p-5 shadow-sm transition ${
        active
          ? "border-blue-500 ring-2 ring-blue-100"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            Learning Path
          </p>

          <h3 className="mt-1 text-lg font-semibold text-slate-900">
            {path.title}
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            {path.description}
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {path.difficulty}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Progress
          </div>
          <div className="mt-1 text-base font-semibold text-slate-900">
            {path.progress}%
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Lessons
          </div>
          <div className="mt-1 text-base font-semibold text-slate-900">
            {path.completedLessons}/{path.totalLessons}
          </div>
        </div>

        <div className="rounded-lg bg-slate-50 p-3">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Duration
          </div>
          <div className="mt-1 text-base font-semibold text-slate-900">
            {path.estimatedMinutes} min
          </div>
        </div>
      </div>

      <div className="mt-4 h-2 rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all"
          style={{ width: `${path.progress}%` }}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onSelect(path.id)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          View Lessons
        </button>

        <button
          onClick={() => onContinue(path.id)}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Continue Learning
          <ArrowRight size={16} />
        </button>
      </div>

      {path.lessons.length > 0 ? (
        <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
          {path.lessons.slice(0, 3).map((lesson) => (
            <div
              key={lesson.id}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm"
            >
              <div className="min-w-0 pr-3">
                <div className="truncate font-medium text-slate-800">
                  {lesson.title}
                </div>

                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500">
                  <span>{lesson.difficulty}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 size={12} />
                    {lesson.estimatedMinutes} min
                  </span>
                </div>
              </div>

              {lesson.completed ? (
                <CheckCircle2
                  size={16}
                  className="text-emerald-600"
                />
              ) : null}
            </div>
          ))}

          {path.lessons.length > 3 ? (
            <div className="text-xs text-slate-500">
              +{path.lessons.length - 3} more lessons
            </div>
          ) : null}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-slate-300 p-3 text-sm text-slate-500">
          No lessons mapped yet.
        </div>
      )}
    </article>
  );
}
