import categories from "../constants/categories";

export default function CategoryFilter({
  value,
  onChange,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <h3 className="mb-4 text-lg font-semibold">
        Categories
      </h3>

      <div className="space-y-2">

        {categories.map((category) => (

          <button
            key={category}
            onClick={() => onChange(category)}
            className={`w-full rounded-lg px-4 py-2 text-left transition ${
              value === category
                ? "bg-blue-600 text-white"
                : "bg-slate-50 hover:bg-slate-100"
            }`}
          >
            {category}
          </button>

        ))}

      </div>

    </div>
  );
}