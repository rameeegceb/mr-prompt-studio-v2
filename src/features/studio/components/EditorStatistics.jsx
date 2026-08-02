export default function EditorStatistics({
  metrics,
}) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-lg border bg-slate-50 p-4 md:grid-cols-4 xl:grid-cols-8">

      <Stat
        title="Words"
        value={metrics.wordCount}
      />

      <Stat
        title="Characters"
        value={metrics.characterCount}
      />

      <Stat
        title="Tokens"
        value={metrics.tokenCount}
      />

      <Stat
        title="Reading"
        value={`${metrics.readingTime} min`}
      />

      <Stat
        title="Complexity"
        value={metrics.complexity}
      />

      <Stat
        title="Score"
        value={metrics.promptScore}
      />

      <Stat
        title="History"
        value={metrics.historyCount}
      />

      <Stat
        title="Version"
        value={metrics.currentVersion}
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