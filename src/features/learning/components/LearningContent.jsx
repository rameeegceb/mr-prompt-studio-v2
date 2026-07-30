import useLearningContext from "../state/useLearningContext";
import LessonRenderer from "./LessonRenderer";

export default function LearningContent() {
  const {
    loading,
    course,
    selectedChapter,
  } = useLearningContext();

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        Loading...
      </div>
    );
  }

  const chapter =
    course.getChapter(selectedChapter);

  return (
    <LessonRenderer
      chapter={chapter}
    />
  );
}