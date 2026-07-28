export default function ImprovementSummary({
  improvements,
}) {
  return (
    <div>

      <h3 className="mb-3 text-lg font-semibold">
        Improvements Made
      </h3>

      <div className="rounded-xl bg-slate-50 p-4">

        {improvements.length === 0 ? (

          <p className="text-slate-500">
            No improvements yet.
          </p>

        ) : (

          <ul className="space-y-2">

            {improvements.map((item) => (

              <li
                key={item}
                className="flex gap-2"
              >
                <span className="text-green-600">
                  ✓
                </span>

                {item}

              </li>

            ))}

          </ul>

        )}

      </div>

    </div>
  );
}