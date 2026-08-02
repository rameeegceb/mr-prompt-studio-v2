import { useEffect, useMemo, useState } from "react";
import LearningContext from "./LearningContext";
import CourseRepository from "../repository/CourseRepository";

const STORAGE_KEY = "learning-state";

function readSavedLearningState() {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "{}"
    );
  } catch {
    return {};
  }
}

export default function LearningProvider({ children }) {
  const course =
    CourseRepository.course ?? null;
  const loading = false;

  const saved = readSavedLearningState();
  const firstLearningChapter =
    course?.chapters.find(
      (chapter) =>
        chapter.title !== "Table of Contents"
    ) ?? course?.chapters[0];

  const [selectedChapter, setSelectedChapter] =
    useState(
      saved.selectedChapter ??
        firstLearningChapter?.id ??
        null
    );
  const [selectedSection, setSelectedSection] =
    useState(saved.selectedSection ?? null);

  const [search, setSearch] = useState("");

  const [bookmarks, setBookmarks] = useState(
    saved.bookmarks ?? []
  );
  const [favorites, setFavorites] = useState(
    saved.favorites ?? []
  );
  const [completedLessons, setCompletedLessons] =
    useState(
      saved.completedLessons ?? []
    );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedChapter,
        bookmarks,
        favorites,
        completedLessons,
      })
    );
  }, [
    selectedChapter,
    bookmarks,
    favorites,
    completedLessons,
  ]);

  function toggleBookmark(id) {
    setBookmarks((previous) =>
      previous.includes(id)
        ? previous.filter((x) => x !== id)
        : [...previous, id]
    );
  }

  function toggleFavorite(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((x) => x !== id)
        : [...previous, id]
    );
  }

  function completeLesson(id) {
    setCompletedLessons((previous) =>
      previous.includes(id)
        ? previous
        : [...previous, id]
    );
  }

  const value = useMemo(
    () => ({
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
    }),
    [
      loading,
      course,

      search,

      selectedChapter,
      selectedSection,

      bookmarks,
      favorites,
      completedLessons,
    ]
  );

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}