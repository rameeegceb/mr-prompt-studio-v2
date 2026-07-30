import { useEffect, useMemo, useState } from "react";
import LearningContext from "./LearningContext";
import CourseRepository from "../repository/CourseRepository";

const STORAGE_KEY = "learning-state";

export default function LearningProvider({ children }) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const [search, setSearch] = useState("");

  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    initialize();
  }, []);

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

  async function initialize() {
    try {
      const loadedCourse = await CourseRepository.load();

      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "{}"
      );

      setCourse(loadedCourse);

      setBookmarks(saved.bookmarks ?? []);
      setFavorites(saved.favorites ?? []);
      setCompletedLessons(saved.completedLessons ?? []);

      // Skip the Table of Contents and open the first real chapter
      const firstLearningChapter =
        loadedCourse.chapters.find(
          (chapter) =>
            chapter.title !== "Table of Contents"
        ) ?? loadedCourse.chapters[0];

      setSelectedChapter(
        saved.selectedChapter ??
          firstLearningChapter?.id ??
          null
      );

      setSelectedSection(saved.selectedSection ?? null);
    } catch (error) {
      console.error(
        "Failed to initialize Learning Hub",
        error
      );
    } finally {
      setLoading(false);
    }
  }

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