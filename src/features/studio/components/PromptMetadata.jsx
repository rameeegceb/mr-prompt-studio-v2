export default function PromptMetadata({
  analysis,
}) {
  if (!analysis) return null;

  const estimatedTokens =
    Math.ceil(
      analysis.wordCount * 1.3
    );

  const readingTime =
    Math.max(
      1,
      Math.ceil(
        analysis.wordCount / 200
      )
    );

  const items = [
    {
      label: "Intent",
      value: analysis.intent,
    },
    {
      label: "Complexity",
      value: analysis.complexity,
    },
    {
      label: "Words",
      value: analysis.wordCount,
    },
    {
      label: "Characters",
      value:
        analysis.wordCount * 6,
    },
    {
      label: "Estimated Tokens",
      value: estimatedTokens,
    },
    {
      label: "Sentences",
      value:
        analysis.sentenceCount,
    },
    {
      label: "Reading Time",
      value: `${readingTime} min`,
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h3 className="mb-4 text-lg font-semibold">
        Prompt Metadata
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {items.map((item) => (
          <div key={item.label}>

            <div className="text-xs uppercase tracking-wide text-slate-500">
              {item.label}
            </div>

            <div className="mt-1 font-medium">
              {item.value}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}