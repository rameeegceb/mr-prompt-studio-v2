import PageHeader from "../../../components/ui/PageHeader";

import LearningSidebar from "../components/LearningSidebar";
import LearningToolbar from "../components/LearningToolbar";
import LearningContent from "../components/LearningContent";

import LearningProgress from "../components/LearningProgress";
import ContinueLearningCard from "../components/ContinueLearningCard";
import BookmarkPanel from "../components/BookmarkPanel";
import FavoritesPanel from "../components/FavoritesPanel";

import { chapters } from "../data/chapters";

import useLearning from "../hooks/useLearning";

export default function LearningHub() {
  const {
    selectedChapter,
    setSelectedChapter,

    search,
    setSearch,

    bookmarks,
    favorites,

    readingProgress,
  } = useLearning();

  const currentChapter =
    chapters.find((c) => c.id === selectedChapter) ??
    chapters[0];

  return (
    <div className="flex h-full flex-col">
      <PageHeader
        title="Learning Hub"
        description="Master Enterprise Prompt Engineering"
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
                  chapters.length
              )
            }
            totalChapters={chapters.length}
          />
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

          <div className="grid flex-1 grid-cols-12 overflow-hidden">

            <div className="col-span-12 xl:col-span-9 overflow-y-auto">
              <LearningContent
                selectedChapter={selectedChapter}
              />
            </div>

            <aside className="hidden xl:flex xl:col-span-3 flex-col gap-4 overflow-y-auto border-l border-slate-200 bg-slate-50 p-5">

              <BookmarkPanel
                bookmarks={bookmarks}
              />

              <FavoritesPanel
                favorites={favorites}
              />

            </aside>

          </div>

        </div>

      </div>
    </div>
  );
}