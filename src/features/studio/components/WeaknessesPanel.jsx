import {
  AlertTriangle,
} from "lucide-react";

export default function WeaknessesPanel({
  weaknesses = [],
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h3 className="mb-5 text-lg font-semibold">
        Weaknesses
      </h3>

      <div className="space-y-3">

        {weaknesses.length === 0 && (
          <p className="text-green-600">
            No weaknesses detected.
          </p>
        )}

        {weaknesses.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <AlertTriangle className="h-5 w-5 text-amber-600" />

            <span>{item}</span>

          </div>
        ))}

      </div>

    </div>
  );
}