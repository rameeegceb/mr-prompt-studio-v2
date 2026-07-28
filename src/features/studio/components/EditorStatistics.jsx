export default function EditorStatistics({
  prompt,
  analysis,
}) {
  const words =
    prompt.trim().length === 0
      ? 0
      : prompt.trim().split(/\s+/).length;

  const characters =
    prompt.length;

  const tokens =
    Math.ceil(words * 1.3);

  const readingTime =
    Math.max(1, Math.ceil(words / 200));

  return (
    <div className="grid grid-cols-2 gap-3 rounded-lg border bg-slate-50 p-4 md:grid-cols-5">

      <Stat
        title="Words"
        value={words}
      />

      <Stat
        title="Characters"
        value={characters}
      />

      <Stat
        title="Tokens"
        value={tokens}
      />

      <Stat
        title="Reading"
        value={`${readingTime} min`}
      />

      <Stat
        title="Complexity"
        value={
          analysis?.complexity ??
          "-"
        }
      />

    </div>
  );
}

function Stat({
  title,
  value,
}) {
  return (
    <div>

      <div className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </div>

      <div className="mt-1 text-lg font-semibold">
        {value}
      </div>

    </div>
  );
}