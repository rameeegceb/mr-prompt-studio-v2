import {
  Award,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function EnterpriseScoreCard({
  score,
}) {
  if (!score) return null;

  const color =
    score.overall >= 90
      ? "text-green-600"
      : score.overall >= 80
      ? "text-blue-600"
      : score.overall >= 60
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-lg font-semibold">
            Enterprise Prompt Score
          </h2>

          <p className="text-sm text-slate-500">
            Prompt Quality Assessment
          </p>

        </div>

        <Award
          className={`h-8 w-8 ${color}`}
        />

      </div>

      <div className="mt-6">

        <div
          className={`text-6xl font-bold ${color}`}
        >
          {score.overall}
        </div>

        <div className="mt-2 text-lg font-medium">
          {score.maturity}
        </div>

      </div>

      <div className="mt-8">

        <div className="mb-2 flex items-center gap-2">

          <BarChart3
            className="h-4 w-4"
          />

          <span className="font-medium">
            Score Breakdown
          </span>

        </div>

        <div className="space-y-3">

          {score.breakdown.map((item) => (
            <div key={item.id}>

              <div className="mb-1 flex justify-between text-sm">

                <span>{item.title}</span>

                <span>
                  {item.score}/{item.max}
                </span>

              </div>

              <div className="h-2 rounded bg-slate-200">

                <div
                  className={`h-2 rounded ${
                    item.passed
                      ? "bg-green-600"
                      : "bg-red-400"
                  }`}
                  style={{
                    width: `${
                      (item.score /
                        item.max) *
                      100
                    }%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      <div className="mt-8 flex items-center gap-2 rounded-lg bg-green-50 p-3">

        <CheckCircle2 className="h-5 w-5 text-green-600" />

        <span className="text-sm">
          Enterprise evaluation completed.
        </span>

      </div>

    </div>
  );
}