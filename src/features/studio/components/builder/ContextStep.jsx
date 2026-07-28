export default function ContextStep({
  value,
  onChange,
}) {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        Provide Context
      </h3>

      <textarea
        rows={8}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-6 w-full rounded-lg border p-4"
      />

    </div>
  );
}