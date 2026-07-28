import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "mps-learning-state";

export default function useLearning() {
  const [selectedChapter, setSelectedChapter] = useState("welcome");
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const state = JSON.parse(saved);

      setSelectedChapter(state.selectedChapter ?? "welcome");
      setBookmarks(state.bookmarks ?? []);
      setFavorites(state.favorites ?? []);
      setReadingProgress(state.readingProgress ?? 0);
    } catch {
      // Ignore invalid local storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        selectedChapter,
        bookmarks,
        favorites,
        readingProgress,
      })
    );
  }, [
    selectedChapter,
    bookmarks,
    favorites,
    readingProgress,
  ]);

  useEffect(() => {
    const chapterProgress = {
      welcome: 5,
      aiBasics: 10,
      promptEngineering: 20,
      promptAnatomy: 35,
      promptTechniques: 50,
      promptFrameworks: 70,
      examples: 85,
      bestPractices: 100,
    };

    setReadingProgress(
      chapterProgress[selectedChapter] ?? readingProgress
    );
  }, [selectedChapter]);

  const toggleBookmark = (chapter) => {
    setBookmarks((current) =>
      current.includes(chapter)
        ? current.filter((c) => c !== chapter)
        : [...current, chapter]
    );
  };

  const toggleFavorite = (chapter) => {
    setFavorites((current) =>
      current.includes(chapter)
        ? current.filter((c) => c !== chapter)
        : [...current, chapter]
    );
  };

  const isBookmarked = (chapter) =>
    bookmarks.includes(chapter);

  const isFavorite = (chapter) =>
    favorites.includes(chapter);

  const stats = useMemo(
    () => ({
      bookmarked: bookmarks.length,
      favorites: favorites.length,
      progress: readingProgress,
    }),
    [bookmarks, favorites, readingProgress]
  );

  return {
    selectedChapter,
    setSelectedChapter,

    search,
    setSearch,

    bookmarks,
    favorites,

    toggleBookmark,
    toggleFavorite,

    isBookmarked,
    isFavorite,

    readingProgress,
    stats,
  };
}