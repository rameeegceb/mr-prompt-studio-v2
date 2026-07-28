import {
  BookOpen,
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Heart,
} from "lucide-react";

import { chapters } from "../data/chapters";

export default function LearningSidebar({
  selectedChapter,
  onSelectChapter,
}) {
  return (
    <aside className="flex w-80 flex-col border-r border-slate-200 bg-slate-50">
      <div className="border-b border-slate-200 bg-white p-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="rounded-lg bg-blue-100 p-2">
            <BookOpen
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Learning Hub
            </h2>

            <p className="text-sm text-slate-500">
              Enterprise Prompt Engineering
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            Continue Learning
          </p>

          <p className="mt-2 text-sm font-medium text-slate-800">
            Resume from your last visited chapter.
          </p>

          <button
            className="mt-3 flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Continue
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Chapters
        </p>

        {chapters.map((chapter, index) => {
          const active = selectedChapter === chapter.id;

          return (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className={`group mb-3 w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                active
                  ? "border-blue-600 bg-blue-600 text-white shadow-lg"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div className="mb-2 flex items-start justify-between">
                <span
                  className={`text-xs font-semibold ${
                    active
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >
                  Chapter {index + 1}
                </span>

                {active ? (
                  <CheckCircle2
                    size={18}
                    className="text-white"
                  />
                ) : (
                  <ChevronRight
                    size={18}
                    className="text-slate-400 transition-transform group-hover:translate-x-1"
                  />
                )}
              </div>

              <h3
                className={`font-semibold ${
                  active
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {chapter.title}
              </h3>

              <p
                className={`mt-1 text-sm ${
                  active
                    ? "text-blue-100"
                    : "text-slate-500"
                }`}
              >
                {chapter.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <Bookmark
                    size={14}
                    className={
                      active
                        ? "text-blue-100"
                        : "text-slate-300"
                    }
                  />

                  <Heart
                    size={14}
                    className={
                      active
                        ? "text-blue-100"
                        : "text-slate-300"
                    }
                  />
                </div>

                <span
                  className={`text-xs ${
                    active
                      ? "text-blue-100"
                      : "text-slate-400"
                  }`}
                >
                  Read →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}