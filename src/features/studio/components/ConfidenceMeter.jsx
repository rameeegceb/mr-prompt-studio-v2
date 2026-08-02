import { ShieldCheck } from "lucide-react";

export default function ConfidenceMeter({
  confidence,
  description = "Based on prompt completeness and detected prompt structure.",
}) {
  if (confidence == null) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-center gap-2">

        <ShieldCheck className="h-5 w-5 text-blue-600" />

        <h3 className="font-semibold">
          Confidence
        </h3>

      </div>

      <div className="mt-6 h-4 rounded-full bg-slate-200">

        <div
          className="h-4 rounded-full bg-blue-600 transition-all"
          style={{
            width: `${confidence}%`,
          }}
        />

      </div>

      <div className="mt-3 text-4xl font-bold text-blue-600">
        {confidence}%
      </div>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>

    </div>
  );
}