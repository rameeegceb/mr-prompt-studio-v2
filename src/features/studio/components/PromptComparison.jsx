export default function PromptComparison({
  original,
  improved,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      <div>
        <h3 className="mb-2 font-semibold">
          Original Prompt
        </h3>

        <div className="min-h-52 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4">
          {original || "No prompt entered."}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-semibold">
          Improved Prompt
        </h3>

        <div className="min-h-52 whitespace-pre-wrap rounded-xl border border-slate-200 bg-white p-4">
          {improved || "No improved prompt yet."}
        </div>
      </div>

    </div>
  );
}