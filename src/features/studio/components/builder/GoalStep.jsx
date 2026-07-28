export default function GoalStep({
  value,
  onChange,
}) {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        What is the goal?
      </h3>

      <p className="mt-2 text-slate-500">
        Describe the outcome you want from the AI.
      </p>

      <textarea
        rows={8}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-6 w-full rounded-lg border p-4"
        placeholder="Example: Explain Story Point Estimation to a new Scrum team."
      />

    </div>
  );
}