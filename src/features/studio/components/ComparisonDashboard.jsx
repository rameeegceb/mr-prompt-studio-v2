import {
  PlusCircle,
  MinusCircle,
  Pencil,
} from "lucide-react";

function Section({
  title,
  icon,
  items,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">

      <div className="mb-3 flex items-center gap-2">

        {icon}

        <h3 className="text-sm font-semibold text-slate-900">
          {title}
        </h3>

      </div>

      {items.length === 0 ? (
        <p className="text-xs text-slate-500">
          None
        </p>
      ) : (
        <ul className="space-y-1.5 text-sm text-slate-700">

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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-700">
        Section Deltas
      </h2>

      <div className="grid gap-3 lg:grid-cols-3">

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
          title="Changed"
          items={comparison.changed || []}
          icon={
            <Pencil className="h-5 w-5 text-amber-600" />
          }
        />

      </div>

    </div>
  );
}