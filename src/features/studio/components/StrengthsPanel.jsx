import {
  CheckCircle2,
} from "lucide-react";

export default function StrengthsPanel({
  strengths = [],
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
        Strengths
      </h3>

      <div className="space-y-3">

        {strengths.length === 0 && (
          <p className="text-slate-500">
            No strengths detected.
          </p>
        )}

        {strengths.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-green-600" />

            <span>{item}</span>

          </div>
        ))}

      </div>

    </div>
  );
}