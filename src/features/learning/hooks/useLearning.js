import { useState } from "react";

export default function useLearning() {
  const [selectedChapter, setSelectedChapter] = useState("welcome");

  return {
    selectedChapter,
    setSelectedChapter,
  };
}