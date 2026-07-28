import { Search, X } from "lucide-react";

export default function TemplateSearch({
  value,
  onChange,
  onClear,
}) {
  return (
    <div className="relative w-full">

      <Search
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={value}
        placeholder="Search templates..."
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-12 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>
      )}

    </div>
  );
}