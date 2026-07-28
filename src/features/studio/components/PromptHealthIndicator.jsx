import {
  CircleAlert,
  CircleCheck,
} from "lucide-react";

export default function PromptHealthIndicator({
  score,
}) {
  if (!score) return null;

  const healthy =
    score.overall >= 80;

  return (
    <div
      className={`rounded-xl border p-4 ${
        healthy
          ? "border-green-200 bg-green-50"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-center gap-3">

        {healthy ? (
          <CircleCheck className="h-6 w-6 text-green-600" />
        ) : (
          <CircleAlert className="h-6 w-6 text-amber-600" />
        )}

        <div>

          <div className="font-semibold">
            {healthy
              ? "Enterprise Ready"
              : "Needs Improvement"}
          </div>

          <div className="text-sm text-slate-600">
            Current Prompt Score:{" "}
            {score.overall}/100
          </div>

        </div>

      </div>
    </div>
  );
}