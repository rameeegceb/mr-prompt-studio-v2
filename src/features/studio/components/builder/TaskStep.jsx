export default function TaskStep({
  value,
  onChange,
}) {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        What should the prompt ask the AI to do?
      </h3>

      <p className="mt-2 text-slate-500">
        Define the concrete task the model should execute.
      </p>

      <textarea
        rows={8}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-6 w-full rounded-lg border p-4"
        placeholder="Example: Draft a launch-ready announcement for the new release."
      />

    </div>
  );
}