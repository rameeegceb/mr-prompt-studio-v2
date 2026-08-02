import {
  Files,
  Star,
  Clock,
  Layers,
} from "lucide-react";

export default function LibraryStatistics({
  stats,
}) {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

      <StatCard
        icon={Files}
        label="Templates"
        value={stats.total}
      />

      <StatCard
        icon={Layers}
        label="Categories"
        value={stats.categories}
      />

      <StatCard
        icon={Star}
        label="Favorites"
        value={stats.favorites}
      />

      <StatCard
        icon={Clock}
        label="Recent"
        value={stats.recent}
      />

    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {label}
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {value}
          </h2>
        </div>

        <div className="rounded-lg bg-blue-100 p-3">
          <Icon className="text-blue-600" />
        </div>
      </div>
    </div>
  );
}