import { Compass, GraduationCap } from "lucide-react";
import LearningPathCard from "./LearningPathCard";

export default function LearningPathsDashboard({
  paths = [],
  activePath,
  onSelectPath,
  onContinuePath,
  onOpenWorkspace,
}) {
  const totalLessons = paths.reduce(
    (count, path) => count + path.totalLessons,
    0
  );

  const completedLessons = paths.reduce(
    (count, path) => count + path.completedLessons,
    0
  );

  const overallProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100
        )
      : 0;

  const estimatedMinutes = paths.reduce(
    (total, path) => total + path.estimatedMinutes,
    0
  );

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="inline-flex rounded-lg bg-blue-100 p-2 text-blue-600">
            <GraduationCap size={20} />
          </div>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Academy Progress
          </p>

          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {overallProgress}%
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="inline-flex rounded-lg bg-emerald-100 p-2 text-emerald-600">
            <Compass size={20} />
          </div>

          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Learning Paths
          </p>

          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {paths.length}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Structured journeys using existing lessons
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Estimated Study Time
          </div>

          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {estimatedMinutes} min
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Across all paths from current course content
          </p>

          <button
            onClick={onOpenWorkspace}
            className="mt-4 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Open Lesson Workspace
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {paths.map((path) => (
          <LearningPathCard
            key={path.id}
            path={path}
            active={activePath?.id === path.id}
            onSelect={onSelectPath}
            onContinue={onContinuePath}
          />
        ))}
      </div>
    </section>
  );
}
