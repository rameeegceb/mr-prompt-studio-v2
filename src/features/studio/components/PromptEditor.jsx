export default function PromptEditor({ value, onChange }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">
          Prompt
        </h2>
      </div>

      <div className="p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write your prompt here..."
          className="h-96 w-full resize-none rounded-xl border border-slate-300 p-4 outline-none focus:border-blue-500"
        />
      </div>
    </section>
  );
}