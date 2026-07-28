export default function ConstraintsStep({
  value,
  onChange,
}) {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        Constraints
      </h3>

      <textarea
        rows={8}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-6 w-full rounded-lg border p-4"
        placeholder="Accuracy, length, assumptions, technologies, exclusions..."
      />

    </div>
  );
}