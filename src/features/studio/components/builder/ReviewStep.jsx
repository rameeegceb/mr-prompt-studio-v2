export default function ReviewStep({
  model,
  prompt,
}) {
  return (
    <div>

      <h2 className="mb-6 text-xl font-semibold">
        Review Prompt
      </h2>

      <div className="space-y-5 rounded-lg border bg-slate-50 p-6">

        <div>
          <strong>Goal</strong>
          <p>{model.goal}</p>
        </div>

        <div>
          <strong>Role</strong>
          <p>{model.role}</p>
        </div>

        <div>
          <strong>Context</strong>
          <p>{model.context}</p>
        </div>

        <div>
          <strong>Audience</strong>
          <p>{model.audience}</p>
        </div>

        <div>
          <strong>Task</strong>
          <p>{model.task}</p>
        </div>

        <div>
          <strong>Constraints</strong>
          <p>{model.constraints}</p>
        </div>

        <div>
          <strong>Output</strong>
          <p>{model.output}</p>
        </div>

        {prompt ? (
          <div>
            <strong>Generated Prompt</strong>
            <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-white p-4 text-sm text-slate-700">
              {prompt}
            </pre>
          </div>
        ) : null}

      </div>

    </div>
  );
}