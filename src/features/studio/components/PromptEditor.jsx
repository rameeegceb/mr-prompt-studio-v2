export default function PromptEditor({ value, onChange }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Prompt
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Write or paste your original prompt.
        </p>
      </div>

      <div className="p-6">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste or write your prompt here..."
          className="h-80 w-full resize-none rounded-xl border border-slate-300 p-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 lg:h-96"
        />
      </div>
    </section>
  );
}