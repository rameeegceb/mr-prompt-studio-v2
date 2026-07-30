import PageHeader from "../../../components/ui/PageHeader";

import LearningProvider from "../state/LearningProvider";

import LearningSidebar from "../components/LearningSidebar";
import LearningToolbar from "../components/LearningToolbar";
import LearningContent from "../components/LearningContent";

import LearningProgress from "../components/LearningProgress";
import ContinueLearningCard from "../components/ContinueLearningCard";
import BookmarkPanel from "../components/BookmarkPanel";
import FavoritesPanel from "../components/FavoritesPanel";

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

    readingProgress,
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

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title={course.title}
        description={
          course.description ??
          `Master ${course.title}`
        }
      />

      <div className="mt-6 grid grid-cols-12 gap-6">

        <div className="col-span-12 lg:col-span-8">
          <ContinueLearningCard
            chapter={currentChapter}
            onContinue={setSelectedChapter}
          />
        </div>

        <div className="col-span-12 lg:col-span-4">
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