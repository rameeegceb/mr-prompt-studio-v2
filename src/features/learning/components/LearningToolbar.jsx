import { Search, Bookmark, Heart } from "lucide-react";

export default function LearningToolbar({
  course,
  search = "",
  onSearch = () => {},
}) {
  return (
    <div className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            {course?.title ?? "Learning Guide"}
          </h2>

          <p className="text-sm text-slate-500">
            {course?.description ??
              `Explore the ${
                course?.title ?? "learning"
              } curriculum through chapters, examples, and best practices.`}
          </p>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder={`Search ${course?.title ?? "learning content"}...`}
              className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Bookmark size={16} />
            Bookmarks
          </button>

          <button
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Heart size={16} />
            Favorites
          </button>
        </div>
      </div>
    </div>
  );
}