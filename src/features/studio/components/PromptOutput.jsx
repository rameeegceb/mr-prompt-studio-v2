export default function PromptOutput({ value }) {
  return (
    <div>
      <h3 className="mb-2 font-semibold">
        Improved Prompt
      </h3>

      <div className="min-h-48 whitespace-pre-wrap rounded-xl bg-slate-50 p-4">
        {value || "Improved prompt will appear here."}
      </div>
    </div>
  );
}