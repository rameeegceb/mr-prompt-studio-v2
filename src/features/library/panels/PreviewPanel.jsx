import DepartmentBadge from "../components/DepartmentBadge";
import DifficultyBadge from "../components/DifficultyBadge";
import FrameworkBadge from "../components/FrameworkBadge";
import ScoreBadge from "../components/ScoreBadge";

export default function PreviewPanel({
  template,
  onUse,
  onUseInStudio,
}) {
  if (!template) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
        Select a prompt to preview.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold">
          {template.title}
        </h2>

        <p className="mt-2 text-slate-600">
          {template.description}
        </p>

      </div>

      <div className="space-y-5 p-6">

        <div className="flex flex-wrap gap-2">

          <DepartmentBadge
            department={template.department}
          />

          <DifficultyBadge
            difficulty={template.difficulty}
          />

          <FrameworkBadge
            framework={template.framework}
          />

          <ScoreBadge
            score={
              template.estimatedScore
            }
          />

        </div>

        <div>

          <h3 className="mb-2 font-semibold">
            Prompt
          </h3>

          <pre className="overflow-auto rounded-lg bg-slate-100 p-4 text-sm whitespace-pre-wrap">
{template.prompt}
          </pre>

        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            onClick={() => onUse(template)}
            className="w-full rounded-lg border border-slate-300 bg-white py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Use Prompt
          </button>

          <button
            onClick={() => onUseInStudio(template)}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Use in Studio
          </button>
        </div>

      </div>

    </div>
  );
}