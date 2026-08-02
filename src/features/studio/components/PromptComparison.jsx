import toast from "react-hot-toast";

export default function PromptComparison({
  original,
  improved,
  comparison,
}) {
  const originalText =
    original || "No prompt entered.";
  const improvedText =
    improved || "No improved prompt yet.";

  const copyPrompt = async (
    label,
    text
  ) => {
    try {
      await navigator.clipboard.writeText(
        text
      );
      toast.success(
        `${label} copied`
      );
    } catch {
      toast.error(
        `Unable to copy ${label.toLowerCase()}.`
      );
    }
  };

  const sectionBadges = [
    {
      title: "Added Sections",
      items: comparison?.added || [],
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Removed Sections",
      items: comparison?.removed || [],
      tone: "bg-rose-50 text-rose-700",
    },
    {
      title: "Changed Sections",
      items: comparison?.changed || [],
      tone: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-slate-900">
          Prompt Comparison
        </h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-800">
            Original Prompt
          </h4>

          <button
            onClick={() =>
              copyPrompt(
                "Original Prompt",
                originalText
              )
            }
            className="mb-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            📋 Copy Original Prompt
          </button>

          <div className="min-h-52 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            {originalText}
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-800">
            Improved Prompt
          </h4>

          <button
            onClick={() =>
              copyPrompt(
                "Improved Prompt",
                improvedText
              )
            }
            className="mb-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            📋 Copy Improved Prompt
          </button>

          <div className="min-h-52 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            {improvedText}
          </div>
        </div>

      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {sectionBadges.map((group) => (
          <div
            key={group.title}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <h4 className="text-sm font-semibold text-slate-800">
              {group.title}
            </h4>

            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.length > 0 ? (
                group.items.map((item) => (
                  <span
                    key={`${group.title}-${item}`}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${group.tone}`}
                  >
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-xs text-slate-500">
                  None
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}