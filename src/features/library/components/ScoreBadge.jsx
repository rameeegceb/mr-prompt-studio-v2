export default function ScoreBadge({
  score,
}) {
  let color =
    "bg-red-100 text-red-700";

  if (score >= 90)
    color =
      "bg-emerald-100 text-emerald-700";
  else if (score >= 80)
    color =
      "bg-blue-100 text-blue-700";
  else if (score >= 70)
    color =
      "bg-amber-100 text-amber-700";

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      {score}/100
    </span>
  );
}