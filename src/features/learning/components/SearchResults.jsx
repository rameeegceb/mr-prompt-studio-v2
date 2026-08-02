export default function SearchResults({
  results = [],
}) {
  if (!results.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">
        Search Results
      </h3>

      <div className="space-y-4">
        {results.map((result, index) => (
          <div
            key={index}
            className="rounded-lg border border-slate-200 p-4"
          >
            <p className="text-sm leading-7 text-slate-700">
              {result.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}