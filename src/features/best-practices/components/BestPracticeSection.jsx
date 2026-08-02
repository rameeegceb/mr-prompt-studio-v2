export default function BestPracticeSection({ title, items }) {
  return (
    <section className="rounded-2xl border bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <ul className="mt-5 space-y-3 text-slate-700">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
