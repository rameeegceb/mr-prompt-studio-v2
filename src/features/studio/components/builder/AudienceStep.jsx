const audiences = [
  "Executives",
  "Managers",
  "Developers",
  "Architects",
  "Business Users",
  "Customers",
  "Students",
  "General Audience",
];

export default function AudienceStep({
  value,
  onChange,
}) {
  return (
    <div>

      <h3 className="text-xl font-semibold">
        Target Audience
      </h3>

      <div className="mt-6 grid gap-3 md:grid-cols-2">

        {audiences.map((item) => (

          <button
            key={item}
            onClick={() =>
              onChange(item)
            }
            className={`rounded-lg border p-4 text-left ${
              value === item
                ? "border-blue-600 bg-blue-50"
                : ""
            }`}
          >
            {item}
          </button>

        ))}

      </div>

    </div>
  );
}