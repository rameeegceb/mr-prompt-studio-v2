const formats = [
  "Markdown",
  "Table",
  "JSON",
  "XML",
  "POML",
  "HTML",
];

export default function OutputStep({
  value,
  onChange,
}) {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        Output Format
      </h3>

      <div className="mt-6 grid gap-3 md:grid-cols-3">

        {formats.map((format) => (

          <button
            key={format}
            onClick={() =>
              onChange(format)
            }
            className={`rounded-lg border p-4 ${
              value === format
                ? "border-blue-600 bg-blue-50"
                : ""
            }`}
          >
            {format}
          </button>

        ))}

      </div>

    </div>
  );
}