export default function Recommendations({
  items = [],
}) {
  return (
    <div>
      <h3 className="mb-3 font-semibold">
        Recommendations
      </h3>

      <div className="rounded-xl bg-slate-50 p-4">

        {items.length === 0 ? (
          <p className="text-slate-500">
            Prompt evaluation results will appear here.
          </p>
        ) : (
          <ul className="list-disc space-y-2 pl-5">
            {items.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}