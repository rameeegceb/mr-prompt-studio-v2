export default function PromptOutput({
  value,
  status,
  error,
}) {
  const placeholder = error
    ? error
    : status === "Improving"
      ? "Improving prompt..."
      : status === "Converting"
        ? "Converting prompt..."
        : "Improved prompt will appear here.";

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="font-semibold">
        Improved Prompt
        </h3>

        <span className="text-xs text-slate-500">
          {status}
        </span>
      </div>

      <div className="min-h-48 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-slate-700">
        {value || placeholder}
      </div>
    </div>
  );
}