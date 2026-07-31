export default function PromptExampleCard({ variant, title, prompt }) {
  const isGood = variant === "Good";

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm ${
        isGood
          ? "border-emerald-200 bg-emerald-50"
          : "border-rose-200 bg-rose-50"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
            isGood
              ? "bg-emerald-200 text-emerald-800"
              : "bg-rose-200 text-rose-800"
          }`}
        >
          {variant}
        </span>
      </div>

      <pre className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-800">
        {prompt}
      </pre>
    </div>
  );
}
