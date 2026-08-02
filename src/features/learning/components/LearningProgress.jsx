import { BookOpen, Trophy } from "lucide-react";

export default function LearningProgress({
  progress = 0,
  chaptersCompleted = 0,
  totalChapters = 0,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Learning Progress
          </p>

          <h3 className="mt-1 text-xl font-semibold text-slate-900">
            {progress}% Complete
          </h3>
        </div>

        <div className="rounded-xl bg-blue-100 p-3">
          <BookOpen className="text-blue-600" size={28} />
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-slate-500">
          {chaptersCompleted} of {totalChapters} Chapters
        </span>

        <span className="flex items-center gap-1 font-medium text-emerald-600">
          <Trophy size={16} />
          Enterprise Learning
        </span>
      </div>
    </div>
  );
}