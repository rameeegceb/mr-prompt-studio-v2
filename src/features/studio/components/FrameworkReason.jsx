import {
  Workflow,
  Lightbulb,
} from "lucide-react";

export default function FrameworkReason({
  framework,
  subtitle = "Selected by the Prompt Engine",
}) {
  if (!framework) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <Workflow className="h-6 w-6 text-indigo-600" />

        <div>

          <h2 className="text-lg font-semibold">
            Recommended Framework
          </h2>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>

        </div>

      </div>

      <div className="mt-6 rounded-lg bg-indigo-50 p-5">

        <div className="text-3xl font-bold text-indigo-700">
          {framework.name}
        </div>

      </div>

      <div className="mt-6 flex items-start gap-3">

        <Lightbulb className="mt-1 h-5 w-5 text-amber-500" />

        <div>

          <h3 className="font-medium">
            Why this framework?
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {framework.reason}
          </p>

        </div>

      </div>

    </div>
  );
}