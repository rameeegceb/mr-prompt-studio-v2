import useLearningContext from "../state/useLearningContext";
import buildLearningPaths from "../utils/learningPaths";

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

    viewMode,
    setViewMode,

    selectedPath,
    setSelectedPath,

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

  const paths = buildLearningPaths(
    course,
    completedLessons
  );

  const activePath =
    paths.find((path) => path.id === selectedPath) ??
    paths[0] ??
    null;

  function openLessonWorkspace() {
    setViewMode("lesson");
  }

  function openPathsWorkspace() {
    setViewMode("paths");
  }

  function continuePath(pathId) {
    const path =
      paths.find((item) => item.id === pathId) ?? null;

    if (!path) return;

    setSelectedPath(path.id);

    const nextLesson =
      path.lessons.find(
        (lesson) => !lesson.completed
      ) ?? path.lessons[0];

    if (nextLesson) {
      setSelectedChapter(nextLesson.id);
      setViewMode("lesson");
    }
  }

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

    viewMode,
    openLessonWorkspace,
    openPathsWorkspace,

    selectedPath,
    setSelectedPath,

    paths,
    activePath,
    continuePath,

    bookmarks,
    toggleBookmark,

    favorites,
    toggleFavorite,

    completedLessons,
    completeLesson,

    readingProgress,
  };
}