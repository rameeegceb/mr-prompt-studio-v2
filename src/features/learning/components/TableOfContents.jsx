export default function TableOfContents({
  headings = [],
  onNavigate,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        Table of Contents
      </h3>

      <div className="space-y-2">
        {headings.map((heading) => (
          <button
            key={heading.id}
            onClick={() => onNavigate(heading.id)}
            className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-100"
            style={{
              paddingLeft: `${
                heading.level * 14
              }px`,
            }}
          >
            {heading.title}
          </button>
        ))}
      </div>
    </div>
  );
}