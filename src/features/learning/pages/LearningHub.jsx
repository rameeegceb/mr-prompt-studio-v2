import PageHeader from "../../../components/ui/PageHeader";

import LearningSidebar from "../components/LearningSidebar";
import LearningToolbar from "../components/LearningToolbar";
import LearningContent from "../components/LearningContent";

import useLearning from "../hooks/useLearning";

export default function LearningHub() {
  const {
    selectedChapter,
    setSelectedChapter,
    search,
    setSearch,
    readingProgress,
    bookmarks,
    favorites,
  } = useLearning();

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Learning Hub"
        description="Master Enterprise Prompt Engineering"
      />

      <div className="mt-4 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between gap-6">
          <div className="flex-1">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">
                Learning Progress
              </span>

              <span className="font-semibold text-blue-600">
                {readingProgress}%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>

          <div className="hidden gap-6 md:flex">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">
                {bookmarks.length}
              </p>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Bookmarks
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">
                {favorites.length}
              </p>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Favorites
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <LearningSidebar
          selectedChapter={selectedChapter}
          onSelectChapter={setSelectedChapter}
        />

        <div className="flex flex-1 flex-col">
          <LearningToolbar
            search={search}
            onSearch={setSearch}
          />

          <div className="flex-1 overflow-y-auto p-6">
            <LearningContent
              selectedChapter={selectedChapter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}