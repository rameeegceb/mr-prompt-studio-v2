export default function PromptScore({ evaluation }) {
  if (evaluation.score === null) {
    return (
      <div className="rounded-xl bg-slate-50 p-5">
        <div className="text-sm text-slate-500">
          Prompt Score
        </div>

        <div className="mt-3 text-4xl font-bold">
          --
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-slate-50 p-5">

      <div className="flex items-center justify-between">

        <div>
          <div className="text-sm text-slate-500">
            Overall Score
          </div>

          <div className="mt-2 text-5xl font-bold">
            {evaluation.score}
          </div>
        </div>

        <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          {evaluation.intent}
        </div>

      </div>

      <div className="mt-6 space-y-3">

        {evaluation.breakdown.map((item) => (

          <div key={item.label}>

            <div className="mb-1 flex justify-between text-sm">

              <span>{item.label}</span>

              <span>
                {item.score}/{item.max}
              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-200">

              <div
                className="h-2 rounded-full bg-blue-600"
                style={{
                  width: `${(item.score / item.max) * 100}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}