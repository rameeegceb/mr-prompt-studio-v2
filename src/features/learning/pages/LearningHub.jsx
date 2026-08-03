import PageHeader from "../../../components/ui/PageHeader";

import LearningProvider from "../state/LearningProvider";

import LearningSidebar from "../components/LearningSidebar";
import LearningToolbar from "../components/LearningToolbar";
import LearningContent from "../components/LearningContent";

import LearningProgress from "../components/LearningProgress";
import ContinueLearningCard from "../components/ContinueLearningCard";
import BookmarkPanel from "../components/BookmarkPanel";
import FavoritesPanel from "../components/FavoritesPanel";
import LearningPathsDashboard from "../components/LearningPathsDashboard";

import useLearning from "../hooks/useLearning";

function LearningHubContent() {
  const {
    course,

    selectedChapter,
    setSelectedChapter,

    search,
    setSearch,

    bookmarks,
    favorites,

    completedLessons,
    completeLesson,

    readingProgress,

    viewMode,
    openLessonWorkspace,
    openPathsWorkspace,

    setSelectedPath,
    paths,
    activePath,
    continuePath,
  } = useLearning();

  if (!course) {
    return (
      <div className="flex h-full items-center justify-center">
        Loading Learning Hub...
      </div>
    );
  }

  const currentChapter =
    course.getChapter(selectedChapter) ??
    course.chapters[0];

  const isCurrentChapterCompleted =
    completedLessons.includes(
      currentChapter?.id
    );

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Prompt Engineering Academy"
        description={
          course.description ??
          `Master ${course.title}`
        }
      >
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
          <button
            onClick={openPathsWorkspace}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              viewMode === "paths"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Learning Paths
          </button>

          <button
            onClick={openLessonWorkspace}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              viewMode === "lesson"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            Lesson Workspace
          </button>
        </div>
      </PageHeader>

      {viewMode === "paths" ? (
        <LearningPathsDashboard
          paths={paths}
          activePath={activePath}
          onSelectPath={setSelectedPath}
          onContinuePath={continuePath}
          onOpenWorkspace={openLessonWorkspace}
        />
      ) : (
        <>
          <div className="mt-6 grid grid-cols-12 gap-6">

            <div className="col-span-12 lg:col-span-8">
              <ContinueLearningCard
                chapter={currentChapter}
                onContinue={setSelectedChapter}
              />
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-4">
              <LearningProgress
                progress={readingProgress}
                chaptersCompleted={
                  Math.floor(
                    (readingProgress / 100) *
                      course.totalChapters
                  )
                }
                totalChapters={course.totalChapters}
              />

              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Active Path
                </div>

                <div className="mt-1 text-sm font-medium text-slate-800">
                  {activePath?.title ?? "None selected"}
                </div>

                {currentChapter?.id ? (
                  <button
                    onClick={() =>
                      completeLesson(currentChapter.id)
                    }
                    className={`mt-3 w-full rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isCurrentChapterCompleted
                        ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                    disabled={isCurrentChapterCompleted}
                  >
                    {isCurrentChapterCompleted
                      ? "Lesson Completed"
                      : "Mark Lesson Complete"}
                  </button>
                ) : null}
              </div>
            </div>

          </div>

          <div className="mt-6 flex flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <LearningSidebar />

            <div className="flex flex-1 flex-col">

              <LearningToolbar
                course={course}
                search={search}
                onSearch={setSearch}
              />

              <div className="grid flex-1 grid-cols-12 overflow-hidden">

                <div className="col-span-12 overflow-y-auto xl:col-span-9">
                  <LearningContent />
                </div>

                <aside className="hidden xl:col-span-3 xl:flex flex-col gap-4 overflow-y-auto border-l border-slate-200 bg-slate-50 p-5">

                  <BookmarkPanel
                    course={course}
                    bookmarks={bookmarks}
                  />

                  <FavoritesPanel
                    course={course}
                    favorites={favorites}
                  />

                </aside>

              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default function LearningHub() {
  return (
    <LearningProvider>
      <LearningHubContent />
    </LearningProvider>
  );
}