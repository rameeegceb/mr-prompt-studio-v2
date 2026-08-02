import useLesson from "../../hooks/useLesson";

import { useLearning } from "../../state/LearningContext";

export default function LessonNavigation() {
  const { lessonId, setLessonId } =
    useLearning();

  const {
    previous,
    next,
  } = useLesson(lessonId);

  return (
    <div className="flex justify-between border-t pt-8">

      <button
        disabled={!previous}
        onClick={() =>
          previous &&
          setLessonId(previous.id)
        }
        className="rounded-lg border px-5 py-3"
      >
        ← Previous
      </button>

      <button
        disabled={!next}
        onClick={() =>
          next &&
          setLessonId(next.id)
        }
        className="rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        Next →
      </button>

    </div>
  );
}