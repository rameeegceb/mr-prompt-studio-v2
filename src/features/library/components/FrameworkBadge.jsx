const colors = {
  RACE:
    "bg-blue-100 text-blue-700",

  COAST:
    "bg-indigo-100 text-indigo-700",

  CARE:
    "bg-emerald-100 text-emerald-700",

  TAG:
    "bg-amber-100 text-amber-700",

  APE:
    "bg-pink-100 text-pink-700",

  SMART:
    "bg-cyan-100 text-cyan-700",

  TRACE:
    "bg-violet-100 text-violet-700",
};

export default function FrameworkBadge({
  framework,
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        colors[framework] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {framework}
    </span>
  );
}