export default function EditorStatistics({
  metrics,
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-700">
        Prompt Metrics
      </h3>

      <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 xl:grid-cols-8">

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
    </section>
  );
}

function Stat({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">

      <div className="text-xs uppercase tracking-wide text-slate-500">
        {title}
      </div>

      <div className="mt-1 text-base font-semibold text-slate-900 lg:text-lg">
        {value}
      </div>

    </div>
  );
}