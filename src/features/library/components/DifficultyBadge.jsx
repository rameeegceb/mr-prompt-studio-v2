const styles = {
  Beginner:
    "bg-green-100 text-green-700",

  Intermediate:
    "bg-blue-100 text-blue-700",

  Advanced:
    "bg-orange-100 text-orange-700",

  Expert:
    "bg-purple-100 text-purple-700",
};

export default function DifficultyBadge({
  difficulty,
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[difficulty] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {difficulty}
    </span>
  );
}