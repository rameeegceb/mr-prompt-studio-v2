import useLearningContext from "../state/useLearningContext";

export default function useLearning() {
  const {
    loading,

    course,

    search,
    setSearch,

    selectedChapter,
    setSelectedChapter,

    selectedSection,
    setSelectedSection,

    bookmarks,
    toggleBookmark,

    favorites,
    toggleFavorite,

    completedLessons,
    completeLesson,
  } = useLearningContext();

  const currentChapter =
    course?.getChapter(selectedChapter) ??
    null;

  const readingProgress =
    course && course.totalChapters > 0
      ? Math.round(
          (completedLessons.length /
            course.totalChapters) *
            100
        )
      : 0;

  return {
    loading,

    course,

    currentChapter,

    search,
    setSearch,

    selectedChapter,
    setSelectedChapter,

    selectedSection,
    setSelectedSection,

    bookmarks,
    toggleBookmark,

    favorites,
    toggleFavorite,

    completedLessons,
    completeLesson,

    readingProgress,
  };
}