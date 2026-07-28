import {
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function EnhancementSummary({
  comparison,
}) {
  if (!comparison) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-center gap-3">

        <Sparkles className="h-6 w-6 text-blue-600" />

        <h2 className="text-lg font-semibold">
          Prompt Enhancement Summary
        </h2>

      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">

        <div className="rounded-lg bg-slate-100 p-4 text-center">

          <div className="text-sm text-slate-500">
            Original
          </div>

          <div className="mt-2 text-3xl font-bold">
            {comparison.originalScore}
          </div>

        </div>

        <div className="flex items-center justify-center">

          <ArrowRight className="h-8 w-8 text-blue-600" />

        </div>

        <div className="rounded-lg bg-green-100 p-4 text-center">

          <div className="text-sm text-slate-600">
            Improved
          </div>

          <div className="mt-2 text-3xl font-bold text-green-700">
            {comparison.improvedScore}
          </div>

        </div>

      </div>

      <div className="mt-8 rounded-lg bg-blue-50 p-5">

        <div className="flex items-center gap-3">

          <TrendingUp className="h-6 w-6 text-blue-700" />

          <div>

            <div className="text-sm text-slate-500">
              Overall Improvement
            </div>

            <div className="text-4xl font-bold text-blue-700">
              +{comparison.scoreIncrease}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}