import {
  PlusCircle,
  MinusCircle,
  CheckCircle2,
} from "lucide-react";

function Section({
  title,
  icon,
  items,
}) {
  return (
    <div className="rounded-lg border p-5">

      <div className="mb-4 flex items-center gap-2">

        {icon}

        <h3 className="font-semibold">
          {title}
        </h3>

      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-500">
          None
        </p>
      ) : (
        <ul className="space-y-2">

          {items.map((item) => (
            <li key={item}>
              {item}
            </li>
          ))}

        </ul>
      )}

    </div>
  );
}

export default function ComparisonDashboard({
  comparison,
}) {
  if (!comparison) return null;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-semibold">
        Prompt Comparison
      </h2>

      <div className="grid gap-5 lg:grid-cols-3">

        <Section
          title="Added"
          items={comparison.added}
          icon={
            <PlusCircle className="h-5 w-5 text-green-600" />
          }
        />

        <Section
          title="Removed"
          items={comparison.removed}
          icon={
            <MinusCircle className="h-5 w-5 text-red-600" />
          }
        />

        <Section
          title="Retained"
          items={comparison.retained}
          icon={
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          }
        />

      </div>

    </div>
  );
}